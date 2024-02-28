import { FormWrapper, QuizInput } from "../index";
import { FormInput } from "@components/atoms/form";
import { Text } from "@components/atoms/texts";

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
                <Text>Имейл</Text>
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
                <Text>Парола</Text>
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