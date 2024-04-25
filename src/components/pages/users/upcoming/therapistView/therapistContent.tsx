import styled from "styled-components";
import { UpcomingEvents } from "@components/pages/users/upcoming/therapistView/upcomingEvents";
import dayjs from "dayjs";
import { CalendarTable } from "@components/pages/users/upcoming/therapistView/calendarTable";
import { useEffect, useMemo, useState } from "react";
import processRequest from "@core/utils/processRequest";
import { Event } from "@core/schemas/therapist";
import processEvents from "@components/pages/users/upcoming/therapistView/getEvents";
import { AccountType, User } from "@core/schemas/user";
import { BaseText } from "@components/atoms/texts";
import { getClientEvents, getEvents } from "@core/api/therapists";

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
    const upcomingData = useMemo(() => processEvents(events), [events])

    useEffect(() => {
        therapist && processRequest<Event[]>(
            therapist.account_type == AccountType.Therapist ? getEvents(therapist.token) : getClientEvents(therapist.token),
            setEvents,
            {
                errStoreFn: setError,
                loadingStoreFn: setLoading
            }
        )
    }, [therapist]);

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
            <CalendarTable chosen={chosen} setChosen={setChosen} />
        </Wrap>
    )
}