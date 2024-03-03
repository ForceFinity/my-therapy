import { fetchLogged } from "@core/api/http";
import { Event } from "@core/schemas/therapist";

export const getTherapistEvents = async (token: string) => {
    const url = "http://localhost:8000/api" + "/users/therapistData/events/"

    return await fetchLogged<Event[]>(url, token);
}
