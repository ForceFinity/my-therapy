import styled from "styled-components";
import { Event } from "@core/schemas/therapist";
import { BaseText } from "@components/atoms/texts";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

const Placeholder = styled(BaseText)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    
    opacity: .5;
    text-align: center;
    font-size: 1rem;
    width: 70%;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 3vh
`

const Sep = styled.hr`
    border: .01vi solid var(--accent);
    width: 95%;
`

const EventBox = styled.div`
    padding: 1vh 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vh;
    width: 90%;
    border: .1rem solid transparent;
    border-radius: .5rem;
    transition: .2s;
    
    &:hover {
        cursor: pointer;
        border: .1rem solid var(--accent);
        
        ${Sep} {
            border-color: transparent;
        }
    }
`

const EventTitle = styled(BaseText)`
    text-align: center;
`

export const UpcomingEvents = (
    {chosen, events, loading}: {chosen: string, events: Event[], loading: boolean}
) => {
    const navigate = useNavigate()

    const onEventClick = (id: number) => {
        navigate("/sessions/" + id)
    }

    if(loading && chosen) {
        return <BaseText>Зарежда се...</BaseText>
    }

    return (
        <Wrap>
            { !chosen &&
                <Placeholder>
                    Изберете ден от календара, за да видите подробна информация за
                    събитията през този ден.
                </Placeholder>
            }
            { chosen && !events && !loading &&
                <Placeholder>
                    Няма предстоящи събития за този ден.
                </Placeholder>
            }
            {
                chosen && events?.map((value, index) => (
                    <EventBox key={index} onClick={()=>onEventClick(value.id)}>
                        <EventTitle>{ value.title }</EventTitle>
                        <Sep />
                    </EventBox>
                ))
            }
        </Wrap>
    )
}