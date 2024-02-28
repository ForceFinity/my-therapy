import { useParams } from "react-router-dom";
import { useAuth } from "@core/hooks/useAuth";
import { UserPage } from "@components/pages/users/userpage";
import { Text } from "@components/atoms/texts";

export const Users = () => {
    const { id } = useParams()
    const { user, loading } = useAuth(false)

    return user ? <UserPage user={user} /> : <Text>Зарежда се...</Text>
}