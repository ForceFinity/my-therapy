import { FormWrapper, QuizInput } from "../index";
import { FormInput } from "@components/atoms/form";
import styled from "styled-components";
import { Text } from "@components/atoms/texts";


const FormSubtitle = styled(Text)`
    width: 70%;
    text-align: center;
    margin: 2vh 0;
    
    .bold {
        font-weight: 600;
    }
`

export interface BasicInfoData {
    email: string
    emailOTP: string
}

interface BasicInfoFormProps extends BasicInfoData {
    updateFields: (fields: Partial<BasicInfoData>) => void
}

export const ConfirmEmail = ({email, emailOTP, updateFields}: BasicInfoFormProps) => {
    return (
        <FormWrapper title="Потвърди имейла">
            <FormSubtitle>
                За да потвърдите имейла си, въведете кода, пратен на <Text className="bold">{email}</Text>
            </FormSubtitle>
            <FormInput>
                <Text>Код</Text>
                <QuizInput
                    type="text"
                    name="password"
                    value={emailOTP}
                    placeholder="123456"
                    required
                    onChange={(e) => updateFields({emailOTP: e.target.value})}
                />
            </FormInput>
        </FormWrapper>
    )
}