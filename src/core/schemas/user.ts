export type User = {
    id: number
    email: string
    nickname: string
    birth_date: Date
    account_type: AccountType
    is_confirmed?: boolean
    is_active?: boolean
    token?: string
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
