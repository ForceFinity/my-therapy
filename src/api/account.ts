import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export type User = {
    id?: number
    username?: string
}

export type Session = {
    sub?: string
    exp?: number
}

export type TokenResponse = {
    accessToken?: string
    success: boolean
}

interface ResponseData<T> {
    data: T;
    status: string;
}

export const getToken = async (username: string, password: string): Promise<TokenResponse> => {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    try {
        const response = await axios.post<{accessToken: string}>(
            'http://localhost:8000/api/oauth2/', formData
        )

        return {
            success: true,
            accessToken: response.data.accessToken
        }
    } catch (error: any) {
        return {
            success: false
        }
    }
}

const fetchLogged = async <T>(url: string, token: string, defaultData: T): Promise<ResponseData<T>> => {
    try {
        // noinspection JSAnnotator
        const response = await axios.get<T>(
            url,
            {
                headers: {
                    "Authorization": token
                }
            }
        );

        return { data: response.data, status: response.status.toString() };
    } catch (error: any) {
        console.error('Error setting up request: ', error.message);

        const status: string = error.response?.status.toString() || '500';

        return { data: defaultData, status };
    }
};

const getUser = async (username: string, token: string) => {
    const url = `http://localhost:8000/api/users/?username=${username}`;
    const defaultUser: User = { id: undefined, username: undefined };

    return await fetchLogged<User>(url, token, defaultUser);
};

const verifyToken = async (token: string) => {
    const url = 'http://localhost:8000/api/oauth2/verify/';
    const defaultSession: Session = { sub: undefined, exp: undefined };

    return await fetchLogged<Session>(url, token, defaultSession);
};

export const useAuth = (isStrict: boolean = true): [User | undefined, boolean, () => void] => {
    const [cookies, , removeCookies] = useCookies()
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const token = cookies["Authorization"]

    const logout = () => {
        removeCookies("Authorization")
        navigate("/")
    }

    useEffect(() => {
        const auth = async () => {
            try {
                const token = cookies["Authorization"];
                if (!token) {
                    if (isStrict) navigate("/sign-in/");
                    return;
                }

                const resp = await verifyToken(token);
                if (resp.status![0] === "4") {
                    if (isStrict) navigate("/sign-in/");
                    return;
                }

                const userResp = await getUser(resp.data.sub!, token);
                if (userResp.status![0] === "4") {
                    if (isStrict) navigate("/sign-in/");
                    return;
                }

                // noinspection JSUnusedLocalSymbols
                setUser(prevUser => userResp.data as User); // Using functional update for setUser
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false)
            }
        };

        // noinspection JSIgnoredPromiseFromCall
        auth();
    }, [cookies, isStrict, navigate, token]);

    return [user, loading, logout]
}

// export function useDecodeSession(): DecodeResult {
//     // const algorithm = "HS512"
//     const secretKey = process.env.SECRET_KEY as string
//
//     const [cookies, _] = useCookies(["Authorization"])
//     const tokenString = (cookies.Authorization as string).split(" ")[1]
//
//     let result: Session
//
//     try {
//         jwt.verify(tokenString, secretKey, (error, userData) => {
//             console.log(error)
//             result = userData as Session
//         })
//     } catch (_e: any) {
//         const e: Error = _e
//
//         if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
//             return {
//                 type: "invalid-token"
//             }
//         }
//
//         if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
//             return {
//                 type: "integrity-error"
//             }
//         }
//
//         if (e.message.indexOf("Unexpected token") === 0) {
//             return {
//                 type: "invalid-token"
//             }
//         }
//
//         throw e
//     }
//
//     return {
//         type: "valid",
//         session: result
//     }
// }
