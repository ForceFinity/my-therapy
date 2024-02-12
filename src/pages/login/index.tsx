import googleSvg from "../../assets/google.svg"
import { Header, Input, Title, Wrapper } from "../../elements";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { useCookies } from "react-cookie";
import { getToken, TokenResponse, useAuth } from "../../api/account";
import parseJWT from "../../utils/parseJWT";
import { ErrorText } from "../../elements/texts";
import { useNavigate } from "react-router-dom";

const LoginWrapper = styled(Wrapper)`
    @media (min-width: 1025px) {
        margin: 0 7vw;
    }`

const LoginHeader = styled(Header)`
    margin-top: 6vh;
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
`

const SignUpTitle = styled(FormTitle)`
    font-size: 2.5rem;
    text-align: left;
`

const FormInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-top: 1.2rem;

    input {
        height: 1.8rem;
    }

    span {
        margin-left: .8rem;
        margin-bottom: .15rem;
    }

    @media (min-width: 1025px) {
        width: 65%;
    }
`

const SignIn = styled.div`
    width: 45%;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    height: 80%;
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

const LoginIcon = styled.img`
    width: 60%;
    height: 60%;
`

const Alternatives = styled.div`
    margin-top: 1rem;
`

const GoogleSignIn = styled.a.attrs({
    href: "/sign-in/google",
    className: "border"
})`
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: .05rem !important;
    height: 2.5rem;
    width: 2.5rem;
`

const SubmitButton = styled(Input).attrs({
    className: "fill"
})`
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 1.6rem;
    width: 38%;
    text-align: center;
    font-size: 1.15rem;
`

const Sep = styled.hr`
    margin-left: 5%;
    border: .05rem solid var(--accent);
    height: 80%;
`

const SignUp = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 10%;
    width: 45%;
    height: 80%;
`

const RegisterButton = styled.a.attrs({
    href: "/questionnaire",
    className: "border btn"
})`
    width: 50%;
    height: 2.4rem;
    margin-top: 2rem;

    @media (min-width: 1025px) {
        width: 40%;
    }
`

export const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPass] = useState<string>("")
    const [toggleBadCreds, setToggleBadCreds] = useState(false)
    const navigate = useNavigate()
    const tokenResp = useRef<TokenResponse>()
    const [, setCookies] = useCookies()

    const [user,] = useAuth()

    useEffect(() => {
        if(user) navigate("/")
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()

        getToken(email, password)
            .then((resp) => {
                tokenResp.current = resp

                if(!tokenResp.current!.success) {
                    setToggleBadCreds(true)
                } else {
                    setToggleBadCreds(false)
                    const session = parseJWT(tokenResp.current!.accessToken as string)
                    const expires = new Date(session.exp! * 1000)

                    setCookies(
                        "Authorization",
                        tokenResp.current?.accessToken,
                        {
                            path: '/',
                            expires
                        }
                    )

                    navigate("/")
                }
                return
            })
    }

    return (
        <LoginWrapper>
            <LoginHeader areSignsOn={false} />

            <Content>
                <SignIn>
                    <form onSubmit={handleSubmit}>
                        <FormTitle className="title" >Влезте в своя акаунт</FormTitle>
                        <FormInput>
                            <span>Имейл</span>
                            <Input 
                                type="text"
                                name="email"
                                value={email} 
                                placeholder="example@mail.com"
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </FormInput>
                        <FormInput>
                            <span>Парола</span>
                            <Input 
                                type="password"
                                name="password"
                                value={password} 
                                placeholder="qwerty1234"
                                onChange={(e) => setPass(e.target.value)} 
                            />
                            <RememberMe>
                                <input type="checkbox"></input>
                                <div className="checkmark"></div>
                                <span>Запомни ме</span>
                            </RememberMe>
                        </FormInput>
                        <Alternatives>
                            <GoogleSignIn>
                                <LoginIcon src={ googleSvg } alt="Google Sign-In" />
                            </GoogleSignIn>
                        </Alternatives>
                        <SubmitButton type="submit" value="Влез" />
                        { toggleBadCreds && <ErrorText>Грешен имейл или парола</ErrorText> }
                    </form>
                </SignIn>
                <Sep />
                <SignUp>
                    <SignUpTitle>Нямате акаунт? Започнете пътя си сега!</SignUpTitle>
                    <RegisterButton><span>Регистрация</span></RegisterButton>
                </SignUp>
            </Content>
        </LoginWrapper>
    )
}
