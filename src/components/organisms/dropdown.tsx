import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Href } from "@components/atoms/href";
import { TrueButton } from "@components/atoms";

interface DropdownContextProps {
    isOpen: boolean
    setIsOpen: any
}

interface DropdownProps {
    children: any
}


const DropdownContext = createContext<DropdownContextProps>({
    isOpen: false,
    setIsOpen: () => {},
});

const DropdownWrapper = styled.div`
    position: relative;
`

export const Dropdown = ({children}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
            <DropdownWrapper>{children}</DropdownWrapper>
        </DropdownContext.Provider>
    );
}

const DropdownButtonStyled = styled(TrueButton)`
    display: flex;
    gap: 1vw;
    align-items: center;
`
const DropdownButton = ({ children, showChevron = true }: { children: any, showChevron?: boolean }) => {
    const { isOpen, setIsOpen } = useContext(DropdownContext); // get the context

    return (
        <DropdownButtonStyled
            onClick={() => setIsOpen(!isOpen)}
        >
            { children }
            {showChevron &&
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={15} height={15}
                    strokeWidth={4}
                    stroke="currentColor"
                    style={isOpen ? {rotate: "180deg"} : {}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
            }
        </DropdownButtonStyled>
    )
}

const ContentWrap = styled.div`
    position: absolute;
    overflow: hidden;
    overflow-y: auto;
    background: white;
    
    padding: .8rem;
    
    right: -1rem;
    
    z-index: 500;
`
const DropdownContent = ({children}: { children: any }) => {
    const {isOpen} = useContext(DropdownContext); // get the context

    return (
        <ContentWrap hidden={!isOpen}>
            {children}
        </ContentWrap>
    );
}

const List = styled.ul`
    padding: 0;
    list-style-type: none;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5vh;
`
const DropdownList = ({ children, props }: { children: any, props?: any }) => {
    const { setIsOpen } = useContext(DropdownContext); // get the context

    return (
        <List onClick={() => setIsOpen(false)} {...props}>
            { children }
        </List>
    );
};

const ListItem = styled.li`
    white-space: nowrap;
`
const DropdownHref = styled(Href)`
    color: inherit;
`
const DropdownItem = ({ children, to }: { children: any, to: string }) => {
    return (
        <ListItem>
            <DropdownHref to={to}>{ children }</DropdownHref>
        </ListItem>
    );
}

Dropdown.Button = DropdownButton
Dropdown.Content = DropdownContent
Dropdown.List = DropdownList
Dropdown.Item = DropdownItem
