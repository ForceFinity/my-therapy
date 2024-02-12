import styled from "styled-components"

export const Title = styled.div`
    font-family: "Playfair Display", serif;
    font-size: 3.8rem;
    line-height: 4.2rem;
    width: 60%;
    
    @media (min-width: 1024px) and (max-width: 1200px) {
        width: 85%;
    }

    @media (min-width: 320px) and (max-width: 768px) {
        text-align: center;
        font-size: 3.5rem;
        font-weight: 500;
        width: 100%;
    }
`