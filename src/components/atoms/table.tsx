import styled from "styled-components";

export const TableStyled = styled.table`
    border-collapse: collapse;
    border: .1rem hidden #b9b9b9;
    border-radius: .6rem;
    box-shadow: 0 0 0 .04rem #666;
    
    th {
        font-weight: normal;
    }

    tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
    }

    tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
`

