import { Wrapper } from "@components/atoms";
import { useState } from "react";
import styled from "styled-components";
import { SidePanel } from "./sidePanel";
import { TherapistPanel } from "./therapistPanel";
import { Footer } from "@components/templates/footer";
import { Header } from "@components/templates";
import * as dayjs from 'dayjs'
import "dayjs/locale/bg"

const ChooseTherapistWrapper = styled(Wrapper)`
    display: flex;
    flex-direction: column;
`

const Content = styled.div`
    display: flex;
    margin: 8vh 4vw 0 4vw;
    
    @media (max-width: 480px) {
        margin: 4vh 0;
        flex-direction: column;
    }
`

export interface Therapist {
    id: string
    name: string
    pfpURL: string
    // ISO string of the day to working hours
    workDays: { [key: string]: string[] }
}

const getTherapistsMagically = (): { [key: number]: Therapist } => ({
    0: {
        id: "1",
        name: "Кити Китиус",
        pfpURL: "https://i.ibb.co/yVm8tBn/Group-9.png",
        workDays: {
            "2024-02-26": ["14:00", "16:00"],
            "2024-02-27": ["14:00", "16:00", "18:00"],
            "2024-02-28": ["12:00", "18:00"]
        }
    },
    1: {
        id: "2",
        name: "Гас Фифзи",
        pfpURL: "https://i.ibb.co/j5Vw7pN/photo-2021-12-20-16-03-59.jpg",
        workDays: {
            "2024-02-26": ["14:00", "16:00"],
            "2024-02-27": ["16:00"],
            "2024-02-28": ["12:00", "18:00"]
        }
    },
    2: {
        id: "3",
        name: "Лоли Попс",
        pfpURL: "https://i.ibb.co/ft9ksD2/2024-02-22-001832616.png",
        workDays: {
            "2024-02-25": ["10:00"],
            "2024-02-26": ["14:00", "16:00"],
            "2024-02-28": ["12:00", "18:00"]
        }
    },
    3: {
        id: "4",
        name: "Литтл Пав",
        pfpURL: "https://i.ibb.co/f9Y1gMW/kitten.png",
        workDays: {
            "2024-02-25": ["10:00"],
            "2024-02-26": ["14:00", "16:00"],
            "2024-02-27": ["14:00", "18:00"],
            "2024-02-28": ["12:00"]
        }
    }
})

export const ChooseTherapist = () => {
    let therapists: { [key: number]: Therapist } = getTherapistsMagically()
    const [currTherapist, setCurrTherapist] = useState(1)

    dayjs.locale('bg')

    // useEffect(() => {
    //     therapists = getTherapistsMagically()
    // });

    return (
        <ChooseTherapistWrapper>
            <Header />
            <Content>
                <SidePanel data={therapists} curr={currTherapist} setCurr={setCurrTherapist} />
                <TherapistPanel therapist={therapists[currTherapist]} />
            </Content>
            <Footer />
        </ChooseTherapistWrapper>
    )
}