import styled from "styled-components";
import { useRef, useState } from "react";
import ChevronGreenSvg from "@assets/chevron-green.svg";
import { Href } from "../atoms/href";

const EBWrapper = styled.div`
`

const Expand = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    gap: .5rem;
    
    img {
        margin-top: .1rem;
        width: 2.2%;
    }
`

const Content = styled.div<{ isFolded: boolean; maxHeightRem: number }>`
    max-height: ${props => props.isFolded ? props.maxHeightRem + "rem" : "100%"};
    position: relative;
    overflow: hidden;
    
    &::after {
        content: "";
        position: absolute;
        z-index: ${props => props.isFolded ? 0 : -1};
        bottom: 0;
        left: 0;
        pointer-events: none;
        background-image: linear-gradient(rgba(255, 255, 255, 0), white 80%);
        width: 100%;
        height: 4em;
    }
`

interface ExpandableTextProps {
    children: any,
    maxHeightRem: number
}

export const ExpandableBox = ({children, maxHeightRem}: ExpandableTextProps) => {
    let contentRef = useRef<HTMLDivElement>(null)
    const [isFolded, setIsFolded] = useState(true)

    // noinspection TypeScriptValidateTypes
    return (
        <EBWrapper>
            <Content isFolded={isFolded} maxHeightRem={maxHeightRem} ref={contentRef}>
                { children }
            </Content>

            <Expand onClick={() => setIsFolded(!isFolded)} >
                <Href to={"javascript:;"}><span>
                    { isFolded ? "Разтвори" : "Затвори" }
                </span></Href>
                <img src={ ChevronGreenSvg } style={ !isFolded ? {rotate: "180deg"} : {} } alt="Разтвори"/>
            </Expand>
        </EBWrapper>
    )
}