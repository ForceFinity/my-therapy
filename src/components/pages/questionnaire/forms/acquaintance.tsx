import {FormInput } from "@components/atoms/form";

import "../datepicker/datepicker.css"
import { FormWrapper, QuizInput } from "../index";
import { CustomDatePicker } from "../datepicker/datepicker";
import { Link } from "react-router-dom";
import { useMedia } from "@core/utils/mediaQueries";
import { Text } from "@components/atoms/texts";

export interface AcquaintanceData {
    nickname: string,
    birth_date: Date,
}

interface AcquaintanceFormProps extends AcquaintanceData {
    updateFields: (fields: Partial<AcquaintanceData>) => void
}

export const Acquaintance = ({nickname, birth_date, updateFields}: AcquaintanceFormProps) => {
    const media = useMedia()

    return (
        <FormWrapper title="Нека се запознаем">
            <FormInput>
                <Text>Име (или псевдоним)</Text>
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
                <Text>Дата на раждане</Text>
                <CustomDatePicker birthDate={birth_date} updateFields={updateFields}/>
            </FormInput>
            <Text style={{
                fontSize: media.isLaptop ? ".7rem" : ".9rem",
                textAlign: "center",
                width: media.isLaptop ? "60%" : "80%",
                marginBottom: "-3vh",
                marginTop: "1vh"
            }}>
                Създавайки акаунт, вие се съгласявате с нашите
                <Link to="/articles/privacy-policy"> Политика за поверителност </Link> и
                <Link to="/articles/terms-of-service"> Условия за ползване</Link>
            </Text>
        </FormWrapper>
    )
}