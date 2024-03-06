import styled from "styled-components";
import { BaseText } from "@components/atoms/texts";
import {
    createContext,
    ReactElement,
    Suspense, useContext, useEffect,
    useMemo,
    useState
} from "react";
import { TrueButton } from "@components/atoms";
import processRequest from "@core/utils/processRequest";
import { getNoteContent } from "@core/api/therapists";
import { User } from "@core/schemas/user";
import { Placeholder } from "@components/pages/users/upcoming/therapistView/upcomingEvents";

const TabsContext = createContext<{clientId?: string, user?: User}>({})

const TabWrap = styled.div``

const TabTitle = styled(BaseText)`
    font-size: 2rem;
    margin-bottom: 4vh;
`

interface TabProps {
    title: string
    content: ReactElement
}

const Tab = ({title, content}: TabProps) => {
    return (
        <TabWrap>
            <TabTitle>{title}</TabTitle>
            <Suspense fallback={<BaseText>Зарежда се...</BaseText>}>
                { content }
            </Suspense>
        </TabWrap>
    )
}

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`

const TabsSelect = styled.div`
    display: flex;
    gap: 1vw;
    margin-bottom: 2vh;
    
    button {
        height: 2.2rem;
        width: 6.5rem;
        
        span {
            font-size: 1rem;
        }
    }
`

const TabContentWrap = styled.div``

const NoteContent = () => {
    const { clientId, user } = useContext(TabsContext)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()
    const [note, setNote] = useState<{content?: string}>({})

    useEffect(() => {
        clientId && processRequest(
            getNoteContent(user!.token, parseInt(clientId)),
            setNote,
            {
                loadingStoreFn: setIsLoading,
                errStoreFn: setError
            }
        )
    }, []);

    return (
        <TabContentWrap>
            <BaseText style={{fontSize: "1rem"}} >
                { isLoading ?
                    "Зарежда се..." :

                    error ?
                        <Placeholder style={{position: "static"}}>{`Нямате бележки за клиента. Създайте сега.`}</Placeholder> :
                        note.content
                }
            </BaseText>
        </TabContentWrap>
    )
}

export const TherapistControls = ({user}: {user: User}) => {
    const [clientId, setClientId] = useState<string>()
    const [chosenTab, setChosenTab] = useState<string>("")
    const tabs: {[key: string]: TabProps} = useMemo(() => (
        {
            "Бележки": {
                title: "Бележки",
                content: <NoteContent />
            },
            "Анкета": {
                title: "Анкета",
                content: <NoteContent />
            }
        }
    ), [])

    return (
        <Wrap>
            <TabsSelect>
                { Object.keys(tabs).map(tabName => (
                        <TrueButton
                            $isBordered
                            $isFilled={tabName === chosenTab}
                            onClick={ () => setChosenTab(tabName !== chosenTab ? tabName : "") }
                            key={tabName}
                            disabled={tabName==="Анкета"}
                        >
                            <BaseText>{ tabName }</BaseText>
                        </TrueButton>
                )) }
            </TabsSelect>
        <TabsContext.Provider value={ {clientId: "43", user} }>
            { chosenTab && <Tab title={tabs[chosenTab].title} content={tabs[chosenTab].content} /> }
        </TabsContext.Provider>
        </Wrap>
    )
}