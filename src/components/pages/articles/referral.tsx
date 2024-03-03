import styled from "styled-components";
import Cross from "@assets/cross.svg"
import Tick from "@assets/tick.svg"
import { useNavigate } from "react-router-dom";
import { verifyFormCompletion } from "@core/api/users";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
    ArticleButton, ArticleContent,
    ArticleLI,
    ArticleSubtitle,
    ArticleText,
    ArticleTitle,
} from "./index";
import { Href } from "@components/atoms/href";
import { User } from "@core/schemas/user";
import { BaseText } from "@components/atoms/texts";

const FormCompletionStatus = styled.div`
    display: flex;
    align-items: center;
    
    @media (max-width: 480px) {
        flex-direction: column;
    }
`

const StatusBox = styled.div`
    margin-left: 4vw;
    margin-bottom: .5rem;
    
    img {
        width: 2rem;
    }
`

export const ReferralArticle = ({user}: {user?: User}) => {
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
    }, [user]);

    // noinspection TypeScriptValidateTypes
    return (
        <ArticleContent>
            <ArticleTitle>Томбола. Условия и награди</ArticleTitle>
            <ArticleText>
                Радваме се, че участвате в началото на нашия проект. Тук ще намерите условията и инструкциите
                за участие в томболата.
            </ArticleText>
            <ArticleText>
                Сроковете на събитието са до 29.02.2024г, като резултатите ще бъдат пратени
                на следващия ден. Подробности за получаване на наградата ще бъдат пратени на пощата, посочена в профила.
            </ArticleText>
            <ArticleSubtitle>Условия</ArticleSubtitle>
            <ArticleLI><BaseText>Регистрация на сайта</BaseText></ArticleLI>
            <ArticleText>
                За участието е достатъчна регистрация и <ArticleText className="bold">попълване на
                <Href to="https://forms.gle/U3cujeX4PjwpRh2B7"> тази </Href></ArticleText>форма,
                обаче има възможност да
                <ArticleText className="bold"> повишите своите шансове.</ArticleText> За всеки поканен приятел,
                който се е регистрирал на този сайт и попълнил
                <Href to="https://forms.gle/U3cujeX4PjwpRh2B7"> нашата гугл форма</Href>,
                Вие получавате една точка.
            </ArticleText>
            <ArticleButton isBordered={true} isFilled={true} onClick={copyReferralLink} >
                <BaseText>Копирай линк за покана</BaseText>
            </ArticleButton>
            <ArticleButton
                isBordered={true}
                style={{marginTop: "-1vh"}}
                onClick={()=>window.open("https://forms.gle/U3cujeX4PjwpRh2B7", "_blank")}
            >
                <BaseText style={{color: "black"}}>Виж формата</BaseText>
            </ArticleButton>
            <ArticleText>
                Колкото повече точки имате, толкова по-голям е шансът за спечелване на награда. Всеки регистрирал
                се потребител, който е попълнил <Href to="https://forms.gle/U3cujeX4PjwpRh2B7">формата </Href>
                автоматично получава една точка.
            </ArticleText>
            <FormCompletionStatus>
                <ArticleButton
                    isBordered={true}
                    isFilled={true}
                    onClick={
                    () => {
                        if(user) checkFormCompletion()
                        else navigate("/sign-in")
                    }
                }>
                    <BaseText>Провери дали попълнена</BaseText>
                </ArticleButton>
                <StatusBox>
                    {
                        user ?
                            isFSLoading ?
                                <BaseText>Зарежда се...</BaseText> :
                                <img src={formStatus ? Tick : Cross} alt="Статут"/>
                            : <BaseText>Нерегестриран</BaseText>
                    }
                </StatusBox>
            </FormCompletionStatus>
            <ArticleSubtitle>Награди</ArticleSubtitle>
            <ArticleLI><BaseText>Пакет от 2 безплатни сеанса с психотерапевт, на обща стойност 100лв.</BaseText></ArticleLI>
            <ArticleLI><BaseText>Ваучер за безплатен сеанс с психотерапевт, на стойност 50лв.</BaseText></ArticleLI>
            <ArticleLI><BaseText>Ваучер за отстъпка в размер на 80%</BaseText></ArticleLI>
            <ArticleText>
                Наградите, които предлагат безплатни сеансове могат да бъдат получени във брой, но само на половината
                от своята стойност.
            </ArticleText>
            <ArticleButton isBordered={true}  isFilled={true} onClick={()=>navigate("/users/@me/refereed")}>
                <BaseText>Виж всички поканени</BaseText>
            </ArticleButton>
        </ArticleContent>
    )
}