import { API_BASE, fetchLogged, post, ResponseData } from "./http";
import { User } from "@core/schemas/user";
import { Token } from "@core/schemas/auth";

export const getToken = async (username: string, password: string): Promise<ResponseData<Token>> => {
    const url = API_BASE + "/oauth2/";

    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    return await post<Token>(url, formData)
}

export const signUp = async (
    payload: Omit<Omit<User, "id">, "token"> & { password: string },
    isByGoogle: boolean,
    by_user_id?: string,
): Promise<ResponseData<Token>> => {

    const url = `http://localhost:8000/api/oauth2/sign-up/?by_user_id=${by_user_id}&is_by_google=${isByGoogle}`

    const formData = new FormData()
    formData.append("nickname", payload.nickname)
    formData.append("birth_date", payload.birth_date.toISOString())
    formData.append("username", payload.email)
    formData.append("password", payload.password)

    return await post<Token>(url, formData)
}

export const verifyFormCompletion = async (token: string) => {
    const url = API_BASE + "/misc/verifyQuestionnaireCompletion/"

    return await fetchLogged<boolean>(url, token)
}

export const getPfp = async (token: string) => {
    const url = API_BASE + "/users/pfp"

    return await fetchLogged<string>(url, token)
}

export const setPfp = async (pfp_url: string, token: string) => {
    const url = API_BASE + "/users/pfp"

    const formData = new FormData()
    formData.append("pfp_url", pfp_url)

    return await post(url, formData, {headers: { Authorization: `${token}` }})
}

export const getUserById = async (token: string, id: number) => {
    const url = API_BASE + "/users?id=" + id

    return await fetchLogged<User>(url, token)
}
