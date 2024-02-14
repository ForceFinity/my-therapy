import parseJWT from "./parseJWT";

export default function setAuthCookie(token: string, setCookie: any) {
    const session = parseJWT(token)
    const expires = new Date(session.exp! * 1000)

    setCookie(
        "Authorization",
        "Bearer " + token,
        {
            path: '/',
            expires
        }
    )
}