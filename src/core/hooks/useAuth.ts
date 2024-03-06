import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE, fetchLogged } from "@core/api/http";
import { User } from "@core/schemas/user";
import { Session } from "@core/schemas/auth";
import { Simulate } from "react-dom/test-utils";

export const useAuth = (
    isStrict: boolean = true,
    needUser: boolean = true
): { user: User | undefined, loading: boolean, logout: () => void } => {
    const [cookies, , removeCookies] = useCookies()
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const token = cookies["Authorization"]

    const logout = () => {
        removeCookies("Authorization")
        navigate("/?")
        window.location.reload()
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

                if (needUser) {
                    const userResp = await getUser(resp.data.email, token);
                    if (userResp.status![0] === "4") {
                        if (isStrict) navigate("/sign-in/");
                        return;
                    }
                    setUser(prevUser => ({...userResp.data, token} as User));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false)
            }
        };

        // noinspection JSIgnoredPromiseFromCall
        auth();
    }, [cookies, isStrict, navigate, token]);

    return {
        user: user,
        loading: loading,
        logout: logout
    }
}

const getUser = async (email: string, token: string) => {
    const url = API_BASE + `/users/?email=${email}`;

    return await fetchLogged<User>(url, token);
};

const verifyToken = async (token: string) => {
    const url = API_BASE + '/oauth2/verify/';

    return await fetchLogged<Session>(url, token);
};
