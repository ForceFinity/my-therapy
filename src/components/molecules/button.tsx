import { Href } from "../atoms/href";
import styled from "styled-components";
import { BaseText } from "@components/atoms/texts";
import { border, fill } from "@components/atoms/primitives";

const StyledHref = styled(Href)<{isBordered?: boolean, isFilled?: boolean}>`
    all: unset;
    
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    ${props => props.isBordered ? border : ""};
    ${props => props.isFilled ? fill : ""};

    padding: .6rem 2rem;

    transition: opacity .2s ease-out;

    &:hover {
        opacity: .65;
        cursor: pointer;
    }

    &:disabled {
        opacity: .5;
        cursor: default;
    }
`

interface ButtonProps {
    to: string
    children: any
    isBordered?: boolean
    isFilled?: boolean
}

export const Button = ({to, children, isBordered, isFilled}: ButtonProps) => {
    return (
        <StyledHref to={to} isBordered={isBordered} isFilled={isFilled}>
            <BaseText>{children}</BaseText>
        </StyledHref>
    )
}