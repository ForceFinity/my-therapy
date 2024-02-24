import styled from "styled-components";
import { useEffect, useState } from "react";

import { Header, Input, Title, TrueButton, Wrapper } from "../../elements";
import { Acquaintance, Credentials, ConfirmEmail } from "./forms";
import Chevron from "../../assets/chevron.svg";
import { ErrorText } from "../../elements/texts";
import { Form, FormInput } from "../../elements/form";
import { useMultiStepForm } from "./useMultiStepForm";
import { validateForm } from "./datepicker/validation";
import { checkEmailOTP, sendConfirmationEmail, signUp, useAuth } from "../../api/account";
import { useCookies } from "react-cookie";
import setAuthCookie from "../../utils/setAuthCookie";
import { useNavigate, useSearchParams } from "react-router-dom";

const QuizHeader = styled(Header)`
`

const Content = styled.div`
    height: 80%;
    margin-top: 4vh;
    
    @media (max-width: 480px) {
        margin-top: 7vh;
    }
`

const QuizTitle = styled(Title)`
    justify-content: center;
    display: flex;
    text-align: center;
    width: 80%;
    font-size: 3.2rem;
    margin-bottom: 2vh;
    
    @media (max-width: 480px) {
        font-size: 3rem;
        
    }
`

const Navigation = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
    width: 40%;

    @media (min-width: 1025px) and (max-width: 1440px) {
        margin-top: 3.5rem;
        width: 30%;
    }

    @media (max-width: 480px) {
        width: 120%;
        margin-top: 7vh;
        
        button {
            height: 3rem;
            
            & > span {
                font-size: 1.4rem;
                font-weight: bolder;
            }
        }
    }
`

const NextButton = styled(TrueButton)`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 40%;
    
    span {
        color: white;
        margin-left: .4rem;
        margin-bottom: .1rem;
    }
    
    img {
        width: 1.3rem;
        rotate: 180deg;
        filter: invert(100%) sepia(61%) saturate(128%) hue-rotate(223deg) brightness(115%) contrast(100%);
    }
`

const PrevButton = styled(TrueButton)`
    width: 15%;
    
    img {
        width: 1.4rem;
        margin-top: .25rem;
    }
`

export const FormWrap = styled.div`
    width: 45vw;
    gap: .8vh;
    
    @media (min-width: 1025px) and (max-width: 1440px) {
        width: 35vw;
    }
    
    @media (max-width: 480px) {
        width: 100%;
    }
`

interface FormWrapperProps {
    className?: string
    children?: any
    title: string
}

export const FormWrapperRaw = ( {className, children, title}: FormWrapperProps ) => {
    return (
        <FormWrap className={className}>
            <QuizTitle>{title}</QuizTitle>
            { children }
        </FormWrap>
    )
}

export const FormWrapper = styled(FormWrapperRaw)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const QuizForm = styled(Form)`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const QuizInput = styled(Input)`
`

export const QuizFormInput = styled(FormInput)`
`

const QuizErrorText = styled(ErrorText)`
    width: 40%;
    margin-top: 1.5vh;
    
    @media (max-width: 480px) {
        width: 100%;    
    }
`

interface FormData {
    nickname: string
    birth_date: Date
    email: string
    password: string
    emailOTP: string
    phoneOTP: string
}

const INITIAL_DATA: FormData = {
    birth_date: new Date(),
    email: "",
    password: "",
    nickname: "",
    emailOTP: "",
    phoneOTP: ""
}

export const Questionnaire = () => {
    const [error, setError] = useState<string>()
    const [data, setData] = useState(INITIAL_DATA)
    const [doEmailSent, setDoEmailSent] = useState(false)
    const [searchParams,] = useSearchParams();
    const [cookies, setCookie] = useCookies()
    const navigate = useNavigate()
    const { steps, currentStepIndex, step, isLastStep, isFirstStep, back, next, setCurrentStepIndex} = useMultiStepForm([
        <Acquaintance {...data} updateFields={updateFields} />,
        <Credentials {...data} updateFields={updateFields} />,
        <ConfirmEmail {...data} updateFields={updateFields} />
    ])
    const by_user_id = searchParams.get("by_user_id")

    const [user,,] = useAuth(false)

    useEffect(() => {
        if(user) {
            if(user.is_confirmed) navigate("/choose-therapist")
            setCurrentStepIndex(2)
        }

    })

    function updateFields(fields: Partial<FormData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setError("")

        if (!isLastStep) {
            return next()
        }

        checkEmailOTP(data.emailOTP, cookies["Authorization"])
            .then(resp => {
                if(resp.status[0] in ["4", "5"] || resp.data === undefined) {
                    if(resp.status === "400") {
                        setError("Грешен Код")
                        return;
                    }

                    if(resp.status === "409")
                        navigate("/")
                }
                else {
                    navigate("/")
                }
            })
    }

    useEffect(() => {
        if(currentStepIndex !== 2) return

        if(user && !user.is_confirmed) {
            updateFields({email: user.email})
            return next()
        }

        const details = validateForm<FormData>(data)
        if(details) {
            setError(details)
            setCurrentStepIndex(currentStepIndex-1)
            return
        }

        signUp(data, by_user_id != null ? by_user_id : "")
            .then((resp) => {
                if(resp.status[0] === "4" || resp.data === undefined) {
                    setData(INITIAL_DATA)
                    setCurrentStepIndex(0)

                    if(resp.status === "409")
                        setError("Акаунт с този имейл вече съществува")

                    return
                }
                else {
                    setAuthCookie(resp.data.access_token, setCookie)
                    setDoEmailSent(true)
                }
            })
    }, [currentStepIndex]);

    useEffect(() => {
        if(doEmailSent) {
            sendConfirmationEmail(data.email, cookies["Authorization"])
                .then((resp) => {
                    if(resp.status[0] === "4" || resp.data === undefined) {
                        if(resp.status === "409") {
                            console.log(1)
                            return next();
                        }
                    }
                })
        }
    }, [doEmailSent])

        // noinspection TypeScriptValidateTypes
    return (
        <Wrapper>
            <QuizHeader disableSigns={true} />
            <Content>
                <QuizForm onSubmit={handleSubmit}>
                    { step }
                    <Navigation>
                        <PrevButton
                            style={
                            isFirstStep ? { opacity: 0.6 } : undefined
                            }
                            type="button"
                            onClick={() => {
                                back()
                                setError("")
                            }}>
                            <img src={ Chevron } alt="Go Home"/>
                        </PrevButton >

                        {
                            currentStepIndex < steps.length - 1 ?
                                <NextButton isFilled={true}>
                                    <span>Напред</span>
                                    <img src={ Chevron } alt="Go Next"/>
                                </NextButton> :
                                <NextButton isFilled={true}>
                                    <span style={{margin: 0}}>Готово</span>
                                </NextButton>
                        }

                    </Navigation>
                    {
                        error &&
                        <QuizErrorText >{error}</QuizErrorText>
                    }
                </QuizForm>
            </Content>
        </Wrapper>
    )
}