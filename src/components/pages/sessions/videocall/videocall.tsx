import {
    CallingState, ParticipantView,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    StreamVideoParticipant,
    useCall,
    useCallStateHooks,
    User as CallUser,
    Call as GtCall, DefaultParticipantViewUI,
} from '@stream-io/video-react-sdk';
import { useAuth } from "@core/hooks/useAuth";
import {
    CallControls,
    CallLayoutWrap,
    Container, CreateCallBtn, LocalCam,
    ParticipantBox,
    ParticipantListWrap, RemoteCam
} from "@components/pages/sessions/videocall/videocall.styles";
import { TrueButton } from "@components/atoms";
import { useEffect, useRef, useState } from "react";
import { getPFP } from "@core/api/users";
import { createCall, getCallToken } from "@core/api/calls";
import { BaseText } from "@components/atoms/texts";
import { useMedia } from "@core/utils";
import { Placeholder } from "@components/pages/sessions/videocall/placeholder";
import clockSvg from "@assets/clock.svg"

// noinspection SpellCheckingInspection
const apiKey = 'smnxrdsz8gw2';

// set up the user object

export function VideoCall({ id }: {id?: string}) {
    const { user } = useAuth()

    const [pfp, setPfp] = useState<string>()
    const [callUser, setCallUser] = useState<CallUser>()
    const [callToken, setCallToken] = useState<string>()
    const [call, setCall] = useState<GtCall>()
    const [client, setClient] = useState<StreamVideoClient>()
    const [isCallCreated, setIsCallCreated] = useState<boolean>(false)

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

    useEffect(() => {
        if(client) {
            client!.on("call.ended", (e=> {
                setIsCallCreated(false)
            }))
        }
    }, [client]);

    if(!user || !client) return <div>В пизду</div>;

    if(!isCallCreated && id) {
        client.connectUser({id: callUser!.id!}, callToken).then()

        setCall(client.call("default", id))
        setIsCallCreated(true)
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <Container>
                    {!isCallCreated || !call ?
                        <Placeholder>
                            <CreateCallBtn
                                $isBordered
                                onClick={() => {
                                    client!.connectUser({id: callUser!.id!}, callToken).then()

                                    createCall({therapist_id: 2, participants: [1, 3], datetime: new Date()}, user!.token)
                                        .then(resp => {
                                            if (resp.data) setCall(client!.call('default', resp.data.id))
                                        })
                                    setIsCallCreated(true)
                                }}
                            >
                                <BaseText>Започни срещата</BaseText>
                            </CreateCallBtn>
                        </Placeholder> :
                        <CallLayout setIsCallCreated={setIsCallCreated} />
                    }
                </Container>
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

export const CallLayout = ({setIsCallCreated}: {setIsCallCreated: (arg: any) => void}) => {
    const call = useCall()
    const {
        useCallCallingState,
        useParticipantCount,
        useLocalParticipant,
        useRemoteParticipants,
    } = useCallStateHooks()
    const callingState = useCallCallingState()
    const pCount = useParticipantCount()
    const participants = useRemoteParticipants()
    const local = useLocalParticipant()

    if (callingState !== CallingState.JOINED) {
        return (
            <Placeholder>
                { pCount > 0 ?
                    <BaseText style={{color: "white"}}>Клиентът чака.</BaseText> :
                    <BaseText style={{color: "white"}}>Клиентът още не е влязъл.</BaseText>
                }
                <CreateCallBtn
                    // style={ {display: "none"}}
                    $isBordered
                    onClick={()=>call!.join({ create: true })}
                >
                    <BaseText>Влез в стаята</BaseText>
                </CreateCallBtn>
            </Placeholder>
        )
    }

    return (
        <CallLayoutWrap>
            { participants.length > 0 ?
                <RemoteCam>
                    <ParticipantView
                        ParticipantViewUI={<DefaultParticipantViewUI showMenuButton={false} />}
                        muteAudio
                        participant={participants[0]} />
                </RemoteCam> :
                <Placeholder>
                    <BaseText>Очакваме...</BaseText>
                    <img src={clockSvg} alt="Очакваме..."/>
                </Placeholder>
            }
            <LocalCam>
                <ParticipantView
                    ParticipantViewUI={<DefaultParticipantViewUI showMenuButton={false} />}
                    participant={local!}/>
            </LocalCam>
            <CallControls>
                <CreateCallBtn
                    $isBordered
                    onClick={()=>navigator.clipboard.writeText(
                        `https://my-therapy-git-mt-42-rewrite-videocall-forcefinty.vercel.app/sessions/${call?.id}`
                    )}
                >
                    <BaseText>Сподели линк</BaseText>
                </CreateCallBtn>
            </CallControls>
        </CallLayoutWrap>
    );
}

