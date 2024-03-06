import { Wrapper } from "@components/atoms";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SidePanel } from "./sidePanel";
import { TherapistPanel } from "./therapistPanel";
import { Footer } from "@components/templates/footer";
import { Header } from "@components/templates";
import { useAuth } from "@core/hooks/useAuth";
import { getAllTherapists, getTherapistInfoFull } from "@core/api/therapists";
import { TherapistFull } from "@core/schemas/therapist";
import { BaseText } from "@components/atoms/texts";

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

const getTherapistFullInfos = async (token: string): Promise<{ [key: number]: TherapistFull } | null> => {
    const therapistsResp = await getAllTherapists(token)
    let fullInfo: { [key: number]: TherapistFull } = {}

    if(!therapistsResp.status.startsWith("2")) return null

    for(const [i, val] of therapistsResp.data!.entries()) {
        const currInfo = (await getTherapistInfoFull(token, val.id)).data as TherapistFull

        fullInfo = {
            ...fullInfo,
            [i]: {
                ...currInfo
            }
        }
    }

    return fullInfo
}

export const ChooseTherapist = () => {
    const { user, logout } = useAuth()
    const [error, setError] = useState("")
    const [therapists, setTherapists] = useState<{ [key: number]: TherapistFull }>()
    const [currTherapist, setCurrTherapist] = useState(0)

    useEffect(() => {
        if(user) {
            getTherapistFullInfos(user.token)
                .then(res =>
                    {
                        setTherapists(res ? res : {})
                    }
                )
                .catch(reason => {
                    console.log("Whoopsie...", reason)
                    setError(reason)
                })
        }
    }, [user]);

    if(!therapists || !user) {
        return <BaseText>Зарежда се...</BaseText>
    }

    if(Object.keys(therapists).length === 0) {
        return <BaseText>Няма намерени специалисти</BaseText>
    }

    return (
        <ChooseTherapistWrapper>
            <Header logout={logout} disableSigns />
            <Content>
                <SidePanel data={therapists} curr={currTherapist} setCurr={setCurrTherapist} />
                <TherapistPanel user={user} therapist={therapists[currTherapist]} />
            </Content>
            <Footer />
        </ChooseTherapistWrapper>
    )
}