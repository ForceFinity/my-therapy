import styled from "styled-components";

export const TrueButton = styled.button<{isLocked?: boolean, isFilled?: boolean}>`
    all: unset;
    width: 100%;
    height: 5.5vh;
    border: .1rem var(--accent) solid;
    border-radius: .6rem;
    
    text-align: center;
    background-color: ${props => props.isFilled ? "var(--accent)" : "transparent"};
    
    transition: opacity .8s ease-out;
    
    &:hover {
        opacity: .65;
        cursor: pointer;
    }
    
    &:disabled {
        opacity: .5;
        cursor: default;
    }
    
    span {
        color: ${props => props.isFilled ? "white" : "black"};
    }
`