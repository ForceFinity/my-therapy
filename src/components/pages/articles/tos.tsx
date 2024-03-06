import { ArticleContent, ArticleSubtitle, ArticleText, ArticleTitle } from "./index";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseText } from "@components/atoms/texts";

const ArticleLIStyled= styled.li`
    font-size: 1.2rem;
    margin-left: 2vw;
    margin-bottom: .5vh;
    
    @media (max-width: 480px) {
        margin-left: 6vw;
        margin-bottom: 1vh;
        font-size: 1.5rem;

        span {
            font-size: 1.4rem;
        }
    }
`

export const TOSArticle = () => {
    return (
        <ArticleContent>
            <ArticleTitle>Условия за ползване</ArticleTitle>
            <ArticleText style={{marginBottom: "1vh"}}>
                Добре дошли в MyTherapy. Тези Условия за ползване регулират вашето използване на
                нашия уебсайт и услуги. Чрез достъпване или използване на нашия уебсайт вие се
                съгласявате да спазвате тези условия.
            </ArticleText>
            <ArticleSubtitle>1. Събиране на лична информация</ArticleSubtitle>
            <ArticleLIStyled>
                <BaseText>Ние събираме лична информация като Име/потребителско име, имейл адрес, номера на дебитни/кредитни карти, парола и възраст.</BaseText>
            </ArticleLIStyled>
            <ArticleLIStyled>
                <BaseText>Можем да използваме тази информация, за да предоставим нашите услуги, да обработваме плащания и да комуникираме с вас.</BaseText>
            </ArticleLIStyled>
            <ArticleLIStyled>
                <BaseText>
                    Вашата поверителност и сигурност са важни за нас. Обработваме вашата
                    лична информация в съответствие с нашата <Link to="/articles/privacy-policy">Политика за поверителност</Link>.
                </BaseText>
            </ArticleLIStyled>
            <ArticleSubtitle>2. Имейл комуникация</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>
                        С използването на нашия уебсайт вие давате съгласието си да получавате имейли от нас относно
                        вашия акаунт, транзакции и промоционални оферти.
                    </BaseText>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <BaseText>
                        Можете да се откажете от промоционалните имейли по всяко време, следвайки инструкциите за
                        отписване, включени в имейлите.
                    </BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>3.	Проследяване на данни</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>
                        Не показваме реклами и не използваме Facebook Pixel на нашия уебсайт.
                    </BaseText>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <BaseText>Използваме проследяване с цел ретаргетинг за маркетингови цели.</BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>4.	Основание за събиране на Вашите лични данни</ArticleSubtitle>
            <ArticleText>
                <ArticleText>
                    ForceFNTY обработва Вашите лични данни на основание чл. 6, ал. 1, „а“ от Общия регламент
                    относно защитата на данните (Регламент 2016/679, наричан „ОРЗД“) – на основание Вашето изрично,
                    недвусмислено, информирано и конкретно съгласие, което Ви молим да дадете отделно,
                    на основание чл. 6, ал. 1, „б“, ОРЗД– за изпълнение на договора за предоставяне на услуги,
                    както и на основание чл. 6, ал. 1 „е“ – за да следваме нашите легитимни интереси.
                </ArticleText>
            </ArticleText>
            <ArticleSubtitle>5. Технологии за проследяване</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>
                        Нашият уебсайт използва бисквитки и сесии, за да проследи и подобри потребителския опит.
                    </BaseText>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <BaseText>Бисквитките се използват в съответствие с нашата
                        <Link to="/articles/cookies-policy"> политика за бисквитки</Link></BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>6.	Вход чрез Google</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>
                        Предлагаме вход чрез Google като удобство за потребителите, за да достъпват нашия уебсайт.
                    </BaseText>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <BaseText>Вашето използване на входа чрез Google е предмет на Условията за ползване и
                        Политиката за поверителност на Google.</BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>7.	Ограничение на възрастта</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>
                        Нашият уебсайт не се предлага на потребители под 13 години.
                    </BaseText>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <BaseText>Използването на нашите сервиси от потребители под 18 години е възможно само под родителски контрол.</BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>Томболи и ваучери</ArticleSubtitle>
            <ArticleText>
                Ние си оставяме правото за анулиране на всяка провеждаща се томбола. Запазваме си правото да анулираме
                всеки ваучер по всяко време.
            </ArticleText>
            <ArticleSubtitle>8.	Свържете се с нас</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>Потребителите могат да се свържат с нас като изпратят имейл на contact.mytherapy@gmail.com.</BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>9.	Достъп до видео и аудио устройства</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>
                        Нашият уебсайт може да изисква достъп до вашите устройства за определени функции,
                        като видео-сесии с психолози.
                    </BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>10. Онлайн плащания</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <BaseText>
                        Нашият уебсайт приема онлайн плащания и може да взема еднократни и/или
                        редовни плащания за предоставени услуги.
                    </BaseText>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <BaseText>
                        Обработката на плащанията се извършва сигурно чрез нашия обработващ партньор.
                        Не съхраняваме данни за кредитни карти на нашите сървъри.
                    </BaseText>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleText style={{marginTop: "5vh"}}>
                С използването на нашия уебсайт вие се съгласявате да спазвате тези Условия за ползване.
                Ако имате въпроси или затруднения, моля, свържете се с нас на contact.mytherapy@gmail.com.
            </ArticleText>
            <ArticleText>
                Благодарим ви, че избрахте MyTherapy за вашите онлайн сесии с психолози.
            </ArticleText>
        </ArticleContent>
    )
}