import { useParams } from "react-router-dom";
import { useAuth } from "@core/hooks/useAuth";
import { UserPage } from "@components/pages/users/userpage";
import { BaseText } from "@components/atoms/texts";
import { useEffect } from "react";

export const Users = () => {
    const { id } = useParams()
    const { user, loading, logout } = useAuth()

    return user ? <UserPage user={user} logout={logout} /> : <BaseText>Зарежда се...</BaseText>
}