import styled, { css } from "styled-components";

export const border = css`
    border: .1rem var(--accent) solid !important;
    border-radius: .6rem !important;
`

export const fill = css`
    background-color: var(--accent) !important;
    color: #fff !important;
    
    span {
        color: #fff !important;
    }
`

export const LoginIcon = styled.img`
    width: 90%;
    height: 60%;
`