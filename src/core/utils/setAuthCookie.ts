import parseJWT from "./parseJWT";

export function setAuthCookie(token: string, setCookie: any, doRemember?: boolean) {
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