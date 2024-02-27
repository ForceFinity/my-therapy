import styled from "styled-components";
import BannerReferralSvg from "@assets/banner-referral.svg"
import { useNavigate } from "react-router-dom";

export const Banner = styled.div`
`

export const BannerReferral = ({className}: {className?: string}) => {
    const navigate = useNavigate()
    // noinspection TypeScriptValidateTypes
    return (
        <Banner className={className} onClick={()=>navigate("/articles/referral")}>
            <img src={ BannerReferralSvg } alt="Участвай в томболата!"/>
        </Banner>
    )
}