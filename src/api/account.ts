import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "./http";

export type User = {
    id: number
    email: string
    nickname: string
    birth_date: Date
    is_confirmed?: boolean
    is_active?: boolean
}

export type Session = {
    email: string
    exp: number
}

export type Token = {
    access_token: string
}

export type RefereedTableProps = {
    refereed_email: string
    is_questionnaire_complete: boolean
}

interface ResponseData<T> {
    data?: T;
    status: string;
}

export const post = async <T>(url: string, formData?: FormData, config?: AxiosRequestConfig): Promise<ResponseData<T>> => {
    let data = undefined
    let status = "200"

    try {
        const response = await axios.post(url, formData, config)

        data = response.data
        // _.mapKeys(response.data, (v: any, k: any) => _.camelCase(k)) as T
        // console.log(response.data)
    } catch (e: any) {
        status = e.response ? e.response.status.toString()  : "400"
    }

    return { data, status }
}

export const getToken = async (username: string, password: string): Promise<ResponseData<Token>> => {
    const url = API_BASE + "/oauth2/";

    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    return await post<Token>(url, formData)
}

export const signUp = async (payload: Omit<User, "id"> & { password: string }, by_user_id?: string): Promise<ResponseData<Token>> => {
    const url = API_BASE + "/oauth2/sign-up/?by_user_id=" + by_user_id

    const formData = new FormData()
    formData.append("nickname", payload.nickname)
    formData.append("birth_date", payload.birth_date.toISOString())
    formData.append("username", payload.email)
    formData.append("password", payload.password)

    return await post<Token>(url, formData)
}

export const sendConfirmationEmail = async (email: string, token: string) => {
    const url = API_BASE + "/users/sendConfirmationEmail?email=" + email

    return await post(url, undefined, {headers: {"Authorization": token}})
}

export const checkEmailOTP = async (otp: string, token: string) => {
    const url = API_BASE + "/users/confirm?otp=" + otp

    return await post<User>(url, undefined, {headers: {"Authorization": token}})
}

const fetchLogged = async <T>(url: string, token: string): Promise<ResponseData<T>> => {
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

        return { data: undefined, status };
    }
};

const getUser = async (email: string, token: string) => {
    const url = API_BASE + `/users/?email=${email}`;

    return await fetchLogged<User>(url, token);
};

const verifyToken = async (token: string) => {
    const url = API_BASE + '/oauth2/verify/';

    return await fetchLogged<Session>(url, token);
};

export const getRefereed = async (token: string) => {
    const url = API_BASE + "/misc/getRefereed"

    return await fetchLogged<RefereedTableProps[]>(url, token)
}

export const verifyFormCompletion = async (token: string) => {
    const url = API_BASE + "/misc/verifyQuestionnaireCompletion/"

    return await fetchLogged<boolean>(url, token)
}

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
                if (resp.status![0] === "4" || resp.data === undefined) {
                    if (isStrict) navigate("/sign-in/");
                    return;
                }

                const userResp = await getUser(resp.data.email, token);
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
