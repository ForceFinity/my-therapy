import styled from "styled-components";
import { TrueButton } from "@components/atoms";

export const ParticipantBox = styled.div`
    aspect-ratio: 3 / 2;
`

export const ParticipantListWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1vw;
    width: 100vw;
`

export const CallLayoutWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .str-video__participant-details__name {
        display: none;
    }
`

export const Container = styled.div`
    width: 60vw;
    aspect-ratio: 16 / 9;
    margin: 3vh 0;
    
`

export const CreateCallBtn = styled(TrueButton)`
    width: 12vw;
    display: block;
    border-color: white !important;
    color: white;
`

export const LocalCam = styled.div`
    position: absolute;
    
    bottom: 1vh;
    left: 1vw;
    
    video {
        width: 30%;
        border-radius: .2rem;
    }
`

export const RemoteCam = styled.div`
    video {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }
`

export const CallControls = styled.div`
    position: absolute;
    bottom: 2vh;
    right: 2vw;
`