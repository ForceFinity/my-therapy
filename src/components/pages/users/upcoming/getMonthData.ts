import dayjs from "dayjs";
import { Weekdays } from "@components/pages/users/upcoming/upcoming";

export default function getMonthData(): Weekdays[] {
    const current = dayjs()
    const monthStart = current.startOf("month")
    const firstDay = monthStart.day()

    let result = []
    let row: Weekdays = {}
    for (let i = 0; i < 5; i++) {
        dayjs.weekdaysShort().forEach((value, index) => {
            row[value] = monthStart
                .date(monthStart.date() + (i * 7 + 6) - (7 - index) - (firstDay - 1))
                .format("D")
        })
        result.push(row)
        row = {}
    }

    return result as Weekdays[]
}