import VideoCallSvg from "../../assets/video-call.svg";
import "./styles.css"

import { Link } from "react-router-dom";
import styled from "styled-components"
import { Header, Title, Wrapper } from "../../elements";
import { useAuth } from "../../api/account";
import { BannerReferral } from "../../elements/banner";

const LandingTitle = styled(Title)`
    margin-top: 12vh;
    
    @media (min-width: 320px) and (max-width: 768px) {
        font-weight: 500;
        margin-top: -3vh;
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

export const Landing = () => {
    const [user, loading,] = useAuth(false)

    return (
        <Wrapper>
            <LandingHeader isLogged={!!user} user={user} loading={loading} />
            <LandingBanner />
            <div className="content">
                <div className="container">
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
                    <Link to="/questionnaire" className="btn fill border" id="learn-more-btn">
                        <span>Намери специалист!</span>
                    </Link>
                </div>
                <img
                    id="video-call-img" src={VideoCallSvg}
                    alt="Woman having an online therapy session"
                ></img>
            </div>
        </Wrapper>
    )
}
