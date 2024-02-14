import { FormWrapper, QuizInput } from "../index";
import { FormInput } from "../../../elements/form";
import styled from "styled-components";


const FormSubtitle = styled.span`
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
                За да потвърдите имейла си, въведете кода, пратен на <span className="bold">{email}</span>
            </FormSubtitle>
            <FormInput>
                <span>Код</span>
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