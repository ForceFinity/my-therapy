import dayjs from "dayjs";

export enum EventType {
    Session = 1,
    Supervision,
    Other
}

export interface Event {
    id: number
    client_id: number
    title: string
    description: string
    event_datetime: string
    eventType: EventType
}

export type TherapistFull = {
    therapist_id: number
    name: string
    pfp: string
    price: number
    about: string
    education: string[]
    // ISO strings
    work_hours: string[]
}
