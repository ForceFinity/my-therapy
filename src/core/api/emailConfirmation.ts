import { API_BASE, post } from "./http";

import { User } from "@core/schemas/user";

export const sendConfirmationEmail = async (email: string, token: string) => {
    const url = API_BASE + "/users/sendConfirmationEmail?email=" + email

    return await post(url, undefined, {headers: {"Authorization": token}})
}

export const checkEmailOTP = async (otp: string, token: string) => {
    const url = API_BASE + "/users/confirm?otp=" + otp

    return await post<User>(url, undefined, {headers: {"Authorization": token}})
}