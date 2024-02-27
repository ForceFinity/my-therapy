import VideoCallSvg from "@assets/video-call.svg";
import "./styles.css"

import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { useAuth } from "@core/hooks/useAuth";
import { TrueButton, Wrapper } from "@components/atoms";
import { BannerReferral } from "@components/organisms/banner";
import { Title } from "@components/molecules";
import { Header } from "@components/templates";
import { Text } from "@components/atoms/texts";

const LandingTitle = styled(Title)`
    margin-top: 12vh;
    
    @media (min-width: 320px) and (max-width: 768px) {
        font-weight: 400;
        margin-top: -2vh;
    }
`

const LandingHeader = styled(Header)`
`

const LandingBanner = styled(BannerReferral)`
    position: absolute;
    top: 6vh;
    left: 36vw;
    
    img {
        width: 25vw;
    }
    
    &:hover {
        cursor: pointer;
    }
    
    @media (max-width: 480px) {
        position: unset;
        display: flex;
        justify-content: center;
        
        img {
            width: 75vw;
        }

        ${LandingTitle} {
            margin-top: -2vh;
        }
    }
`

const ChooseTherapistButton = styled(TrueButton)`
    width: 40%;
    
    @media (max-width: 480px) {
        width: 80%;  
        height: 5vh;
        
        & > span {
            font-size: 1.4rem;
        }
    }
`

const Container = styled.div`
    @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export const Landing = () => {
    const [user, loading,] = useAuth(false)
    const navigate = useNavigate()

    return (
        <Wrapper>
            <LandingHeader isLogged={!!user} user={user} loading={loading} />
            <LandingBanner />
            <div className="content">
                <Container>
                    <LandingTitle>Погрижи се за себе си</LandingTitle>

                    <div className="subtitle">
                    <Text>
                        Искате ли да започнете пътешествие към по-дълбоко разбиране на себе си?
                        Нека осветим вашия път - <mark>опитайте първата си сесия с психотерапевт с 90% отстъпка.</mark>
                    </Text>
                    </div>
                    <div className="subtitle__mobile" style={{display: "none"}}>
                    <Text>
                        Нека Ви помогнем да намерите <mark>точния</mark> терапевт
                    </Text>
                    </div>
                    <ChooseTherapistButton isFilled={true} onClick={() => navigate("/questionnaire")} >
                        <Text>Намери специалист!</Text>
                    </ChooseTherapistButton>
                </Container>
                <img
                    id="video-call-img" src={VideoCallSvg}
                    alt="Woman having an online therapy session"
                ></img>
            </div>
        </Wrapper>
    )
}
