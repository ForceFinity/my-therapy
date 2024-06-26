import { API_BASE, fetchLogged, post, ResponseData } from "@core/api/http";
import { Event, TherapistFull } from "@core/schemas/therapist";
import { User } from "@core/schemas/user";
import { Token } from "@core/schemas/auth";
import { Dayjs } from "dayjs";

export const getEvents = async (token: string, type?: number) => {
    const url = API_BASE + "/users/therapistData/events"
        + (type ? "?type=" + type : "")

    return await fetchLogged<Event[]>(url, token);
}

export const getClientEvents = async (token: string) => {
    const url = API_BASE + "/users/therapistData/clientEvents"

    return await fetchLogged<Event[]>(url, token);
}

export const createEvent = async (
    therapistId: number,
    user: User,
    title: string,
    description: string,
    iso_datetime: string
): Promise<ResponseData<Event>> => {
    const url = API_BASE + "/users/therapistData/events" +
        "?therapist_id=" + therapistId

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("event_datetime", iso_datetime)
    formData.append("client_id", user.id.toString())

    return await post<Event>(url, formData, {headers: { Authorization: `${user.token}` }})
}

export const getNoteContent = async (token: string, clientId: number) => {
    const url = API_BASE + `/users/therapistData/notes?client_id=` + clientId

    return await fetchLogged<{content: string}>(url, token)
}

export const getTherapistInfoFull = async (token: string, therapistId: number) => {
    const url = API_BASE + "/users/therapistInfo/full?therapist_id=" + therapistId

    return await fetchLogged<TherapistFull>(url, token)
}

export const getAllTherapists = async (token: string) => {
    const url = API_BASE + "/users?is_therapist=true"

    return await fetchLogged<User[]>(url, token)
}
