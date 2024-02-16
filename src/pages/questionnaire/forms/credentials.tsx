import { FormWrapper, QuizInput } from "../index";
import { FormInput } from "../../../elements/form";

export interface BasicInfoData {
    email: string,
    password: string,
}

interface BasicInfoFormProps extends BasicInfoData {
    updateFields: (fields: Partial<BasicInfoData>) => void
}

export const Credentials = ({email, password, updateFields}: BasicInfoFormProps) => {
    return (
        <FormWrapper title="Основна информация">
            <FormInput>
                <span>Имейл</span>
                <QuizInput
                    type="text"
                    name="email"
                    value={email}
                    placeholder="example@mail.com"
                    required
                    onChange={(e) => updateFields({email: e.target.value.toLowerCase()})}
                />
            </FormInput>
            <FormInput>
                <span>Парола</span>
                <QuizInput
                    type="password"
                    name="password"
                    value={password}
                    placeholder="qwerty1234"
                    required
                    onChange={(e) => updateFields({password: e.target.value})}
                />
            </FormInput>
        </FormWrapper>
    )
}