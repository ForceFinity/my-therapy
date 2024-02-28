import styled from "styled-components"

export const Wrapper = styled.div<{isThin?: boolean}>`
    height: 92.5vh;
    margin: 0 ${props => props.isThin ? "25vw" : "9vw"};

    @media (min-width: 1024px) and (max-width: 1200px) {
        margin: 0 ${props => props.isThin ? "25vw" : "8vw"};
    }

    @media (max-width: 480px) {
        height: 96.5vh;
        margin: 0 8vw;
    }
`