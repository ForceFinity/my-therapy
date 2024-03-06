import styled from "styled-components";
import { Link } from "react-router-dom";
import Leaf from "@assets/Leaf.svg"
import GitHubSvg from "@assets/github.svg"
import TelegramSvg from "@assets/telegram.svg"
import { CSSProperties } from "react";
import { Href } from "../atoms/href";
import { BaseText } from "@components/atoms/texts";

const FooterWrap = styled.div`
    width: 80vw;
    margin-top: 10vh;
    
    @media (max-width: 480px) {
        width: 100% !important;
    }
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4vh;
    margin-top: 3vh;
    gap: .5rem;
    
    span {
        margin-top: .5vh;
    }
`

const Sep = styled.hr`
    border: .05rem solid var(--accent);

`

const FooterContent = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 2vh;
    flex-direction: row-reverse;
    
    span {
        color: black;
    }
    
    @media (max-width: 480px) {
        flex-direction: row;
    }
`

const Socials = styled.div`
    display: flex;
    gap: .5rem;
    margin-left: .5rem;
`

export const Footer = ({style}: {style?: CSSProperties}) => {
    // noinspection TypeScriptValidateTypes
    return (
        <FooterWrap style={style}>
            <Sep/>
            <Logo>
                <img src={Leaf} alt="MyTherapy"/>
                <BaseText>2024</BaseText>
            </Logo>
            <FooterContent>
                <Href to="/articles/terms-of-service">
                    <BaseText>Условия за ползване</BaseText>
                </Href>
                <Href to="/articles/privacy-policy">
                    <BaseText>Политика за поверителност</BaseText>
                </Href>
                <Href to="/articles/cookies-policy">
                    <BaseText>Политика за бисквитки</BaseText>
                </Href>
                <Socials>
                    <Link to="https://github.com/ForceFinity/my-therapy">
                        <img src={GitHubSvg} alt="Check out our github!"/>
                    </Link>
                    <Link to="https://t.me/mytherapy_world">
                        <img src={TelegramSvg} alt="Check out our Telegram!"/>
                    </Link>
                </Socials>
            </FooterContent>
        </FooterWrap>
    )
}