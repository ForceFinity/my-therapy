// noinspection TypeScriptValidateTypes

import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

import hangUpSvg from "@assets/phone-xmark.svg"
import { useMedia } from "@core/utils/mediaQueries";
import { TrueButton } from "@components/atoms";
import { BaseText, ErrorText } from "@components/atoms/texts";
import clockSvg from "@assets/clock.svg"
import { AccountType, User } from "@core/schemas/user";
import { TherapistControls } from "@components/pages/sessions/therapistControls";

const VideoBox = styled.div<{$isPortrait: boolean, $isWaiting: boolean}>`
    position: relative;
    
    border-radius: 1rem;
    ${props => props.$isWaiting && "background: linear-gradient(115deg, #058270, #01e8c5);"}
    
    margin-top: ${props => props.$isPortrait ? 0 : "5vh"};
    margin-bottom: 4vh;
    
    video {
        aspect-ratio: ${props => props.$isPortrait ? "9 / 16" : "16 / 9"};
        object-fit: cover;
    }
`

const Placeholder = styled.div<{$isVisible: boolean}>`
    position: absolute;
    display: ${props => props.$isVisible ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    gap: 1vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    img {
        width: 4vw;
        filter: brightness(0) invert(1);
    }
    
    span {
        color: white;
    }
`

const TherapistVideo = styled.video`
    border-radius: 1rem;
    width: 100%;
    
    @media (max-width: 480px) {
        height: 100vh;   
    }
`

const ClientVideo = styled.video<{$isPortrait: boolean}>`
    position: absolute;
    ${props => props.$isPortrait ? "top: 1rem" : "bottom: 1rem"};
    right: 1.5rem;
    border-radius: .6rem;
    width: 30%;
`

const ControlsBox = styled.div`
    display: flex;
    gap: .5rem;
    flex-direction: column;
    width: 20vw;
    margin-right: 62vw;
`

const CloseCallButton = styled(TrueButton)`
    position: absolute;
    bottom: 1rem;
    border-color: #FF0000;
    border-radius: 7.5vw;
    background-color: rgba(255, 255, 255, 0.8);
    width: 4vw;
    height: 4vw;

    left: 50%;
    transform: translateX(-50%);

    img {
        margin-top: .3rem;
        margin-right: .1rem;
        width: 2vw;
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

export const VideoCall = ({user, className}: {user: User, className?: string}) => {
    const webcamRef = useRef<HTMLVideoElement>(null)
    const remoteRef = useRef<HTMLVideoElement>(null)
    const callBtnRef = useRef<HTMLButtonElement>(null)
    const answerBtnRef = useRef<HTMLButtonElement>(null)
    const [callID, setCallId] = useState("")
    const remoteStream = useMemo(() => new MediaStream(), [])
    const media = useMedia()
    const [error, setError] = useState<string>()
    const [isCallConnected, setIsCallConnected] = useState(false)

    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun3.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    let pc = new RTCPeerConnection(servers);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                aspectRatio: media.isLaptop ? 16/9 : 9/16
            },
            audio: true
        })
            .then(stream => {
                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                })

                if(webcamRef.current){
                    webcamRef.current.srcObject = stream;
                }
            })
            .catch(reason => {
                setError(reason.toString())
            })

    }, [webcamRef]);

    pc.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
            console.log("Remote track", track)
            remoteStream.addTrack(track)
        })

        if(remoteRef.current){
            remoteRef.current.srcObject = remoteStream;}
    }

    const handleCreateCall = async () => {
        const callDoc = await addDoc(collection(firestore, 'calls'), {});
        const offerCandidates = collection(firestore, "calls", callDoc.id, 'offerCandidates');
        const answerCandidates = collection(firestore, "calls", callDoc.id, 'answerCandidates');

        setCallId(callDoc.id)
        // Get candidates for caller, save to db
        pc.onicecandidate = event => {
            event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
        };
        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await setDoc(callDoc, { offer });

        // Listen for remote answer
        onSnapshot(callDoc, (snapshot) => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data?.answer) {
                setIsCallConnected(true)
                pc.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
        });

        // Listen for remote ICE candidates
        onSnapshot(answerCandidates, snapshot => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    pc.addIceCandidate(change.doc.data());
                }
            });
        });
    }

    const handleAnswerCall = async () => {
        const callId = callID;
        if(!callId) {
            setError("Зарежда се...")
            return
        }
        const callDoc = doc(firestore, 'calls', callId);
        const offerCandidates = collection(firestore, "calls", callId, 'offerCandidates');
        const answerCandidates = collection(firestore, "calls", callId, 'answerCandidates');

        if(webcamRef.current && !webcamRef.current.srcObject) {
            setError("Зарежда се...")
            return
        }

        pc.onicecandidate = event => {
            event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
        };

        // Fetch data, then set the offer & answer
        const callData = (await getDoc(callDoc)).data();

        if(!callData || !callData.offer) {
            setError("Зарежда се...")
            return
        }

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);
        console.log("Answer pc: ", pc)
        if(pc.connectionState === "failed") {
            console.log("Restarting ice")
            pc.restartIce()
        }
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDoc, { answer });

        // Listen to offer candidates
        onSnapshot(offerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added' && pc.signalingState !== "closed") {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
    }

    return (
        <div className={className}>
            {/*{ media.isLaptop && <Header /> }*/}
            <VideoBox $isPortrait={media.isMobile} $isWaiting={!isCallConnected}>
                <Placeholder $isVisible={!isCallConnected}>
                    <img src={ clockSvg } alt="Чакаме..." />
                    <BaseText>Чакаме събеседник...</BaseText>
                </Placeholder>
                <TherapistVideo ref={remoteRef} autoPlay ></TherapistVideo>
                <ClientVideo $isPortrait={media.isMobile} ref={webcamRef} autoPlay ></ClientVideo>
                <CloseCallButton onClick={ () => {
                    remoteRef.current!.srcObject = null
                    webcamRef.current!.srcObject = null
                    pc.close()
                    setIsCallConnected(false)
                } }>
                    <img src={ hangUpSvg } alt="Затвори"/>
                </CloseCallButton>
            </VideoBox>

            {/*<ControlsBox>*/}
            {/*    <TrueButton ref={callBtnRef} onClick={handleCreateCall}>*/}
            {/*        <BaseText>Create call</BaseText>*/}
            {/*    </TrueButton>*/}
            {/*    <Input value={callID} onChange={(e) => setCallId(e.target.value)} />*/}
            {/*    <TrueButton ref={answerBtnRef} onClick={handleAnswerCall}>*/}
            {/*        <BaseText>Answer call</BaseText>*/}
            {/*    </TrueButton>*/}
            {/*</ControlsBox>*/}
            <ErrorText>{ error }</ErrorText>
        </div>
    )
}