import { Wrapper } from "@components/atoms";
import { useAuth } from "@core/hooks/useAuth";
import { Text } from "@components/atoms/texts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate("/")
    });

    return <></>
}