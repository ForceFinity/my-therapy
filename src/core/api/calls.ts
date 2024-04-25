import { API_BASE, fetchLogged, post } from "@core/api/http";
import { Token } from "@core/schemas/auth";
import { Call } from "@core/schemas/call";

export const getCallToken = async (token: string) => {
    const url = API_BASE + "/calls/token"

    return await fetchLogged<string>(url, token)
}

export const createCall = async (
    payload: Omit<Call, "id">,
    token: string
) => {
    const url = API_BASE + "/calls/"

    const formData = new FormData()
    formData.append("therapist_id", payload.therapist_id.toString())
    formData.append("event_id", payload.event_id.toString())
    formData.append("participants", payload.participants.join(";"))
    formData.append("datetime", payload.datetime.toISOString())

    return await post<Call>(url, formData, { headers: { Authorization: token } })
}
