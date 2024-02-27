export type User = {
    id: number
    email: string
    nickname: string
    birth_date: Date
    account_type: AccountType
    is_confirmed?: boolean
    is_active?: boolean
}

export enum AccountType {
    Client = 1,
    Therapist,
    Admin
}
