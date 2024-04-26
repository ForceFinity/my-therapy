export type User = {
    id: number
    email: string
    nickname: string
    birth_date: Date
    account_type: AccountType
    is_confirmed?: boolean
    is_active?: boolean
    token: string
}

export enum AccountType {
    Client = 1,
    Therapist,
    Admin
}

export const TypeToRole: { [key: string]: string } = {
    "1": "Потребител",
    "2": "Терапевт",
    "3": "Администратор"
}

export type GoogleUserResponse = {
    id: string
    email: string
    name: string
    given_name: string
    family_name?: string
    link?: string
    picture: string
    gender?: string
    locale?: string
    verified_email: boolean
}
