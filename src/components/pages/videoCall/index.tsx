import {
    CallingState, ParticipantView,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    StreamVideoParticipant,
    useCall,
    useCallStateHooks,
    User as CallUser,
    Call as GtCall, CallState
} from '@stream-io/video-react-sdk';
import { User } from "@core/schemas/user";
import { useAuth } from "@core/hooks/useAuth";
import { CallLayoutWrap, ParticipantBox, ParticipantListWrap } from "@components/pages/videoCall/videocall.styles";
import { TrueButton } from "@components/atoms";
import { useEffect, useState } from "react";
import { getPFP } from "@core/api/users";
import { Call } from "@core/schemas/call";
import { createCall, getCallToken } from "@core/api/calls";
import { useSearchParams } from "react-router-dom";

const apiKey = 'smnxrdsz8gw2';

// set up the user object

export function VideoCall() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth()
    const [hasJoined, setHasJoined] = useState<boolean>(false);
    const [pfp, setPfp] = useState<string>()
    const [callUser, setCallUser] = useState<CallUser>()
    const [callToken, setCallToken] = useState<string>()
    const [call, setCall] = useState<GtCall>()
    const [client, setClient] = useState<StreamVideoClient>()
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        if(!user) return;

        getPFP(user!.token).then(resp => setPfp(resp.data))

        setCallUser({
            id: user.email,
            name: user.nickname,
            image: pfp,
        })

        getCallToken(user.token).then(resp => {
            setCallToken(resp.data)
            setClient(new StreamVideoClient(
                {
                    apiKey,
                    user: callUser,
                    token: resp.data
                })
            )
        })
    }, [user]);

    if(!user || !client) return <div>В пизду</div>;

    const callId = searchParams.get("id")
    if(!isActive && callId) {
        client.connectUser({id: callUser!.id!}, callToken)

        setCall(client.call("default", callId))
        setIsActive(true)
    }

    if(!isActive || !call) {
        client.connectUser({id: callUser!.id!}, callToken)

        return (
            <TrueButton
                $isBordered
                onClick={() => {
                    createCall({therapist_id: 2, participants: [1, 3], datetime: new Date()}, user!.token)
                        .then(resp => {
                            if (resp.data) setCall(client!.call('default', resp.data.id))
                        })
                    setIsActive(true)
                }}
            >
                Create call
            </TrueButton>
        )
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <CallLayout setIsActive={setIsActive} />
                <TrueButton
                    $isBordered
                    onClick={()=>call!.join({ create: true })}
                >
                        Join call
                </TrueButton>
                <TrueButton
                    $isBordered
                    onClick={()=>navigator.clipboard.writeText(
                        `my-therapy-git-mt-42-rewrite-videocall-forcefinty.vercel.app/videocall?id=${call?.id}`
                    )}
                >
                    Share call
                </TrueButton>
            </StreamCall>
        </StreamVideo>
    );
}

const ParticipantList = ({participants}: {participants: StreamVideoParticipant[]}) => {
    const filterOnlyUnique = (participants: StreamVideoParticipant[]) => {
        const map: {[key: string]: boolean} = {}
        const result: StreamVideoParticipant[] = []

        participants.forEach(item => {
            if (!map[item.sessionId]) {
                map[item.sessionId] = true
                result.push(item)
            }
        })
        console.log(result)
        return result
    }

    return (
        <ParticipantListWrap>
            {filterOnlyUnique(participants).map(participant => (
                <ParticipantBox>
                    <ParticipantView
                        muteAudio
                        participant={participant}
                        key={participant.sessionId}
                    />
                </ParticipantBox>
            ))}
        </ParticipantListWrap>
    )
}

export const CallLayout = ({setIsActive}: {setIsActive: (arg: any) => void}) => {
    const call = useCall()
    const {
        useCallCallingState,
        useParticipantCount,
        useLocalParticipant,
        useRemoteParticipants,
    } = useCallStateHooks()
    const callingState = useCallCallingState()
    const participants = useRemoteParticipants()
    const local = useLocalParticipant()

    if (callingState !== CallingState.JOINED) {
        return <div>Жопа</div>
    }

    return (
        <CallLayoutWrap>
            <ParticipantList participants={participants} />
            <ParticipantView participant={local!}/>
            <TrueButton
                $isBordered
                style={{width: "10vw"}}
                onClick={() => {
                    call?.endCall();
                    setIsActive(false)
                }}>
                End call
            </TrueButton>
        </CallLayoutWrap>
    );
}

