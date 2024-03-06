import { ArticleContent, ArticleLI, ArticleSubtitle, ArticleText, ArticleTitle } from "./index";
import { Link } from "react-router-dom";
import { BaseText } from "@components/atoms/texts";

export const PrivacyPolicyArticle = () => {
    return (
        <ArticleContent>
            <ArticleTitle>Политика за поверителност</ArticleTitle>
            <ArticleText style={{marginBottom: "1vh"}}>
                Тази Политика за поверителност описва как MyTherapy събира, използва и защитава
                личната информация, която ние можем да получим от потребителите на нашия уебсайт. За да предоставим
                нашите услуги, ние можем да изискваме определена лична информация от потребителите. Ние се ангажираме
                да защитаваме поверителността на тази информация и да я използваме само в съответствие с настоящата
                Политика за поверителност.
            </ArticleText>
            <ArticleSubtitle>1.	Събиране на информация</ArticleSubtitle>
            <ArticleText>
                Когато посетите нашия уебсайт, ние можем да събираме определена информация за вас автоматично
                чрез използване на бисквитки и подобни технологии за проследяване. Тази информация може да включва
                IP адреса на вашето устройство, тип на браузъра, версия на операционната система,
                уникални идентификатори на устройството и други подобни данни.
            </ArticleText>
            <ArticleText>
                Освен това, ние можем да поискаме определена лична информация от вас, като например вашето име,
                имейл адрес, данни за плащане и други, когато се регистрирате на нашия уебсайт, запазвате час и друго.
            </ArticleText>
            <ArticleSubtitle>2. Използване на информацията</ArticleSubtitle>
            <ArticleText style={{marginBottom: "1vh"}}>
                Личната информация, която ние събираме от потребителите, може да се използва за следните цели:
            </ArticleText>
            <ArticleLI><BaseText>За предоставяне на нашите услуги и поддръжка на потребителите</BaseText></ArticleLI>
            <ArticleLI><BaseText>За обработка на плащания и изпълнение на поръчки.</BaseText></ArticleLI>
            <ArticleLI><BaseText>За изпращане на информация, свързана с нашата услуга.</BaseText></ArticleLI>
            <ArticleLI><BaseText>За подобряване на нашия уебсайт и персонализиране на потребителския опит.</BaseText></ArticleLI>
            <ArticleLI><BaseText>За анализиране на трафика и поведението на потребителите на уебсайта.</BaseText></ArticleLI>
            <ArticleSubtitle>3.	Разкриване на информацията</ArticleSubtitle>
            <ArticleText>
                Ние можем да разкрием личната информация на потребителите
                на нашия уебсайт на следните условия:
            </ArticleText>
            <ArticleLI>
                <BaseText>Ако това е необходимо за изпълнение на нашите услуги и задачи като обработка на плащания.</BaseText>
            </ArticleLI>
            <ArticleLI>
                <BaseText>С вашето съгласие или по ваша инициатива, когато предоставите информацията за определена цел.</BaseText>
            </ArticleLI>
            <ArticleLI>
                <BaseText>Ако сме законно задължени да го направим спрямо приложимите закони и регулации.</BaseText>
            </ArticleLI>
            <ArticleSubtitle>4.	Защита на информацията</ArticleSubtitle>
            <ArticleText>
                Ние прилагаме подходящи мерки за сигурност, за да предпазим вашата лична информация от загуба,
                злоупотреба или неоторизиран достъп.
            </ArticleText>
            <ArticleSubtitle>5. Бисквитки</ArticleSubtitle>
            <ArticleText>
                Като приемате тази Политика за поверителност, Вие приемате и нашата
                <Link to="/articles/cookies-policy"> Политика за бисквитки</Link>.
            </ArticleText>
            <ArticleSubtitle>6.	Промени в политиката за поверителност</ArticleSubtitle>
            <ArticleText>
                MyTherapy може да актуализира настоящата Политика за поверителност от време на време.
                Всяка промяна ще бъде публикувана на тази страница.
            </ArticleText>
            <ArticleSubtitle>7.	Съгласие с условията</ArticleSubtitle>
            <ArticleText>
                С използването на нашия уебсайт вие се съгласявате с настоящата Политика за поверителност.
                Ако не се съгласявате с тези условия, моля, не използвайте нашия уебсайт.
                За повече информация относно нашата Политика за поверителност, моля,
                свържете се с нас на contact.mytherapy@gmail.com.
            </ArticleText>
            <ArticleText>
                Благодарим ви, че използвате MyTherapy.
            </ArticleText>
        </ArticleContent>
    )
}