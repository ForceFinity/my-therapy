import styled from "styled-components";
import { TherapistFull } from "@core/schemas/therapist";

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-top: 8vh;
    
    @media (max-width: 480px) {
        margin: 0 0 4vh 0;
        flex-direction: row;
        justify-content: center;
    }
`

const PFP = styled.img`
    width: 3.5vw;
    border: transparent .1rem solid;
    border-radius: 2vw;
    
    @media (max-width: 480px) {
        width: 14vw;
        border-radius: 7vw;
    }
`

interface SidePanelProps {
    data: {[key: number]: TherapistFull}
    curr: number
    setCurr: (arg0: any) => void
}

export const SidePanel = ({data, curr, setCurr}: SidePanelProps) => {
    return (
        <Content>
            {
                Object.keys(data).map((_, i) => {
                    return <PFP
                        src={ data[i].pfp }
                        alt={ data[i].name }
                        style={i === curr ? {borderColor: "#02D8B9"} : {}}
                        onClick={() => setCurr(i)}
                        key={ i }
                    />
                })
            }
        </Content>
    )
}