import DatePicker from "react-datepicker";
import { forwardRef, ReactNode } from "react";
import CalendarSvg from "../../../assets/calendar.svg"
import { DateInput } from "../../../elements/form";
import styled from "styled-components";
import { AcquaintanceData } from "../forms/acquaintance";

interface DateInputRefProps {
    children?: ReactNode;
    value?: any
    onClick?: any
}

interface CustomDatePickerProps {
    birthDate: Date,
    updateFields: (fields: Partial<AcquaintanceData>) => void
}

const CustomDateInput = styled(DateInput).attrs({
    className: "border"
})`
    display: flex;
    align-items: center;
    width: 99%;
    height: 2.8rem;
    
    img {
        width: 1.7rem;
        fill: var(--accent);
        margin-left: 1rem;
    }
    
    span {
        margin-top: .2rem;
        font-size: 1.15rem ;
    }
`

export const CustomDatePicker = ({ birthDate, updateFields }: CustomDatePickerProps) => {
    const CustomDateInputRef = forwardRef<HTMLButtonElement, DateInputRefProps>((props, ref) => (
        <CustomDateInput type="button" onClick={props.onClick} ref={ref}>
            <img src={ CalendarSvg } alt="Pick a date"/>
            <span>{props.value}</span>
        </CustomDateInput>
    ))

    const range = (start: number, end: number) => Array.from({length: (end - start)}, (v, k) => k + start);

    const currYear = (new Date()).getFullYear()
    const years = range(1970, currYear + 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <DatePicker
            customInput={<CustomDateInputRef />}
            renderCustomHeader={({
                                     date,
                                     changeYear,
                                     changeMonth,
                                     decreaseMonth,
                                     increaseMonth,
                                     prevMonthButtonDisabled,
                                     nextMonthButtonDisabled,
                                 }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear((value as unknown) as number)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={months[date.getMonth()]}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
            selected={birthDate}
            onChange={(date) => {
                updateFields({birthDate: date as Date})
            }}
        />
    )
}