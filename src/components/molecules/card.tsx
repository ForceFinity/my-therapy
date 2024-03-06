import { BaseText } from "@components/atoms/texts";
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

const CardTitle = styled(BaseText)`
    font-size: 1.8rem;
`

const CardDesc = styled(BaseText)`
    font-size: 1.2rem;
`

const CardButton = styled(Button)`
`

interface CardProps {
    title: string
    description: string
    to: string
    style?: any
    disabled?: boolean
}

export const Card = ({title, description, to, style, disabled}: CardProps) => {
    return (
        <CardWrap style={style}>
            <Content>
                <CardTitle>{title}</CardTitle>
                <CardDesc>{description}</CardDesc>
            </Content>
            <CardButton disabled={disabled} isBordered isFilled to={to}>
                <BaseText>Виж</BaseText>
            </CardButton>
        </CardWrap>
    )
}