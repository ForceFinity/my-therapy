import { CalendarTable } from "@components/pages/users/upcoming/calendarTable";
import { useState } from "react";
import getMonthData from "@components/pages/users/upcoming/getMonthData";

export type Weekdays = {
    [key in string]: string
}

export const Upcoming = () => {
    const [data, setData] = useState<Weekdays[]>(getMonthData)
    const [chosen, setChosen] = useState<string>("")

    return <CalendarTable data={data} chosen={chosen} setChosen={setChosen} />
}