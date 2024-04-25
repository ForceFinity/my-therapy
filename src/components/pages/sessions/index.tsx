import { useParams } from "react-router-dom";
import { useAuth } from "@core/hooks/useAuth";
import { BaseText } from "@components/atoms/texts";
import { SessionPage } from "@components/pages/sessions/sessionPage";

export const Sessions = () => {
    const { id } = useParams()
    const { user, loading, logout } = useAuth()

    return user ? <SessionPage user={user} logout={logout} id={id} /> : <BaseText>Зарежда се...</BaseText>
}