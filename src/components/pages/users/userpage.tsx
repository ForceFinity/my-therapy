import penSvg from "@assets/pen.svg"
import { TrueButton, Wrapper } from "@components/atoms";
import { Header } from "@components/templates";
import { BaseText } from "@components/atoms/texts";
import { TypeToRole, User } from "@core/schemas/user";
import { Card, Title } from "@components/molecules";
import styled from "styled-components";
import { getPFP } from "@core/api/users";
import { useEffect, useState } from "react";

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
const PFP = styled.img`
    width: 10vw;
`
const EditButton = styled(TrueButton)`
    width: 2vw;
    margin-right: 2vw;
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
export const UserPage = ({user, logout}: {user: User, logout: () => void}) => {
    const [pfpLoading, setPfpLoading] = useState(true)
    const [pfpUrl, setPfpUrl] = useState<string>()

    useEffect(() => {
        if(!user.is_confirmed) return

        getPFP(user.token as string)
            .then(resp => {
                setPfpUrl(resp.data)
            })
            .finally(() => {
                setPfpLoading(false)
            })
    }, [user]);

    return (
        <UPWrapper isThin={true}>
            <Header disableSigns={true} logout={logout} />
            <Content>
                <Head>
                    <Container>
                        { pfpLoading ?
                            <BaseText>Зарежда се...</BaseText> :
                            <PFP src={ pfpUrl } alt={ user.nickname } />
                        }
                        <NameAndRole>
                            <Name>{user.nickname}</Name>
                            <Role>{TypeToRole[user.account_type.toString()]}</Role>
                        </NameAndRole>
                    </Container>
                    <EditButton>
                        <img src={ penSvg } alt="Промени"/>
                    </EditButton>
                </Head>
                <Cards>
                    <Card
                        title="Предстоящи сесии"
                        description="Вижте своите предстоящи онлайн сесии."
                        to="/users/@me/upcoming"
                        style={{borderColor: "#00ADC5"}}
                    />
                    <Card
                        title="Безопасност"
                        description="Променете данните си за вход и други настройки."
                        to="/users/@me/settings"
                        style={{borderColor: "#6228D7"}}
                    />
                </Cards>
            </Content>
        </UPWrapper>
    )
}