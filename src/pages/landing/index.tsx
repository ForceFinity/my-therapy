import VideoCallSvg from "../../assets/video-call.svg";
import "./styles.css"

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Button, Header, Title, TrueButton, Wrapper } from "../../elements";
import { useAuth } from "../../api/account";
import { BannerReferral } from "../../elements/banner";
import { Href } from "../../elements/href";

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
                    <span>
                        Искате ли да започнете пътешествие към по-дълбоко разбиране на себе си?
                        Нека осветим вашия път - <mark>опитайте първата си сесия с психотерапевт с 90% отстъпка.</mark>
                    </span>
                    </div>
                    <div className="subtitle__mobile" style={{display: "none"}}>
                    <span>
                        Нека Ви помогнем да намерите <mark>точния</mark> терапевт
                    </span>
                    </div>
                    <ChooseTherapistButton isFilled={true} onClick={() => navigate("/questionnaire")} >
                        <span>Намери специалист!</span>
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
