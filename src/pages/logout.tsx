import { useAuth } from "../api/account";
import { Wrapper } from "../elements";

export const Logout = () => {
    const [,, logout] = useAuth()

    return (
        <Wrapper>
            <button onClick={logout}>LOGOUT</button>
        </Wrapper>
    )
}