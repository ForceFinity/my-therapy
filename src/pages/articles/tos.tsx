import { ArticleContent, ArticleLI, ArticleSubtitle, ArticleText, ArticleTitle } from "./index";
import { User } from "../../api/account";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../../elements/footer";

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
                <span>Ние събираме лична информация като Име/потребителско име, имейл адрес, номера на дебитни/кредитни карти, парола и възраст.</span>
            </ArticleLIStyled>
            <ArticleLIStyled>
                <span>Можем да използваме тази информация, за да предоставим нашите услуги, да обработваме плащания и да комуникираме с вас.</span>
            </ArticleLIStyled>
            <ArticleLIStyled>
                <span>
                    Вашата поверителност и сигурност са важни за нас. Обработваме вашата
                    лична информация в съответствие с нашата <Link to="/articles/privacy-policy">Политика за поверителност</Link>.
                </span>
            </ArticleLIStyled>
            <ArticleSubtitle>2. Имейл комуникация</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <span>
                        С използването на нашия уебсайт вие давате съгласието си да получавате имейли от нас относно
                        вашия акаунт, транзакции и промоционални оферти.
                    </span>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <span>
                        Можете да се откажете от промоционалните имейли по всяко време, следвайки инструкциите за
                        отписване, включени в имейлите.
                    </span>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>3.	Проследяване на данни</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <span>
                        Не показваме реклами и не използваме Facebook Pixel на нашия уебсайт.
                    </span>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <span>Използваме проследяване с цел ретаргетинг за маркетингови цели.</span>
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
                    <span>
                        Нашият уебсайт използва бисквитки и сесии, за да проследи и подобри потребителския опит.
                    </span>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <span>Бисквитките се използват в съответствие с нашата
                        <Link to="/articles/cookies-policy"> политика за бисквитки</Link></span>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>6.	Вход чрез Google</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <span>
                        Предлагаме вход чрез Google като удобство за потребителите, за да достъпват нашия уебсайт.
                    </span>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <span>Вашето използване на входа чрез Google е предмет на Условията за ползване и
                        Политиката за поверителност на Google.</span>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>7.	Ограничение на възрастта</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <span>
                        Нашият уебсайт не се предлага на потребители под 13 години.
                    </span>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <span>Използването на нашите сервиси от потребители под 18 години е възможно само под родителски контрол.</span>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>8.	Свържете се с нас</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <span>Потребителите могат да се свържат с нас като изпратят имейл на contact.mytherapy@gmail.com.</span>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>9.	Достъп до видео и аудио устройства</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <span>
                        Нашият уебсайт може да изисква достъп до вашите устройства за определени функции,
                        като видео-сесии с психолози.
                    </span>
                </ArticleLIStyled>
            </ArticleText>
            <ArticleSubtitle>10. Онлайн плащания</ArticleSubtitle>
            <ArticleText>
                <ArticleLIStyled>
                    <span>
                        Нашият уебсайт приема онлайн плащания и може да взема еднократни и/или
                        редовни плащания за предоставени услуги.
                    </span>
                </ArticleLIStyled>
                <ArticleLIStyled>
                    <span>
                        Обработката на плащанията се извършва сигурно чрез нашия обработващ партньор.
                        Не съхраняваме данни за кредитни карти на нашите сървъри.
                    </span>
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