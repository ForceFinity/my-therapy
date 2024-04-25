import { useState } from "react";
import { Wrapper } from "@components/atoms";
import styled from "styled-components";
import { Header } from "@components/templates";
import { useAuth } from "@core/hooks/useAuth";
import { AccountType } from "@core/schemas/user";
import { TherapistContent } from "@components/pages/users/upcoming/therapistView/therapistContent";

export type Weekdays = {
    [key in string]: string
}

const ClientContent = styled.div``

export const Upcoming = () => {
    const { user, logout } = useAuth()
    const [error, setError] = useState("")

    return (
        <Wrapper $alignCenter>
            <Header isLogged={!!user} user={user} logout={logout} />
            { user?.account_type == AccountType.Therapist ?
                <TherapistContent therapist={user!} setError={setError} /> :
                <TherapistContent therapist={user!} setError={setError} />

            }
            {/*<EventModal modalIsOpen={modalIsOpen} onCloseModal={() => setModalOpen(false)} />*/}
        </Wrapper>
    )
}