import { API_BASE, fetchLogged, post, ResponseData } from "@core/api/http";
import { Event, TherapistFull } from "@core/schemas/therapist";
import { User } from "@core/schemas/user";
import { Token } from "@core/schemas/auth";
import { Dayjs } from "dayjs";

export const getEvents = async (token: string, type?: number) => {
    const url = "http://localhost:8000/api" + "/users/therapistData/events"
        + (type ? "?type=" + type : "")

    return await fetchLogged<Event[]>(url, token);
}

export const createSession = async (
    therapistId: number,
    user: User,
    title: string,
    description: string,
    iso_datetime: string
) => {
    const url = "http://localhost:8000" + "/api/users/therapistData/events" +
        "?therapist_id=" + therapistId

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("event_datetime", iso_datetime)
    formData.append("client_id", user.id.toString())

    return await post(url, formData, {headers: {"Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoZXJhcGlzdEBteS10aGVyYXB5LmNvbSIsImV4cCI6MTcxMTY3MTU3Nn0.2JoJbotLU5RYO8bI4kg9wJKSYTwFDlAOg5CYmeA-wD_iuIG6WXlFDXLK_uiOh0VqyvG_kYCic00W8aQzWuqONg"}})
}

export const getNoteContent = async (token: string, clientId: number) => {
    const url = "http://localhost:8000/api" + `/users/therapistData/notes?client_id=` + clientId

    return await fetchLogged<{content: string}>(url, token)
}

export const getTherapistInfoFull = async (token: string, therapistId: number) => {
    const url = "http://localhost:8000/api" + "/users/therapistInfo/full?therapist_id=" + therapistId

    return await fetchLogged<TherapistFull>(url, token)
}

export const getAllTherapists = async (token: string) => {
    const url = "http://localhost:8000/api" + "/users?is_therapist=true"

    return await fetchLogged<User[]>(url, token)
}
