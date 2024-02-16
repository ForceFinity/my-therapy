import styled from "styled-components";
import { Header, Title, TrueButton, Wrapper } from "../../elements";
import Cross from "../../assets/cross.svg"
import Tick from "../../assets/tick.svg"
import { Link, useNavigate } from "react-router-dom";
import { useAuth, verifyFormCompletion } from "../../api/account";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
        width: 80%;
        margin-left: 6vw;
    }
`

const FormCompletionStatus = styled.div`
    display: flex;
    align-items: center;
`

const StatusBox = styled.div`
    margin-left: 4vw;
    margin-bottom: .5rem;
    
    img {
        width: 2rem;
    }
`

export const ReferralArticle = () => {
    const [user,,] = useAuth(false)
    const navigate = useNavigate()
    const [formStatus, setFormStatus] = useState(false)
    const [isFSLoading, setFSLoading] = useState(true)
    const [cookies,] = useCookies()

    const copyReferralLink = () => {
        if(user) navigator.clipboard.writeText('my-therapy.vercel.app/questionnaire?by_user_id=' + user.id)
        else navigate("/sign-in")
    };

    const checkFormCompletion = () => {
        if(user) {
            setFSLoading(true)
            verifyFormCompletion(cookies["Authorization"])
                .then(resp => {
                    if(resp.data !== undefined) {
                        setFSLoading(false)
                        setFormStatus(resp.data)
                    }
                })
        }
    }

    useEffect(() => {
        checkFormCompletion()
    }, []);

    return (
        <ArticleWrapper>
            <ArticleHeader isLogged={!!user} user={user} />
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
                    се потребител, който е попълнил <Link to="https://forms.gle/U3cujeX4PjwpRh2B7">формата </Link>
                    автоматично получава една точка.
                </ArticleText>
                <FormCompletionStatus>
                    <ArticleButton className="fill" onClick={
                        () => {
                            if(user) checkFormCompletion()
                            else navigate("/sign-in")
                        }
                    }>
                        <span>Провери дали попълнена</span>
                    </ArticleButton>
                    <StatusBox>
                        {
                            user ?
                                isFSLoading ?
                                    <span>Зарежда се...</span> :
                                    <img src={formStatus ? Tick : Cross} alt="Статут"/>
                                : <span>Нерегестриран</span>
                        }
                    </StatusBox>
                </FormCompletionStatus>
                <ArticleSubtitle>Награди</ArticleSubtitle>
                <ArticleLI><span>Пакет от 2 безплатни сеанса с психотерапевт, на обща стойност 100лв.</span></ArticleLI>
                <ArticleLI><span>Ваучер за безплатен сеанс с психотерапевт, на стойност 50лв.</span></ArticleLI>
                <ArticleLI><span>Ваучер за отстъпка в размер на 80%</span></ArticleLI>
                <ArticleText>
                    Наградите, които предлагат безплатни сеансове могат да бъдат получени във брой, но само на половината
                    от своята стойност.
                </ArticleText>
                <ArticleButton className="fill" onClick={()=>navigate("/user/me/refereed")}>
                    <span>Виж всички поканени</span>
                </ArticleButton>
            </Content>
        </ArticleWrapper>
    )
}