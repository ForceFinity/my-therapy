import styled, { css } from "styled-components";
import { TableStyled } from "@components/atoms/table";
import { BaseText } from "@components/atoms/texts";
import dayjs from "dayjs";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import { Weekdays } from "@components/pages/users/upcoming/upcoming";
import { useMemo } from "react";

const CalendarTableStyled = styled(TableStyled)`
    border-radius: 0 .6rem .6rem 0;
    box-shadow: 0 0 0 .05rem rgba(5, 130, 112, 1);
    
    tr {
        height: 4.7rem;
    }

    thead > tr {
        height: 1rem;
    }
    
    th {
        width: 5vw;
        
        span {
            font-size: .8rem;
        }
    }
    
    th, td {
        border: .05rem #B9B9B9 solid;
        height: 100%;
    }
`

const CalendarTableDay = styled(BaseText)<{ $isFromAnotherMonth: boolean, $isChosen: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => props.$isFromAnotherMonth && css`color: #B9B9B9;`}

    width: 70%;
    aspect-ratio: 1 / 1;
    margin: auto;

    border-radius: .5rem;
    ${props => !props.$isFromAnotherMonth && css`
        &:hover {
            cursor: pointer;
            background-color: rgba(5, 130, 112, .5);
        }`
    }
    
    ${props => props.$isChosen && css`background-color: rgba(5, 130, 112, .5);`}`

const getMonthDays = (): {result: Weekdays[], daysInMonth: number} => {
    const current = dayjs()
    const monthStart = current.startOf("month")
    const firstDay = monthStart.day()

    let result = []
    let row: Weekdays = {}
    for (let i = 0; i < 6; i++) {
        dayjs.weekdaysShort().forEach((value, index) => {
            row[value] = monthStart
                .date(monthStart.date() + (i * 7 + 6) - (7 - index) - (firstDay - 1))
                .format("D")
        })
        result.push(row)
        row = {}
    }

    return {
        result: result as Weekdays[],
        daysInMonth: current.daysInMonth()
    }
}

interface CalendarTableProps {
    chosen: string,
    setChosen: any
}

export const CalendarTable = ({chosen, setChosen}: CalendarTableProps) => {
    const data = useMemo(getMonthDays, [])

    const columnHelper = createColumnHelper<Weekdays>()
    const columns = [
        ...dayjs.weekdaysShort().map(value => (
            columnHelper.accessor(row => row[value as keyof Weekdays], {
                id: value,
                header: value[0].toUpperCase() + value.slice(1),
                cell: info => {
                    const value = info.getValue()
                    const weekNumber = info.row.index
                    const currentDay = parseInt(value)

                    const isFromAnotherMonth = (
                        (weekNumber == 0 && currentDay > 7) ||
                        (weekNumber == 4 && currentDay < data.daysInMonth - 7) ||
                        (weekNumber != 0 && weekNumber != 4 && ((weekNumber * 7) + currentDay % 7) >= data.daysInMonth)
                    )
                    return <CalendarTableDay
                        $isFromAnotherMonth={isFromAnotherMonth}
                        $isChosen={value === chosen && !isFromAnotherMonth}
                        onClick={!isFromAnotherMonth ? () => setChosen(value) : undefined}
                    >
                        {value}
                    </CalendarTableDay>
                },
                footer: info => info.column.id,
            })
        ))
    ]

    const table = useReactTable({
        data: data.result,
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
                                <BaseText>{
                                    flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )
                                }</BaseText>
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