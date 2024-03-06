import { API_BASE, fetchLogged } from "./http";

export type RefereedTableProps = {
    refereed_email: string
    is_questionnaire_complete: boolean
}

export const getRefereed = async (token: string) => {
    const url = API_BASE + "/misc/getRefereed"

    return await fetchLogged<RefereedTableProps[]>(url, token)
}