import styled from "styled-components";

export const BaseText = styled.span`
    color: inherit;
    font-family: "Inter", sans-serif;
    font-size: 1.2rem;
`

export const ErrorText = styled(BaseText)`
    color: var(--errorColor);
    font-size: .9rem;
    text-align: center;
`

export const Bold = styled(BaseText)`
    font-weight: 500;    
`

export const Marked = styled.mark`
    background-color: var(--highlight)
`