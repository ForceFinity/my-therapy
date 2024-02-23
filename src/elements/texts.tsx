import styled from "styled-components";
import { ReactElement, useEffect, useRef, useState } from "react";
import ChevronSvg from "../assets/chevron.svg"

export const ErrorText = styled.span`
    color: var(--errorColor);
    font-size: .9rem;
    text-align: center;
`

export const Bold = styled.span`
    font-weight: 600;    
`