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

export const LocalCam = styled.div<{$isPortrait?: boolean}>`
    position: absolute;
    
    bottom: 1vh;
    left: 1vw;
    
    video {
        aspect-ratio: 16 / 9;

        width: 30%;
        border-radius: .2rem;
    }
`

export const RemoteCam = styled.div`
    video {
        aspect-ratio: 16 / 9;
        width: 100%;
        height: 100%;
        max-height: 80vh;
        border-radius: 1rem;
    }
`

export const CallControls = styled.div`
    position: absolute;
    bottom: 2vh;
    right: 2vw;
`

export const CloseCallButton = styled(TrueButton)`
    position: absolute;
    bottom: 1rem;
    //border: solid .1rem white;
    border-radius: 7vw;
    background-color: rgba(255, 255, 255, 0.8);
    width: 3.5vw;
    height: 3.5vw;

    left: 50%;
    transform: translateX(-50%);

    img {
        margin-top: .3rem;
        margin-right: .1rem;
        width: 1.8vw;
    }
    
    @media (max-width: 480px) {
        right: 42.5vw;
        width: 15vw;
        height: 15vw;
        bottom: 4rem;
        
        img {
            margin-top: .3rem;
            margin-right: .1rem;
            width: 8vw;
        }
    }
`