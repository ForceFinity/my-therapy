import styled from "styled-components";
import { border, fill } from "./primitives";

export const TrueButton = styled.button<{$isBordered?: boolean, $isFilled?: boolean}>`
    ${props => props.$isBordered ? border : ""};
    all: unset;
    width: 100%;
    height: 5.5vh;
    
    text-align: center;
    ${props => props.$isFilled ? fill : ""};
    
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