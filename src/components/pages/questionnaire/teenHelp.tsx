import homeSvg from "@assets/home.svg"
import styled from "styled-components";
import { Href } from "@components/atoms/href";

const TeenHelpWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    
`

const Blur = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #000000;
    opacity: .4;
`

const Content = styled.div`
    position: absolute;
    width: 25vw;
    height: 70vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    
    background-color: white;
    border-radius: 1rem;
    
    @media (max-width: 480px) {
        width: 80vw;
    }
    
    @media (min-width: 480px) and (max-width: 1024px) {
        height: 60vh;
        width: 60vw;
    }
`

const THTitle = styled.span`
    width: 80%;
    font-size: 1.6rem;
    text-align: center;
    
    @media (max-width: 480px) {
        font-size: 1.5rem;
        width: 85%;
    }
`

const THSubTitle = styled(THTitle)`
    font-size: 1.2rem;
    text-align: center;
`

const THButton = styled(Href)`
    padding: .8vh 1.5vw;
    border: .1rem var(--accent) solid;
    border-radius: .8rem;
    
    img {
        width: 2vw;
    }
    
    @media (max-width: 480px) {
        padding: 1vh 4vw;
        
        img {
            width: 8vw;
        }
    }
`

export const TeenHelp = () => {
    return (
        <TeenHelpWrapper>
            <Blur />
            <Content>
                <THTitle>Нашата платформа не предлага услугите си за лица под 16 години.</THTitle>
                <THSubTitle>Не пренебрегвайте своето състояние, обадете се на <br/><Href
                    to="tel:080020202">0800-20-202 </Href>
                    <br/>за спешна емоционална подкрепа.
                </THSubTitle>
                <THButton to="/">
                    <img src={ homeSvg } alt="Вкъщи"/>
                </THButton>
            </Content>
        </TeenHelpWrapper>
    )
}