import styled from "styled-components";
import { Input } from "./input";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const FormInput = styled.div`
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

    @media (max-width: 480px) {
        width: 80%;

        input {
            height: 2rem;
        }
    }
`

export const DateInput = styled.button`
    all: unset;
`

export const SubmitButton = styled(Input).attrs({
    className: "fill"
})`
    height: 1.6rem;
    width: 40%;
    text-align: center;
    font-size: 1.15rem;
`
