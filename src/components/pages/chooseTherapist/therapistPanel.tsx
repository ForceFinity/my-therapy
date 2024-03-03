// noinspection TypeScriptValidateTypes

import styled from "styled-components";
import { Therapist } from "./index";
import { TrueButton } from "@components/atoms";
import handshakeSvg from "@assets/support.svg"
import { ThemeCard } from "./themeCard";
import { ExpandableBox } from "@components/organisms/expandableBox";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Title } from "@components/molecules";
import { BaseText } from "@components/atoms/texts";

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

export const TherapistPanel = ({therapist}: {therapist: Therapist}) => {
    const [chosenHour, setChosenHour] = useState<string>()
    const maxDescHeightRem = 6
    const bookRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    
    return (
        <Content>
            <PanelHeader>
                <MainContent>
                    <PFP src={therapist.pfpURL} alt={therapist.name}/>
                    <Description>
                        <Name>{therapist.name}</Name>
                        <Offer>Индивидуална сесия <OfferSum className="bold">50лв</OfferSum></Offer>
                    </Description>
                </MainContent>
                <ExperienceAndBook>
                    <ExperienceBox>
                        <img src={ handshakeSvg } alt="Опит"/>
                        <BaseText>Опит 5 години</BaseText>
                    </ExperienceBox>
                    <BookButton
                        isBordered={true}
                        onClick={()=>bookRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        isFilled={true}
                    >
                        <BaseText>Запази час</BaseText>
                    </BookButton>
                </ExperienceAndBook>
            </PanelHeader>
            <InfoBox>
                <InfoTitle>За специалиста:</InfoTitle>
                <ExpandableBox maxHeightRem={maxDescHeightRem}>
                    <InfoText>Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе. Вим примис риденс делицата ет.
                        Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе. Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе. Вим примис риденс делицата ет.
                        Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе.</InfoText>
                </ExpandableBox>
            </InfoBox>
            <InfoBox>
                <InfoTitle>Образование:</InfoTitle>
                <ExpandableBox maxHeightRem={maxDescHeightRem * 1.7}>
                    <EducationBox>
                        <Education>
                            <InfoText>2020</InfoText>
                            <InfoText>Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе. Вим примис риденс делицата ет.
                                Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе.</InfoText>
                        </Education>
                        <Education>
                            <InfoText>2015</InfoText>
                            <InfoText>Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе. Вим примис риденс делицата ет.
                                Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе.</InfoText>
                        </Education>
                        <Education>
                            <InfoText>2010</InfoText>
                            <InfoText>Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе. Вим примис риденс делицата ет.
                                Лорем ипсум долор сит амет, нам цу алияуид пхилосопхиа сигниферумяуе.</InfoText>
                        </Education>
                    </EducationBox>
                </ExpandableBox>
            </InfoBox>
            <InfoBox>
                <InfoTitle>Работи с вашите теми:</InfoTitle>
                <ExpandableBox maxHeightRem={maxDescHeightRem}>
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
                <ExpandableBox maxHeightRem={maxDescHeightRem * 2.2}>
                    {
                        Object.keys(therapist.workDays).map((keyName, i) => (
                            <WorkDay key={i}>
                                <BaseText className="bold">{
                                    dayjs(keyName, "YYYY-MM-DD").format("D MMMM, dddd")
                                }</BaseText>
                                <Hours>
                                    {
                                        therapist.workDays[keyName].map((hour, j) => (
                                            <Hour
                                                isBordered={true}
                                                isFilled={ chosenHour === therapist.id + j + keyName}
                                                onClick={() => setChosenHour(therapist.id + j + keyName)}
                                                key={therapist.id + j + keyName}
                                            >
                                                <BaseText>{hour}</BaseText>
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
                isBordered={true}
                disabled={!(chosenHour && chosenHour.startsWith(therapist.id.toString()))}
                isFilled={true}
                onClick={()=>navigate("/video-call")}
            >
                <BaseText>Запази час</BaseText>
            </BookButton>
        </Content>
    )
}