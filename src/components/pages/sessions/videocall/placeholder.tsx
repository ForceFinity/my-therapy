import styled from "styled-components";

export const Placeholder = styled.div`
    width: 100%;
    height: 100%;
    
    background: linear-gradient(115deg, #058270, #01e8c5);
    border-radius: 1vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .8rem;
    
    position: relative;

    span {
        color: white;
        font-size: 1.4rem;
    }
    
    img {
        width: 3vw;
        filter: brightness(0) invert(1);
    }
`