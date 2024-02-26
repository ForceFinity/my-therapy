import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API_BASE, fetchLogged, post, ResponseData } from "./http";

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

const getUser = async (email: string, token: string) => {
    const url = API_BASE + `/users/?email=${email}`;

    return await fetchLogged<User>(url, token);
};

const verifyToken = async (token: string) => {
    const url = API_BASE + '/oauth2/verify/';

    return await fetchLogged<Session>(url, token);
};

export const verifyFormCompletion = async (token: string) => {
    const url = API_BASE + "/misc/verifyQuestionnaireCompletion/"

    return await fetchLogged<boolean>(url, token)
}

export const useAuth = (
    needUser: boolean = true,
    isStrict: boolean = true
): [User | undefined, boolean, () => void] => {
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

                if(needUser) {
                    const userResp = await getUser(resp.data.email, token);
                    if (userResp.status![0] === "4") {
                        if (isStrict) navigate("/sign-in/");
                        return;
                    }
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
