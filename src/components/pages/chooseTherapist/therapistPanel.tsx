// noinspection TypeScriptValidateTypes

import styled from "styled-components";
import { TrueButton } from "@components/atoms";
import handshakeSvg from "@assets/support.svg"
import { ThemeCard } from "./themeCard";
import { ExpandableBox } from "@components/organisms/expandableBox";
import { useMemo, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { Title } from "@components/molecules";
import { BaseText } from "@components/atoms/texts";
import { TherapistFull } from "@core/schemas/therapist";
import { User } from "@core/schemas/user";
import { createEvent } from "@core/api/therapists";
import { createCall } from "@core/api/calls";

const Content = styled.div`
    margin-left: 12vw;
    width: 60%;
    background: white;
    z-index: 1;
    
    @media (max-width: 480px) {
        margin: 0;
        width: 100%;
        justify-content: center;    
    }
`

const PanelHeader = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
    
    @media (max-width: 480px) {
        align-items: center;
    }
`

const MainContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    
    @media (max-width: 480px) {
        flex-direction: column;
        
        span {
            text-align: center;
        }
    }
`

const PFP = styled.img`
    width: 26%;
    border-radius: 50%;
    
    @media (max-width: 480px) {
        width: 60%;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1vh;
    margin-left: 4vw;
    
    @media (max-width: 480px) {
        margin: .5rem 0 0;
    }
`

const Offer = styled(BaseText)`
    font-size: 1rem;
    margin-bottom: 1.5vh;
    
    @media (max-width: 480px) {
        font-size: 1.05rem;
    }
`
const OfferSum = styled(Offer)`
    color: var(--accent)
`

const Name = styled(BaseText)`
    font-size: 2.8rem;
`

const ExperienceAndBook = styled.div`
    display: flex;
    gap: 2vw;
    margin: 2vh 0 3vh;
    
    @media (max-width: 480px) {
        width: 80%;
        flex-direction: column;
        align-items: center;
    }
`

const ExperienceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .8vh;
    height: 5.5vh;
    
    border: .1rem #A173FF solid;
    border-radius: .6rem;
    
    color: black;
    
    &:hover {
        opacity: 1;
        cursor: default;
    }
    
    img {
        width: 15%;
    }
    
    @media (max-width: 480px) {
        width: 80%;
    }
`

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 4vh;
`

const InfoTitle = styled(Title)`
    width: 100%;
    font-size: 2.2rem;
    margin-bottom: .5rem;
    
    @media (max-width: 480px) {
        text-align: left;
        line-height: 3rem;
    }
`

const InfoText = styled(BaseText)`
    font-size: 1.1rem;
`

const EducationBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Education = styled.div`
    display: flex;
    flex-direction: column;
`

const ThemeCards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2vh
`

const WorkDay = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
    
    & > span {
        margin-bottom: .3rem;
    }
`

const Hours = styled.div`
    display: flex;
    gap: .8rem;
`

const Hour = styled(TrueButton)`
    height: 4.5vh;
    width: 7vw;
    
    @media (max-width: 480px) {
        width: 20vw;
        height: 4.2vh;
    }
`

const BookButton = styled(TrueButton)`
    width: 28%;
    
    @media (max-width: 480px) {
        width: 100%;
    }
`

const processWorkHours = (workHours: string[]) => {
    let result: {[date: string]: Dayjs[]} = {}

    workHours.forEach( value => {
        const as_date = dayjs(value)

        result[as_date.date()] ?
            result[as_date.date()].push(as_date) :
            result = {...result, [as_date.date()]: [as_date]}
    })

    return result
}

export const TherapistPanel = ({user, therapist}: {user: User, therapist: TherapistFull}) => {
    const [chosenHour, setChosenHour] = useState<string>()
    const maxDescHeightRem = 6
    const bookRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const workHours = useMemo(() => processWorkHours(therapist.work_hours), [therapist])

    const bookSession = (iso_datetime: string) => {
        let as_datetime = dayjs(iso_datetime)

        createEvent(
            therapist.therapist_id,
            user,
            `${user.nickname} ${as_datetime.format("HH:mm")}`,
            "Сесия със " + user.nickname + " на " + as_datetime.format("D MMMM, dddd"),
            iso_datetime
        ).then((resp)=>{
            if(resp.data) {
                createCall(
                    {
                        therapist_id: therapist.therapist_id,
                        event_id: resp.data.id,
                        participants: [user.id],
                        datetime: as_datetime.toDate(),
                    },
                    user.token
                ).then(()=>navigate("/users/@me"))
            }
        })
    }

    return (
        <Content>
            <PanelHeader>
                <MainContent>
                    <PFP src={therapist.pfp} alt={therapist.name}/>
                    <Description>
                        <Name>{therapist.name}</Name>
                        <Offer>Индивидуална сесия <OfferSum className="bold">{ therapist.price }лв</OfferSum></Offer>
                    </Description>
                </MainContent>
                <ExperienceAndBook>
                    <ExperienceBox>
                        <img src={ handshakeSvg } alt="Опит"/>
                        <BaseText>Опит 5 години</BaseText>
                    </ExperienceBox>
                    <BookButton
                        $isBordered={true}
                        onClick={()=>bookRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        $isFilled={true}
                    >
                        <BaseText>Запази час</BaseText>
                    </BookButton>
                </ExperienceAndBook>
            </PanelHeader>
            <InfoBox>
                <InfoTitle>За специалиста:</InfoTitle>
                <ExpandableBox $maxHeightRem={maxDescHeightRem}>
                    <InfoText>
                        { therapist.about }
                    </InfoText>
                </ExpandableBox>
            </InfoBox>
            <InfoBox>
                <InfoTitle>Образование:</InfoTitle>
                <ExpandableBox $maxHeightRem={maxDescHeightRem * 1.7}>
                    <EducationBox>
                        { therapist.education.map((value, i) => (
                            <Education key={i}>
                                { /*Splitting to year and description*/ }
                                <InfoText>{value.split(";")[0]}</InfoText>
                                <InfoText>{value.split(";")[1]}</InfoText>
                            </Education>
                        ))}
                    </EducationBox>
                </ExpandableBox>
            </InfoBox>
            <InfoBox>
                <InfoTitle>Работи с вашите теми:</InfoTitle>
                <ExpandableBox $maxHeightRem={maxDescHeightRem}>
                    <ThemeCards>
                        <ThemeCard type={1} text="Кариерна мотивация" />
                        <ThemeCard type={2} text="Семейство" />
                        <ThemeCard type={3} text="Прокрастинация" />
                        <ThemeCard type={4} text="Раздразнимост" />
                    </ThemeCards>
                </ExpandableBox>
            </InfoBox>
            <InfoBox ref={bookRef}>
                <InfoTitle>Запази час</InfoTitle>
                <ExpandableBox $maxHeightRem={maxDescHeightRem * 2.2}>
                    {
                        Object.keys(workHours).map((date, i) => (
                                <WorkDay>
                                    <BaseText className="bold">
                                        {dayjs(workHours[date][0]).format("D MMMM, dddd")}
                                    </BaseText>

                                    <Hours>
                                        {
                                            workHours[date].map((hour, j) => (
                                                <Hour
                                                    $isBordered
                                                    $isFilled={
                                                        chosenHour == `${therapist.therapist_id.toString()};${hour.toISOString()}`
                                                    }
                                                    onClick={
                                                        ()=>setChosenHour(
                                                            `${therapist.therapist_id.toString()};${hour.toISOString()}`
                                                        )
                                                    }
                                                >
                                                    <BaseText>{hour.format("HH:mm")}</BaseText>
                                                </Hour>
                                            ))
                                        }
                                    </Hours>
                                </WorkDay>
                        ))
                    }
                </ExpandableBox>
            </InfoBox>
            <BookButton
                $isBordered
                disabled={!(chosenHour && chosenHour.startsWith(therapist.therapist_id.toString()))}
                $isFilled
                onClick={()=>{
                    bookSession(chosenHour!.split(";")[1])
                }}
            >
                <BaseText>Запази час</BaseText>
            </BookButton>
        </Content>
    )
}