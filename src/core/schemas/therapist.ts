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
    iso_date: string
    eventType: EventType
}
// export type Event = { [key: string]:  EventProps}