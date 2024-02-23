import { Href } from "./href";
import styled from "styled-components";

const StyledHref = styled(Href)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    height: 2.4rem;
    width: 6rem;

    transition: opacity .8s ease-out;

    &:hover {
        opacity: 0.65;
        cursor: pointer;
    }

    span {
        color: black;
    }
`

interface ButtonProps {
    to: string
    children: any
    className?: string
}

export const Button = ({to, children, className}: ButtonProps) => {
    return (
        <StyledHref to={to} className={`btn ${className}`}>
            <span>{children}</span>
        </StyledHref>
    )
}