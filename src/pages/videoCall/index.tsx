import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import { doc, collection, onSnapshot, updateDoc, addDoc, setDoc, getDoc } from "firebase/firestore";
import { Header, Input, TrueButton, Wrapper } from "../../elements";

import { firestore } from "./firebase";
import { ErrorText } from "../../elements/texts";

const VideoCallWrapper = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const VideoBox = styled.div`
    margin-top: 5vh;
    position: relative;
    width: 80%;
    
    video {
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }
`

const TherapistVideo = styled.video`
    border-radius: 1rem;
    width: 100%;
`

const ClientVideo = styled.video`
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
    border-radius: .6rem;
    width: 30%;
`

export const VideoCall = () => {
    const webcamRef = useRef<HTMLVideoElement>(null)
    const remoteRef = useRef<HTMLVideoElement>(null)
    const callBtnRef = useRef<HTMLButtonElement>(null)
    const answerBtnRef = useRef<HTMLButtonElement>(null)
    const [callID, setCallId] = useState("")
    const [error, setError] = useState("")
    const remoteStream = useMemo(() => new MediaStream(), [])

    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    const pc = new RTCPeerConnection(servers);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setError(stream)
                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                })
                if(webcamRef.current){

                    webcamRef.current.srcObject = stream;
                    setError(error + "\n" + webcamRef.current.srcObject)
                }
            })

    }, [webcamRef]);

    pc.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track)
        })

        if(remoteRef.current)
            remoteRef.current.srcObject = remoteStream;
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
                pc.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
        });

        // Listen for remote ICE candidates
        onSnapshot(answerCandidates, snapshot => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    pc.addIceCandidate(change.doc.data() as RTCIceCandidate);
                }
            });
        });
    }

    const handleAnswerCall = async () => {
        const callId = callID;
        const callDoc = doc(firestore, 'calls', callId);
        const offerCandidates = collection(firestore, "calls", callId, 'offerCandidates');
        const answerCandidates = collection(firestore, "calls", callId, 'answerCandidates');

        pc.onicecandidate = event => {
            event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
        };

        // Fetch data, then set the offer & answer

        const callData = (await getDoc(callDoc)).data();

        if(!callData) return

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDoc, { answer });

        // Listen to offer candidates

        onSnapshot(offerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change)
                if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
    }

    return (
        <VideoCallWrapper>
            <Header />
            <VideoBox>
                <TherapistVideo ref={remoteRef} autoPlay ></TherapistVideo>
                <ClientVideo ref={webcamRef} autoPlay ></ClientVideo>
            </VideoBox>
            <TrueButton ref={callBtnRef} onClick={handleCreateCall}>
                <span>Create call</span>
            </TrueButton>
            <Input value={callID} onChange={(e) => setCallId(e.target.value)} />
            <TrueButton ref={answerBtnRef} onClick={handleAnswerCall}>
                <span>Answer call</span>
            </TrueButton>
            <ErrorText>{error}</ErrorText>
        </VideoCallWrapper>
    )
}