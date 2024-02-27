import { Wrapper } from "@components/atoms";
import { useAuth } from "@core/hooks/useAuth";
import { Text } from "@components/atoms/texts";

export const Logout = () => {
    const [,, logout] = useAuth()

    return (
        <Wrapper>
            <button onClick={logout}><Text>LOGOUT</Text></button>
        </Wrapper>
    )
}