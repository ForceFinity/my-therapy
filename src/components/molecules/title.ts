import styled from "styled-components"

export const Title = styled.div`
    font-size: 3.8rem;
    line-height: 4.2rem;
    width: 60%;
    font-family: "Inter", sans-serif;
    
    @media (min-width: 1024px) and (max-width: 1200px) {
        width: 85%;
    }

    @media (min-width: 320px) and (max-width: 768px) {
        text-align: center;
        font-size: 3.2rem;
        width: 100%;
        
        @media (max-width: 400px) {
            font-size: 3rem;
            line-height: 3.8rem;
            letter-spacing: -.15rem;
        }
    }
`