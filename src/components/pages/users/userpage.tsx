import penSvg from "@assets/pen.svg"
import logoutSvg from "@assets/logout.svg"
import accountSvg from "@assets/account.svg"
import { TrueButton, Wrapper } from "@components/atoms";
import { Footer, Header } from "@components/templates";
import { BaseText } from "@components/atoms/texts";
import { AccountType, TypeToRole, User } from "@core/schemas/user";
import { Card } from "@components/molecules";
import styled from "styled-components";
import { getPfp } from "@core/api/users";
import { useEffect, useState } from "react";
import { UserPfp } from "@components/organisms/userPfp";

const UPWrapper = styled(Wrapper)``
const Content = styled.div`
    margin-top: 6vh;
`
const Head = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
`
const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 3vw;
`
const StyledUserPfp = styled(UserPfp)`
    width: 8vw;
    border-radius: 5vw;
`
const EditButton = styled(TrueButton)`
    width: 2vw;
    margin: 0 1vh;
    img {
        width: inherit;
    }
`
const NameAndRole = styled.div`
    display: flex;
    flex-direction: column;
`
const Name = styled(BaseText)`
    font-size: 2.2rem;
`
const Role = styled(BaseText)``
const Cards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5vh;
    margin-top: 10vh;
`

const UserActions = styled.div``

export const UserPage = ({user, logout}: {user: User, logout: any}) => {
    const [pfpLoading, setPfpLoading] = useState(true)
    const [pfpUrl, setPfpUrl] = useState<string>()

    useEffect(() => {
        if(!user.is_confirmed) return

        getPfp(user.token as string)
            .then(resp => {
                setPfpUrl(resp.data)
            })
            .finally(() => {
                setPfpLoading(false)
            })
    }, [user]);

    // noinspection TypeScriptValidateTypes
    return (
        <UPWrapper $isThin={true} $alignCenter>
            <Header disableSigns={true} logout={logout} />
            <Content>
                <Head>
                    <Container>
                        { pfpLoading ?
                            <BaseText>Зарежда се...</BaseText> :
                            <StyledUserPfp pfpUrl={pfpUrl!} nickname={user.nickname} />
                        }
                        <NameAndRole>
                            <Name>{user.nickname}</Name>
                            <Role>{TypeToRole[user.account_type.toString()]}</Role>
                        </NameAndRole>
                    </Container>
                    <UserActions>
                        <EditButton disabled>
                            <img src={ penSvg } alt="Промени"/>
                        </EditButton>
                        <EditButton onClick={logout}>
                            <img src={ logoutSvg } alt="Излез"/>
                        </EditButton>
                    </UserActions>
                </Head>
                <Cards>
                    <Card
                        title="Предстоящи сесии"
                        description="Вижте своите предстоящи онлайн сесии."
                        to="/users/@me/upcoming"
                        // disabled={user.account_type != AccountType.Therapist}
                        style={{borderColor: "#00ADC5"}}
                    />
                    <Card
                        title="Безопасност"
                        description="Променете данните си за вход и други настройки."
                        to="/users/@me/settings"
                        disabled
                        style={{borderColor: "#6228D7"}}
                    />
                    { user.account_type === AccountType.Admin &&
                        <Card
                            title="Админ панел"
                            description="Управление"
                            to="/users/@me/settings"
                            disabled
                            style={{borderColor: "var(--accent)"}}
                        />
                    }
                </Cards>
            </Content>
            <Footer />
        </UPWrapper>
    )
}