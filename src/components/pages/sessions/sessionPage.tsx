import { AccountType, User } from "@core/schemas/user";
import { Wrapper } from "@components/atoms";
import { Footer, Header } from "@components/templates";
import { VideoCall } from "@components/pages";
import styled from "styled-components";
import { TherapistControls } from "@components/pages/sessions/therapistControls";
import { BaseText } from "@components/atoms/texts";
import { useEffect, useMemo, useState } from "react";
import { getEvents } from "@core/api/therapists";
import { Event } from "@core/schemas/therapist";
import dayjs from "dayjs";
import { getUserById } from "@core/api/users";

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledVideoCall = styled(VideoCall)`
`

const Controls = styled.div`
    display: flex;
    gap: 2vw;
    width: 60vw;
`

const OtherWrap = styled.div`
    box-sizing: border-box;
    width: 40%;
    height: 50vh;
    border: .1rem #b9b9b9 solid;
    border-radius: 1rem;
    padding: 2vh 2vh;
    display: flex;
    flex-direction: column;
    gap: 2vh;
`

const OtherSession = styled.div`
    width: 100%;
    text-align: center;
`

const DateText = styled(BaseText)`
    display: block;
    width: 100%;
    text-align: left;
    font-size: 1rem;
    margin-bottom: 3vh;
`

const getAllAssociatedUsers = (token: string, sessions: Event[]) => {
    let result: {[key: string]: User} & object = {}

    for(const [i, session] of sessions.entries()) {
        getUserById(token, session.client_id)
            .then(resp => {
                if(!resp.status.startsWith("2")) return "Нещо лошо се случи :("
                console.log(result)
                result[resp.data!.id] = resp.data!
            })
    }


    if(Object.keys(result).length > 0) return result
}
//
// const OtherSessions = ({therapist}: {therapist: User}) => {
//     const [sessions, setSessions] = useState<Event[]>([])
//     const [users, setUsers] = useState<{[key: string]: User}>()
//
//     useEffect(() => {
//         therapist && getEvents(therapist.token, 1)
//             .then(resp => {
//                 if(!resp.status.startsWith("2")) return "Нещо лошо се случи :("
//                 setSessions(resp.data!)
//
//                 const clientIds = resp.data!.map((event) => event.client_id)
//
//                 const getUsers = async () => {
//                     const userPromises: Promise<User>[] = clientIds.map(id =>
//                         getUserById(therapist.token, id)
//                             .then(response => response.data!)
//                     );
//
//                     return await Promise.all(userPromises);
//                 }
//
//                 getUsers().then((usersData: User[]) => {
//                     setUsers(usersData.map(val => ({
//                         [val.id]: val
//                     })));
//                 });
//             })
//     }, [])
//
//     return (
//         <OtherWrap>
//             { users && <BaseText></BaseText> }
//             { sessions && sessions.map((val, i) => (
//                 <OtherSession>
//                     { i === 0 &&
//                         <DateText>{dayjs(val.event_datetime).format("D MMMM, dddd")}</DateText>
//                     }
//
//                     { i > 0 && dayjs(val.event_datetime).date() != dayjs(sessions[i-1].event_datetime).date() &&
//                         <DateText>{dayjs(val.event_datetime).format("D MMMM, dddd")}</DateText>
//                     }
//                     {/*<BaseText>{users && users[val.client_id].nickname}</BaseText>*/}
//                     <BaseText>{dayjs(val.event_datetime).format("HH:mm")}</BaseText>
//                 </OtherSession>
//             )) }
//         </OtherWrap>
//     )
// }

export const SessionPage = ({user, logout, id}: {user: User, logout: any, id?: string}) => {
    return (
        <Wrapper $alignCenter>
            <Header user={user} logout={logout} />
            <StyledVideoCall id={id} />
            { user && user.account_type == AccountType.Therapist ?
                <Controls>
                        {/*<OtherSessions therapist={user} />*/}
                        <TherapistControls user={user} />
                </Controls> :
                <Controls></Controls>
            }
            <Footer />
        </Wrapper>
    )
}