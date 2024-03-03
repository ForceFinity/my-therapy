import { useParams } from "react-router-dom";
import { ReferralArticle } from "./referral";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { TrueButton, Wrapper } from "@components/atoms";
import { Footer } from "@components/templates/footer";
import { PrivacyPolicyArticle } from "./pPolicy";
import { CookiesPolicyArticle } from "./cPolicy";
import { TOSArticle } from "./tos";
import { useAuth } from "@core/hooks/useAuth";
import { Header } from "@components/templates";
import { Title } from "@components/molecules";
import { BaseText } from "@components/atoms/texts";

export const ArticleWrapper = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ArticleHeader = styled(Header)`
    
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

`

export const ArticleSubtitle = styled(ArticleTitle)`
    margin-top: 3vh;
    margin-bottom: 1vh;
    font-size: 2rem;
    line-height: 2.8rem;
`

export const ArticleText = styled(BaseText)`
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
    const { user, logout } = useAuth(false)

    const articles: { [key: string]: ReactElement } = {
        "referral": <ReferralArticle user={user} />,
        "terms-of-service": <TOSArticle />,
        "privacy-policy": <PrivacyPolicyArticle />,
        "cookies-policy": <CookiesPolicyArticle />
    }

    return (
        <ArticleWrapper isThin={true}>
            <ArticleHeader isLogged={!!user} user={user} logout={logout} />
            { name && articles[name] }
            <Footer />
        </ArticleWrapper>
    )
}
