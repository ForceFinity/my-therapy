import styled from "styled-components";
import { Header, Title, TrueButton, Wrapper } from "../../elements";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../api/account";

const ArticleWrapper = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (min-width: 1024px) {
        margin: 0 25vw;
    }
`

const ArticleHeader = styled(Header)`
    width: 100%;
    @media (min-width: 1024px) {
        width: 160%;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ArticleTitle = styled(Title)`
    margin-top: 8vh;
    margin-bottom: 2vh;
    font-size: 3.2rem;
    width: 100%;
    text-align: left;
    font-family: "Inter", "serif";

`

const ArticleSubtitle = styled(ArticleTitle)`
    margin-top: 3vh;
    margin-bottom: 1vh;
    font-size: 2.4rem;
`

const ArticleText = styled.span`
    margin-top: 1vh;
    @media (max-width: 480px) {
        font-size: 1.4rem;
    }
`

const ArticleLI = styled.li`
    @media (max-width: 480px) {
        margin-left: 6vw;
        margin-bottom: 1vh;
        font-size: 1.5rem;
        
        span {
            font-size: 1.5rem;
        }
    }
`

const ArticleButton = styled(TrueButton)`
    margin-top: 1vh;
    margin-bottom: 2vh;
    
    span {
        color: white;
    }
    
    @media (max-width: 480px) {
        width: 80%;
        margin-left: 6vw;
    }
`

export const ReferralArticle = () => {
    const [user,,] = useAuth(false)
    const navigate = useNavigate()

    const copyReferralLink = () => {
        if(user) navigator.clipboard.writeText('mytherapy.vercel.app/questionnaire?by_user_id=' + user.id)
        else navigate("/sign-in")
    };

    return (
        <ArticleWrapper>
            <ArticleHeader />
            <Content>
                <ArticleTitle>Томбола. Условия и награди</ArticleTitle>
                <ArticleText>
                    Радваме се, че участвате в началото на нашия проект. Тук ще намерите условията и инструкциите
                    за участие в томболата.
                </ArticleText>
                <ArticleText>
                    Сроковете на събитието са до 22.02.2024г, като резултатите ще бъдат пратени
                    на следващия ден. Подробности за получаване на наградата ще бъдат пратени на пощата, посочена в профила.
                </ArticleText>
                <ArticleSubtitle>Условия</ArticleSubtitle>
                <ArticleLI><span>Регистрация на сайта</span></ArticleLI>
                <ArticleText>
                    За участието е достатъчна регистрацията, обаче има възможност да
                    <ArticleText className="bold"> повишите своите шансове.</ArticleText> За всеки поканен приятел,
                    който се е регистрирал на този сайт и попълнил
                    <Link to="https://forms.gle/U3cujeX4PjwpRh2B7"> нашата гугл форма</Link>,
                    Вие получавате една точка.
                </ArticleText>
                <ArticleButton onClick={copyReferralLink} className="fill">
                    <span>Копирай линк за покана</span>
                </ArticleButton>
                <ArticleText>
                    Колкото повече точки имате, толкова по-голям е шансът за спечелване на награда. Всеки регистрирал
                    се потребител автоматично получава една точка.
                </ArticleText>
                <ArticleSubtitle>Награди</ArticleSubtitle>
                <ArticleLI><span>Пакет от 2 безплатни сеанса с психотерапевт, на обща стойност 100лв.</span></ArticleLI>
                <ArticleLI><span>Ваучер за безплатен сеанс с психотерапевт, на стойност 50лв.</span></ArticleLI>
                <ArticleLI><span>Ваучер за отстъпка в размер на 80%</span></ArticleLI>
                <ArticleText>
                    Наградите, които предлагат безплатни сеансове могат да бъдат получени във брой, но само на половината
                    от своята стойност.
                </ArticleText>
            </Content>
        </ArticleWrapper>
    )
}