import styled from "styled-components";
import { UpcomingEvents } from "@components/pages/users/upcoming/upcomingEvents";
import dayjs from "dayjs";
import { CalendarTable } from "@components/pages/users/upcoming/calendarTable";
import { useEffect, useMemo, useState } from "react";
import processRequest from "@core/utils/processRequest";
import { Event } from "@core/schemas/therapist";
import { getTherapistEvents } from "@core/api/therapists";
import getMonthDays from "@components/pages/users/upcoming/getMonthDays";
import processEvents from "@components/pages/users/upcoming/getEvents";
import { User } from "@core/schemas/user";
import { BaseText, ErrorText } from "@components/atoms/texts";

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 10vh;
`

const UpcomingData = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3vh;
    
    width: 28%;
    height: 100%;
    margin-right: .05rem;

    padding: 6.5vh 2vw;
    //background-color: rgba(5, 130, 112, .8);

    border: .1rem hidden;
    border-radius: .4rem 0 0 .4rem;
    box-shadow: 0 0 0 .08rem rgba(5, 130, 112, 1);
`

const UpcomingTitle = styled(BaseText)`
    position: absolute;
    top: -2.2rem;
    left: 2rem;
    text-align: center;
    font-size: 1.6rem;
`

export const TherapistContent = ({therapist, setError}: {therapist: User, setError: any}) => {
    const [loading, setLoading] = useState(true)

    const [events, setEvents] = useState<Event[]>([])
    const [chosen, setChosen] = useState<string>("")
    const calendarDays = useMemo(() => getMonthDays(), [])
    const upcomingData = useMemo(() => processEvents(events), [events])

    useEffect(() => {
        therapist && processRequest<Event[]>(
            getTherapistEvents(therapist.token),
            setEvents,
            setError,
            setLoading
        )
    }, []);

    return (
        <Wrap>
            <UpcomingData>
                <UpcomingTitle>{dayjs().format("YYYY MMMM")}</UpcomingTitle>
                <UpcomingEvents
                    chosen={chosen}
                    events={upcomingData[parseInt(chosen)-1]}
                    loading={loading}
                />
            </UpcomingData>
            <CalendarTable data={calendarDays} chosen={chosen} setChosen={setChosen} />
        </Wrap>
    )
}