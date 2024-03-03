import { Event } from "@core/schemas/therapist";
import dayjs from "dayjs";

export default function processEvents(events: Event[]): Event[][] {
    const processed = new Array<Event[]>(31)

    events.forEach(value => {
        let date = dayjs(value.iso_date).date()

        processed[date-1] = (processed[date-1] || []).concat(value);
    })

    return processed
}