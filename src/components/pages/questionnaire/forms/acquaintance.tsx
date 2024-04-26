import {FormInput } from "@components/atoms/form";

import "../datepicker/datepicker.css"
import { FormWrapper, QuizInput } from "../index";
import { CustomDatePicker } from "../datepicker/datepicker";
import { Link } from "react-router-dom";
import { useMedia } from "@core/utils/mediaQueries";
import { BaseText } from "@components/atoms/texts";

import googleSvg from "@assets/google.svg"
import { GoogleLogin, googleLogout, TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { GoogleSignIn } from "@components/atoms/trueButton";
import { LoginIcon } from "@components/atoms/primitives";
import { useState } from "react";

export interface AcquaintanceData {
    nickname: string,
    birth_date: Date,
}

interface AcquaintanceFormProps extends AcquaintanceData {
    updateFields: (fields: Partial<AcquaintanceData>) => void
}

export const Acquaintance = (
    {nickname, birth_date, updateFields, setUserGoogleToken}: AcquaintanceFormProps & {setUserGoogleToken: (x:any)=>void}
) => {
    const media = useMedia()

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUserGoogleToken(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <FormWrapper title="Нека се запознаем">
            <FormInput>
                <BaseText>Име (или псевдоним)</BaseText>
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
                <BaseText>Дата на раждане</BaseText>
                <CustomDatePicker birthDate={birth_date} updateFields={updateFields}/>
            </FormInput>
            <GoogleSignIn $isBordered type="button" onClick={()=>login()}>
                <LoginIcon src={ googleSvg } alt="Google Sign-In" />
                <BaseText>Вход с гугъл</BaseText>
            </GoogleSignIn>
            <BaseText style={{
                fontSize: media.isLaptop ? ".7rem" : ".9rem",
                textAlign: "center",
                width: media.isLaptop ? "60%" : "80%",
                marginBottom: "-3vh",
                marginTop: "1vh"
            }}>
                Създавайки акаунт, вие се съгласявате с нашите
                <Link to="/articles/privacy-policy"> Политика за поверителност </Link> и
                <Link to="/articles/terms-of-service"> Условия за ползване</Link>
            </BaseText>
        </FormWrapper>
    )
}