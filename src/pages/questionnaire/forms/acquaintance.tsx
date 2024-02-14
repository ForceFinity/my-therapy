import {FormInput } from "../../../elements/form";

import "../datepicker/datepicker.css"
import { FormWrapper, QuizFormInput, QuizInput } from "../index";
import { CustomDatePicker } from "../datepicker/datepicker";

export interface AcquaintanceData {
    nickname: string,
    birthDate: Date,
}

interface AcquaintanceFormProps extends AcquaintanceData {
    updateFields: (fields: Partial<AcquaintanceData>) => void
}

export const Acquaintance = ({nickname, birthDate, updateFields}: AcquaintanceFormProps) => {

    return (
        <FormWrapper title="Нека се запознаем">
            <FormInput>
                <span>Име (или псевдоним)</span>
                <QuizInput
                    type="text"
                    name="name"
                    value={nickname}
                    placeholder="Джон"
                    required
                    onChange={(e) => updateFields({nickname: e.target.value})}
                />
            </FormInput>
            <FormInput>
                <span>Дата на раждане</span>
                <CustomDatePicker birthDate={birthDate} updateFields={updateFields} />
            </FormInput>
        </FormWrapper>
    )
}