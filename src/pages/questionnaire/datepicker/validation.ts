import getAge from "../getAge";

const emailRegex = new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)
const passwordRegex = new RegExp(/^(?=.*[0-9])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_{|}~]).{8,}$/)

type InvalidField = {
    fieldName: string
    message: string
}

export const validateForm = <T extends object>(data: T): InvalidField | undefined => {
    if("email" in data) {
        if (!emailRegex.test((data.email as string).toLowerCase())) {
            return {
                fieldName: "email",
                message: "Неподходящ имейл"
            }
        }
    }
    if("password" in data) {
        if(!passwordRegex.test(data.password as string)) {
            return {
                fieldName: "password",
                message: "Паролата трябва да е най-малко 8 символа, да съдържа поне една заглавна и малка буква, " +
                    "поне един специален символ и число"
            }
        }
    }
    if("birth_date" in data) {
        if(getAge(data.birth_date as Date) < 16){
            return {
                fieldName: "birth_date",
                message: "Нашата платформа не предлага услугите си за лица под 16 години. Не пренебрегвайте своето " +
                    "състояние, обадете се на 0800-20-202 за спешна емоционална подкрепа."
            }
        }
    }

    return
}