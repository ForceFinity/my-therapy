import { Href } from "../atoms/href";
import styled, { css } from "styled-components";
import { BaseText } from "@components/atoms/texts";
import { border, fill } from "@components/atoms/primitives";

const StyledHref = styled(Href)<{$isBordered?: boolean, $isFilled?: boolean, $disabled?: boolean}>`
    all: unset;
    
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    ${props => props.$isBordered ? border : ""};
    ${props => props.$isFilled ? fill : ""};
    ${props => props.$disabled ? "opacity: 0.5" : ""};

    padding: .6rem 2rem;

    transition: opacity .2s ease-out;

    ${ props => props.$disabled ? "pointer-events: none;" :
        css`
            &:hover {
                opacity: .65;
                cursor: pointer;
            }
        `
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
    disabled?: boolean
}

export const Button = ({to, children, isBordered, isFilled, disabled}: ButtonProps) => {
    return (
        <StyledHref to={to} $disabled={disabled} $isBordered={isBordered} $isFilled={isFilled}>
            <BaseText>{children}</BaseText>
        </StyledHref>
    )
}