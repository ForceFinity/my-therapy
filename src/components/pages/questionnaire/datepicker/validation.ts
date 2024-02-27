const emailRegex = new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)
const passwordRegex = new RegExp(/^(?=.*[0-9])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_{|}~]).{8,}$/)

export const validateForm = <T extends object>(data: T): string | undefined => {
    if("email" in data) {
        if (!emailRegex.test((data.email as string).toLowerCase())) {
            return "Неподходящ имейл"
        }
    }
    if("password" in data) {
        if(!passwordRegex.test(data.password as string)) {
            return "Паролата трябва да е най-малко 8 символа, да съдържа поне една заглавна и малка буква, " +
                "поне един специален символ и число"
        }
    }

    return
}