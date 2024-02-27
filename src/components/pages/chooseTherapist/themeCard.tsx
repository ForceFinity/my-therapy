import styled from "styled-components";
import caseSvg from "@assets/case.svg"
import homeSvg from "@assets/home.svg"
import clockSvg from "@assets/clock-lines.svg"
import cloudBoltSvg from "@assets/cloud-bolt.svg"
import { Text } from "@components/atoms/texts";

const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    
    img {
        width: 2.5rem;
    }
    
    span {
        font-size: 1.15rem;
    }
`

const types: {[key: number]: any} = {
    1: caseSvg,
    2: homeSvg,
    3: clockSvg,
    4: cloudBoltSvg
}

export const ThemeCard = ({type, text}: { type: number, text: string }) => {
    return (
        <Content>
            <img src={types[type]} alt={text}/>
            <Text>{text}</Text>
        </Content>
    )
}