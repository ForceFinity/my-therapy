import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components"

import googleSvg from "@assets/google.svg"
import { getToken } from "@core/api/users";
import { setAuthCookie, useAuth, useMedia } from "@core/utils";
import { Header } from "@components/templates";
import { Title } from "@components/molecules";
import { Input, TrueButton, Wrapper } from "@components/atoms";
import { SubmitButton, FormInput } from "@components/atoms/form";
import { ErrorText, BaseText } from "@components/atoms/texts";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { GoogleSignIn } from "@components/atoms/trueButton";
import { LoginIcon } from "@components/atoms/primitives";
import { getGoogleProfile } from "@core/api/google";
import { AccountType } from "@core/schemas/user";


const LoginWrapper = styled(Wrapper)`
    @media (min-width: 1025px) {
        margin: 0 15vw;
    }`

const LoginHeader = styled(Header)`
    margin-top: 6vh;
`

const Content = styled.div`
    display: flex;
    margin-top: 5rem;
    height: 80%;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`

const SignIn = styled.div`
    width: 45%;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin-top: 4vh;
    }
`

const FormTitle = styled(Title)`
    font-size: 2.8rem;
    width: 90%;
    text-align: center;
    line-height: 3.5rem;
    letter-spacing: -.1rem;

    @media (min-width: 1025px) {
        width: 75%;
    }

    @media (max-width: 480px) {
        font-size: 3.2rem;
        margin-bottom: 4vh;
    }
`

const RememberMe = styled.div`
    display: flex;
    flex-direction: row;
    height: 1rem;
    width: 100%;
    margin-top: .5rem;
    margin-left: .8rem;

    @media (min-width: 1024px) {
        &:hover input ~ .checkmark {
            background-color: #ccc;
        }
    }

    span {
        margin-left: .4rem;
        font-size: .9rem;
        color: #626262;
    }

    input {
        all: unset;
        position: absolute;
        width: 100%;
        height: 1rem;
    }

    .checkmark {
        height: 1rem;
        width: 1rem;
        border: .08rem solid #000;
        border-radius: .3rem;
    }
    
    .checkmark:after {
        content: "";
        display: none;
    }

    input:checked ~ .checkmark:after {
        display: block;
    }

    .checkmark:after {
        margin: auto;
        margin-top: .15rem;
        width: .15rem;
        height: .5rem;
        border: solid var(--accent);
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`

const Alternatives = styled.div`
    margin-top: 1rem;
`

const LoginSubmitButton = styled(SubmitButton)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    width: 38%;
    height: 3.2vh;
    
    &:hover {
        cursor: pointer;
    }

    @media (max-width: 480px) {
        width: 50%;
        height: 1.8rem;
    }
`

const Sep = styled.hr`
    margin-left: 5%;
    border: .05rem solid var(--accent);

    @media (max-width: 480px) {
        height: 0;
        width: 60%;
        margin: 3vh auto .5vh;
    }
`

const SignUp = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 10%;
    width: 45%;

    @media (max-width: 480px) {
        margin: 0;
        align-items: center;
        text-align: center;
        width: 100%;
        height: 10%;
    }
`

const SignUpTitle = styled(FormTitle)`
    font-size: 2.5rem;
    text-align: left;
`

const SignUpTextMobile = styled(BaseText)`
    font-size: 1.1rem;
    p {
        color: #626262;
        font-size: inherit;
    }
    a {
        all: unset;
        font-weight: 600;
        color: var(--accent);
        font-size: inherit;
    }
`

const RegisterButton = styled(TrueButton)`
    width: 50%;
    height: 2.4rem;
    margin-top: 2rem;

    @media (min-width: 1025px) {
        width: 40%;
    }
`

export const Login = () => {
    const [userGoogleToken, setUserGoogleToken] = useState<TokenResponse>()
    const [email, setEmail] = useState<string>("")
    const [password, setPass] = useState<string>("")
    const [doRemember, setDoRemember] = useState<boolean>(false)
    const [toggleBadCreds, setToggleBadCreds] = useState(false)
    const media = useMedia()
    const navigate = useNavigate()
    const [, setCookie] = useCookies()

    const { user } = useAuth(false)

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUserGoogleToken(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const auth = (email: string, password: string) => {
        getToken(email, password)
            .then((resp) => {
                if(resp.status !== "200" || resp.data === undefined) {
                    setToggleBadCreds(true)
                } else {
                    setToggleBadCreds(false)

                    setAuthCookie(resp.data.access_token, setCookie, doRemember)

                    navigate("/users/@me")
                }
                return
            })
    }

    useEffect(() => {
        if(userGoogleToken){
            getGoogleProfile(userGoogleToken.access_token)
                .then(resp => {
                    const data = resp.data
                    if(!data) return

                    auth(data.email, data.id)
                })
            return
        }
    }, [userGoogleToken]);

    useEffect(() => {
        if(user) navigate("/")
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()

        auth(email, password)
    }

    // noinspection TypeScriptValidateTypes
    return (
        <LoginWrapper>
            <LoginHeader disableSigns={true} />

            <Content>
                <SignIn>
                    <form onSubmit={handleSubmit}>
                        {
                            media.isLaptop ?
                                <FormTitle className="title" >Влезте в своя акаунт</FormTitle> :
                                <FormTitle className="title" >Добре дошли!</FormTitle>
                        }
                        <FormInput>
                            <BaseText>Имейл</BaseText>
                            <Input
                                type="text"
                                name="email"
                                value={email}
                                placeholder="example@mail.com"
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            />
                        </FormInput>
                        <FormInput>
                            <BaseText>Парола</BaseText>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="qwerty1234"
                                onChange={(e) => setPass(e.target.value)}
                            />
                            {/*<RememberMe>*/}
                            {/*    <input*/}
                            {/*        type="checkbox"*/}
                            {/*        defaultChecked={ doRemember }*/}
                            {/*        onChange={() => setDoRemember(s => !s)}*/}
                            {/*    />*/}
                            {/*    <div className="checkmark"></div>*/}
                            {/*    <BaseText>Запомни ме</BaseText>*/}
                            {/*</RememberMe>*/}
                        </FormInput>
                        <Alternatives>
                            <GoogleSignIn $isBordered type="button" onClick={()=>login()}>
                                <LoginIcon src={ googleSvg } alt="Google Sign-In" />
                            </GoogleSignIn>
                        </Alternatives>
                        <LoginSubmitButton type="submit" value="Влез" />
                        { toggleBadCreds && <ErrorText>Грешен имейл или парола</ErrorText> }
                    </form>
                </SignIn>
                <Sep />
                <SignUp>
                    {
                        media.isLaptop ?
                            <SignUpTitle> Нямате акаунт? Започнете пътя си сега! </SignUpTitle> :
                            <SignUpTextMobile>
                                <p>Нямате акаунт?</p>
                                <Link to="/questionnaire">
                                    Започнете { media.isLaptop && "пътя си " }сега!
                                </Link>
                            </SignUpTextMobile>
                    }
                    {
                        media.isLaptop &&
                        <RegisterButton $isBordered={true} onClick={() => navigate("/questionnaire")}>
                            <BaseText>Регистрация</BaseText>
                        </RegisterButton>
                    }
                </SignUp>
            </Content>
        </LoginWrapper>
    )
}
