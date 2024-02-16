import { Header, Title, Wrapper } from "../elements";
import Cross from "../assets/cross.svg"
import Tick from "../assets/tick.svg"
import React, { useEffect, useState } from 'react';
import { getRefereed, RefereedTableProps, useAuth } from "../api/account";
import { useCookies } from "react-cookie";
import styled from "styled-components";

interface TableColumn {
    key: string;
    label: string;
}

interface TableProps {
    headers: TableColumn[];
    data?: any[];
    loading: boolean
    className?: string
}

const RefereedTable: React.FC<TableProps> = ({ loading, headers, data, className }) => {
    console.log(data)
    return (
        <table className={className}>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}><span>{header.label}</span></th>
                ))}
            </tr>
            </thead>
            <tbody>
            {loading ?
                <span>Loading...</span> :
                data && data.map((row, rowIndex) => {
                // noinspection TypeScriptValidateTypes
                    return <tr key={rowIndex}>
                    {headers.map((header, cellIndex) => (
                        <td key={cellIndex}>{
                            typeof row[header.key] == "boolean" ?
                                <img src={ row[header.key] ? Tick : Cross } alt="Запълнил формата"/> :
                                <span>{row[header.key]}</span>
                        }</td>
                    ))}
                </tr>
            })}
            </tbody>
        </table>
    );
};

const RefereedTableStyled = styled(RefereedTable)`
    margin: auto;
    border-collapse: collapse;
    width: 60%;

    th, td {
        border: solid var(--accent);
        border-width: 0 .1rem 0 0;
        padding: 8px;
        text-align: left;
    }

    td:nth-child(2), th:nth-child(2) {
        border-right-width: 0;
        display: flex;
        justify-content: center;
    }


    tbody > tr:nth-child(1) {
        border: 0 solid var(--accent);
        border-top-width: .1rem;
    }

`

const RefereedWrapper = styled(Wrapper)`
    margin: 0 25vh;
`

const RefereedTitle = styled(Title)`
    font-family: "Inter", sans-serif;
    font-size: 3.5rem;
    width: 100%;
    margin-top: 8vh;
    margin-bottom: 5vh;
    text-align: center;
`

export const Refereed = () => {
    const [user,,] = useAuth()
    const [cookies,] = useCookies()
    const [data, setData] = useState<RefereedTableProps[]>()
    const [loading, setLoading] = useState<boolean>(true)

    const headers: TableColumn[] = [
        { key: 'email', label: 'Имейл' },
        { key: 'is_questionnaire_complete', label: 'Статут' },
    ];

    useEffect(() => {
        getRefereed(cookies["Authorization"])
            .then(resp => {
                if(resp.status[0] !== "4") {
                    if(resp.data === undefined) setLoading(true)
                    else {
                        setLoading(false)
                        setData(resp.data)
                    }
                }
            })
    }, []);

    return (
        <RefereedWrapper>
            <Header isLogged={!!user} user={user} />
            <RefereedTitle>Поканени потребители</RefereedTitle>
            <RefereedTableStyled loading={loading} headers={headers} data={data} />
        </RefereedWrapper>
    )
}