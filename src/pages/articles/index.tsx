import { useParams } from "react-router-dom";
import { ReferralArticle } from "./referral";
import { TOSArticle } from "./tos";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { Header, Title, TrueButton, Wrapper } from "../../elements";
import { useAuth } from "../../api/account";
import { Footer } from "../../elements/footer";
import { PPolicyArticle } from "./pPolicy";

export const ArticleWrapper = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;

    
    @media (min-width: 1024px) {
        margin: 0 25vw;
    }
`

export const ArticleHeader = styled(Header)`
    width: 100%;
    @media (min-width: 1024px) {
        width: 160%;
    }
`

export const ArticleContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ArticleTitle = styled(Title)`
    margin-top: 8vh;
    margin-bottom: 2vh;
    font-size: 3.2rem;
    width: 100%;
    text-align: left;
    font-family: "Inter", "serif";

`

export const ArticleSubtitle = styled(ArticleTitle)`
    margin-top: 3vh;
    margin-bottom: 1vh;
    font-size: 2rem;
    line-height: 2.8rem;
`

export const ArticleText = styled.span`
    margin-top: 1vh;
    
    @media (max-width: 480px) {
        font-size: 1.4rem;
    }
`

export const ArticleLI = styled.li`
    margin-left: 2vw;
    margin-bottom: .5vh;
    @media (max-width: 480px) {
        margin-left: 6vw;
        margin-bottom: 1vh;
        font-size: 1.5rem;
        
        span {
            font-size: 1.5rem;
        }
    }
`

export const ArticleButton = styled(TrueButton)`
    margin-top: 1.5vh;
    margin-bottom: 2.5vh;
    
    span {
        color: white;
    }
    
    @media (min-width: 1024px) {
        width: 50%;
    }

    @media (min-width: 1440px) {
        width: 40%;
    }
    
    @media (max-width: 480px) {
        width: 85%;
        height: 2.8rem;
        margin-left: 6vw;
    }
`

export const Articles = () => {
    const { name } = useParams();
    const [user,,] = useAuth(false)
    console.log(name)
    const articles: { [key: string]: ReactElement, } = {
        "referral": <ReferralArticle user={user} />,
        "terms-of-service": <TOSArticle />,
        "privacy-policy": <PPolicyArticle />
    }

    return (
        <ArticleWrapper>
            <ArticleHeader isLogged={!!user} user={user} />
            { name && articles[name] }
            <Footer />
        </ArticleWrapper>
    )
}
