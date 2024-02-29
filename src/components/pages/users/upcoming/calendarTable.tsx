import styled, { css } from "styled-components";
import { TableStyled } from "@components/atoms/table";
import { Text } from "@components/atoms/texts";
import dayjs from "dayjs";
import { useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import { Weekdays } from "@components/pages/users/upcoming/upcoming";

const CalendarTableStyled = styled(TableStyled)`
    border-radius: 0 .6rem .6rem 0;
    
    tr {
        height: 3.5rem;
    }

    thead > tr {
        height: 1rem;
    }
    
    th {
        width: 4.2vw;
        
        span {
            font-size: .8rem;
        }
    }
    
    th, td {
        border: .05rem #B9B9B9 solid;
        height: 100%;
    }
`

const CalendarTableDay = styled(Text)<{ isFromAnotherMonth: boolean, isChosen: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => props.isFromAnotherMonth && css`color: #B9B9B9;`}

    width: 70%;
    aspect-ratio: 1 / 1;
    margin: auto;

    border-radius: .5rem;
    ${props => !props.isFromAnotherMonth && css`
        &:hover {
            cursor: pointer;
            background-color: rgba(5, 130, 112, .5);
        }`
    }
    
    ${props => props.isChosen && css`background-color: rgba(5, 130, 112, .5);`}`

interface CalendarTableProps {
    data: Weekdays[],
    chosen: string,
    setChosen: any
}

export const CalendarTable = ({data, chosen, setChosen}: CalendarTableProps) => {
    const columnHelper = createColumnHelper<Weekdays>()
    const columns = [
        ...dayjs.weekdaysShort().map(value => (
            columnHelper.accessor(row => row[value as keyof Weekdays], {
                id: value,
                header: value[0].toUpperCase() + value.slice(1),
                cell: info => {
                    const value = info.getValue()
                    const isFromAnotherMonth = (
                        info.row.index == 0 && parseInt(value) > 7
                        || info.row.index == data.length - 1 && parseInt(value) < 7
                    )
                    return <CalendarTableDay
                        isFromAnotherMonth={isFromAnotherMonth}
                        isChosen={value == chosen && !isFromAnotherMonth}
                        onClick={() => setChosen(value)}
                    >
                        {value}
                    </CalendarTableDay>
                },
                footer: info => info.column.id,
            })
        ))
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <CalendarTableStyled>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder ?
                                null :
                                <Text>{
                                    flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )
                                }</Text>
                            }
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </CalendarTableStyled>
    )
}