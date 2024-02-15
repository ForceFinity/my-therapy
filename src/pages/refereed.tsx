import { Title, Wrapper } from "../elements";
import React, { useEffect, useState } from 'react';
import useSWR from "swr";
import useRequest from "../api/http";
import { useAuth } from "../api/account";

interface TableColumn {
    key: string;
    label: string;
}

interface TableProps {
    headers: TableColumn[];
    data?: any[];
}

const RefereedTable: React.FC<TableProps> = ({ headers, data }) => {
    console.log(data)
    return (
        <table>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data && data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {headers.map((header, cellIndex) => (
                        <td key={cellIndex}>{row[header.key]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
            <style>{`
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          border-bottom: none;
        }
      `}</style>
        </table>
    );
};

type RefereedTableProps = {
    refereed_email: string
    is_questionnaire_complete: boolean
}

export const Refereed = () => {
    const [user,,] = useAuth()

    const headers: TableColumn[] = [
        { key: 'email', label: 'Имейл' },
        { key: 'is_questionnaire_complete', label: 'Статут' },
    ];

    const { data } = useRequest<RefereedTableProps[]>({
        url: "http://localhost:8000/api/misc/getRefereed?by_user_id=" + (user ? user.id : "")
    })

    return (
        <Wrapper>
            <Title>Поканени потребители</Title>
            <RefereedTable headers={headers} data={data} />
        </Wrapper>
    )
}