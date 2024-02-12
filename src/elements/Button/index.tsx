import { Link } from "react-router-dom";

import "./styles.css"

interface ButtonProps {
    to: string
    children: string
    className: string
}

export const Button = ({to, children, className}: ButtonProps) => {
    return (
        <Link to={to} className={`btn ${className}`}>
            <span>{children}</span>
        </Link>
    )
}