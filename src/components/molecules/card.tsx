import { Text } from "@components/atoms/texts";
import styled from "styled-components";
import { TrueButton } from "@components/atoms";
import { Button } from "@components/molecules/button";

const CardWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; 
    gap: .5rem;
    padding: 2rem;
    height: 10vh;
    
    border: .1rem var(--accent) solid;
    border-radius: 1rem;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: .6rem;
`

const CardTitle = styled(Text)`
    font-size: 1.8rem;
`

const CardDesc = styled(Text)`
    font-size: 1.2rem;
`

const CardButton = styled(Button)`
`

interface CardProps {
    title: string
    description: string
    to: string
    style?: any
}

export const Card = ({title, description, to, style}: CardProps) => {
    return (
        <CardWrap style={style}>
            <Content>
                <CardTitle>{title}</CardTitle>
                <CardDesc>{description}</CardDesc>
            </Content>
            <CardButton isBordered isFilled to={to}>
                <Text>Виж</Text>
            </CardButton>
        </CardWrap>
    )
}