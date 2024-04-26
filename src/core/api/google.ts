import { API_BASE, fetchLogged } from "@core/api/http";
import { GoogleUserResponse } from "@core/schemas/user";

export const getGoogleProfile = async (googleToken: string) => {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`

    return await fetchLogged<GoogleUserResponse>(url, "Bearer " + googleToken)
}