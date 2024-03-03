import { useState } from "react";
import { TrueButton, Wrapper } from "@components/atoms";
import styled from "styled-components";
import { Header } from "@components/templates";
import { ErrorText } from "@components/atoms/texts";
import { useAuth } from "@core/hooks/useAuth";
import { Event } from "@core/schemas/therapist";
import { AccountType } from "@core/schemas/user";
import { TherapistContent } from "@components/pages/users/upcoming/therapistContent";
import { set } from "lodash";
import { EventModal } from "@components/pages/users/upcoming/eventModal";

export type Weekdays = {
    [key in string]: string
}

const ClientContent = styled.div``

export const Upcoming = () => {
    const { user, logout } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [modalIsOpen, setModalOpen] = useState(true);

    return (
        <Wrapper alignCenter>
            <Header isLogged={!!user} user={user} logout={logout} />
            { user?.account_type == AccountType.Therapist ?
                <TherapistContent therapist={user!} setError={setError} /> :
                <ClientContent></ClientContent>
            }
            {/*<EventModal modalIsOpen={modalIsOpen} onCloseModal={() => setModalOpen(false)} />*/}
        </Wrapper>
    )
}