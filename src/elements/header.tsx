import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Burger from "../assets/burger.svg";
import ArrowDownSvg from "../assets/chevron.svg"
import { Button } from "./button";
import { User } from "../api/account";

import { useMedia } from "../utils/mediaQueries";
import { Href } from "./href";

const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    width: 80vw;

    height: 8vh;
    
    @media (min-width: 1024px) {
        margin-top: 7vh;
    }
    
    @media (max-width: 480px) {
        align-items: center;
        margin-top: 4vh;
    }`

const Profile = styled.div`
    display: flex;
    gap: 2rem;
    width: 20%;
    
    img {
        height: 40%;
        filter: brightness(0) saturate(100%);
        rotate: -90deg; 
    }
`

const Signs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 23%;

    @media screen and (min-width: 1024px) and (max-width: 1200px) {
        width: 30%;
    }

    @media screen and (max-width: 480px) {
        display: block;
        width: 15vw;
        height: 15vw;
        
        & > a {
            display: none;
        }
        
        & > img {
            display: block !important;
            margin-top: .5vh;
            width: 12vw;
        }
    }
`

const SignUpButton = styled(Button)`
    padding: 0 2rem;

    border: .1rem var(--accent) solid;
    border-radius: .6rem;
`

interface HeaderProps {
    className?: string
    disableSigns?: boolean
    isLogged?: boolean
    user?: User
    loading?: boolean
}

export const Header = ({ className, disableSigns, isLogged, user, loading }: HeaderProps) => {
    const media = useMedia()
    const navigate = useNavigate()

    // noinspection TypeScriptValidateTypes
    return (
        <HeaderStyled className={className}>
            <Href to="/" className="logo">
                <svg viewBox="0 0 218 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.6488 0C15.6488 0 11.4083 10.374 29.5822 17.3422C39.4574 21.1274 47.0422 30.8294 37.986 45.8165C37.236 39.1175 34.02 24.3471 20.1916 20.9766C20.1916 20.9766 33.0623 25.7893 34.1992 47.5745C27.5857 48.503 12.0751 49.127 7.47004 35.6668C1.38908 17.8829 15.6488 0 15.6488 0Z"
                        fill="#055340"/>
                    <path
                        d="M34.1932 47.4838C20.1533 41.8806 9.93753 28.7542 8.5276 13.0845C11.3978 5.3422 15.6488 0 15.6488 0C15.6488 0 11.4083 10.374 29.5822 17.3422C39.4574 21.1274 47.0422 30.8294 37.986 45.8165C37.236 39.1175 34.02 24.3471 20.1916 20.9766C20.1923 20.9767 33.0248 25.7774 34.1932 47.4838Z"
                        fill="#05664E"/>
                    <path
                        d="M39.387 17.688C38.6621 17.688 38.0745 17.1004 38.0745 16.3755C38.0745 15.6506 38.6621 15.0629 39.387 15.0629C40.1119 15.0629 40.6995 15.6506 40.6995 16.3755C40.6995 17.1004 40.1119 17.688 39.387 17.688Z"
                        fill="#055340"/>
                    <path
                        d="M35.262 16.0004C34.7442 16.0004 34.3245 15.5807 34.3245 15.0629C34.3245 14.5452 34.7442 14.1254 35.262 14.1254C35.7797 14.1254 36.1995 14.5452 36.1995 15.0629C36.1995 15.5807 35.7797 16.0004 35.262 16.0004Z"
                        fill="#05664E"/>
                    <path
                        d="M36.1057 8.50046C34.8113 8.50046 33.762 7.45115 33.762 6.15675C33.762 4.86236 34.8113 3.81305 36.1057 3.81305C37.4001 3.81305 38.4494 4.86236 38.4494 6.15675C38.4494 7.45115 37.4001 8.50046 36.1057 8.50046Z"
                        fill="#05664E"/>
                    <path
                        d="M28.887 12.2505C28.4728 12.2505 28.137 11.9147 28.137 11.5005C28.137 11.0863 28.4728 10.7505 28.887 10.7505C29.3012 10.7505 29.637 11.0863 29.637 11.5005C29.637 11.9147 29.3012 12.2505 28.887 12.2505Z"
                        fill="#05664E"/>
                    <path
                        d="M22.6051 9.43794C21.4142 9.43794 20.4488 8.47257 20.4488 7.28171C20.4488 6.09086 21.4142 5.12549 22.6051 5.12549C23.7959 5.12549 24.7613 6.09086 24.7613 7.28171C24.7613 8.47257 23.7959 9.43794 22.6051 9.43794Z"
                        fill="#05664E"/>
                    <path
                        d="M66.24 14.6L72.45 29.72L78.69 14.6H81.66V35H79.11V26.27L79.44 18.41L73.59 32.6H71.13L65.4 18.35L65.73 26.27V35H63.18V14.6H66.24ZM94.383 36.5C93.743 38.3 92.953 39.61 92.013 40.43C91.093 41.27 89.803 41.69 88.143 41.69V39.26C88.823 39.24 89.403 39.15 89.883 38.99C90.383 38.83 90.823 38.5 91.203 38C91.603 37.52 91.983 36.8 92.343 35.84L92.643 35.09L87.303 20.15H89.823L92.313 27.38L93.843 32L95.313 27.38L97.743 20.15H100.173L94.383 36.5ZM103.013 17.06V14.6H117.503V17.06H111.563V35H108.953V17.06H103.013ZM129.467 22.16C128.907 22.16 128.247 22.3 127.487 22.58C126.747 22.86 125.847 23.43 124.787 24.29V35H122.327V12.8H124.787V22.13C125.827 21.25 126.767 20.65 127.607 20.33C128.447 20.01 129.267 19.85 130.067 19.85C131.447 19.85 132.497 20.29 133.217 21.17C133.957 22.03 134.327 23.26 134.327 24.86V35H131.867V25.22C131.867 23.18 131.067 22.16 129.467 22.16ZM152.036 34.13C151.136 34.57 150.236 34.87 149.336 35.03C148.436 35.21 147.606 35.3 146.846 35.3C144.706 35.3 143.106 34.69 142.046 33.47C141.006 32.25 140.486 30.58 140.486 28.46V26.66C140.486 24.6 141.006 22.95 142.046 21.71C143.106 20.47 144.596 19.85 146.516 19.85C147.536 19.85 148.466 20.06 149.306 20.48C150.166 20.88 150.846 21.5 151.346 22.34C151.866 23.16 152.126 24.22 152.126 25.52C152.126 26.36 152.006 27.32 151.766 28.4H142.916V28.46C142.916 29.98 143.226 31.13 143.846 31.91C144.486 32.69 145.506 33.08 146.906 33.08C147.546 33.08 148.246 33 149.006 32.84C149.786 32.68 150.546 32.43 151.286 32.09L152.036 34.13ZM146.516 22.01C145.356 22.01 144.476 22.39 143.876 23.15C143.296 23.89 142.976 24.94 142.916 26.3H149.636C149.696 25.94 149.726 25.6 149.726 25.28C149.726 24.16 149.406 23.34 148.766 22.82C148.146 22.28 147.396 22.01 146.516 22.01ZM165.983 22.31C165.083 22.31 164.203 22.47 163.343 22.79C162.503 23.11 161.603 23.72 160.643 24.62V35H158.183V20.15H160.523V22.55C161.543 21.55 162.473 20.85 163.313 20.45C164.173 20.05 165.063 19.85 165.983 19.85V22.31ZM181.859 35.15C180.939 35.15 180.199 34.94 179.639 34.52C179.099 34.1 178.719 33.58 178.499 32.96C177.519 33.82 176.629 34.43 175.829 34.79C175.029 35.13 174.229 35.3 173.429 35.3C172.129 35.3 171.169 34.88 170.549 34.04C169.929 33.2 169.619 32.17 169.619 30.95C169.619 30.13 169.769 29.4 170.069 28.76C170.369 28.12 170.879 27.62 171.599 27.26C172.319 26.88 173.289 26.69 174.509 26.69C175.049 26.69 175.639 26.73 176.279 26.81C176.919 26.87 177.569 26.95 178.229 27.05V25.04C178.229 23.92 177.979 23.16 177.479 22.76C176.999 22.34 176.289 22.13 175.349 22.13C174.069 22.13 172.639 22.48 171.059 23.18L170.279 21.14C171.199 20.72 172.079 20.4 172.919 20.18C173.759 19.96 174.609 19.85 175.469 19.85C176.869 19.85 177.939 20.08 178.679 20.54C179.419 21 179.929 21.61 180.209 22.37C180.489 23.13 180.629 23.96 180.629 24.86V31.28C180.629 31.74 180.719 32.13 180.899 32.45C181.079 32.75 181.439 32.9 181.979 32.9H182.309V35.15H181.859ZM172.049 30.92C172.049 31.6 172.209 32.15 172.529 32.57C172.849 32.99 173.309 33.2 173.909 33.2C174.429 33.2 175.029 33.05 175.709 32.75C176.389 32.43 177.229 31.8 178.229 30.86V28.97C176.869 28.75 175.669 28.64 174.629 28.64C173.709 28.64 173.049 28.83 172.649 29.21C172.249 29.59 172.049 30.16 172.049 30.92ZM193.534 35.3C192.414 35.3 191.254 35.07 190.054 34.61V41.39H187.594V20.15H189.934V22.25C190.854 21.37 191.694 20.75 192.454 20.39C193.214 20.03 193.994 19.85 194.794 19.85C196.374 19.85 197.584 20.45 198.424 21.65C199.284 22.85 199.714 24.54 199.714 26.72V28.46C199.714 30.54 199.184 32.2 198.124 33.44C197.084 34.68 195.554 35.3 193.534 35.3ZM194.194 22.16C193.614 22.16 193.014 22.31 192.394 22.61C191.774 22.91 190.994 23.52 190.054 24.44V32.36C190.634 32.62 191.194 32.81 191.734 32.93C192.274 33.03 192.804 33.08 193.324 33.08C194.684 33.08 195.664 32.67 196.264 31.85C196.864 31.01 197.164 29.88 197.164 28.46V26.72C197.164 25.16 196.914 24.01 196.414 23.27C195.934 22.53 195.194 22.16 194.194 22.16ZM210.84 36.5C210.2 38.3 209.41 39.61 208.47 40.43C207.55 41.27 206.26 41.69 204.6 41.69V39.26C205.28 39.24 205.86 39.15 206.34 38.99C206.84 38.83 207.28 38.5 207.66 38C208.06 37.52 208.44 36.8 208.8 35.84L209.1 35.09L203.76 20.15H206.28L208.77 27.38L210.3 32L211.77 27.38L214.2 20.15H216.63L210.84 36.5Z"
                        fill="black"/>
                </svg>
            </Href>

            {
                disableSigns ?
                    null :
                    media.isLaptop ?
                        (
                            !isLogged ?
                                <Signs>
                                    <SignUpButton to="/questionnaire">Регистрация</SignUpButton>
                                    <Button to="/sign-in">Вход</Button>
                                </Signs> :
                                loading ? <span>Зарежда се...</span> :
                                    <Profile>
                                        <span>{user?.nickname}</span>
                                        <img src={ArrowDownSvg} alt="Expand"/>
                                    </Profile>
                        ) :
                        <Signs>
                            <img src={Burger} alt="Menu" onClick={()=>navigate("/sign-in")}></img>
                        </Signs>
            }
        </HeaderStyled>
    )
}