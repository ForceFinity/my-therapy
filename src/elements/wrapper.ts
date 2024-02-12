import styled from "styled-components"

export const Wrapper = styled.div`
    height: 92.5vh;
    margin-left: 9vw;
    margin-right: 9vw;

    @media screen and (min-width: 1024px) and (max-width: 1200px) {
        margin-left: 8vw;
        margin-right: 8vw;
    }

    @media (max-width: 480px) {
        height: 96.5vh;
        margin-left: 8vw;
        margin-right: 8vw;
    }
`