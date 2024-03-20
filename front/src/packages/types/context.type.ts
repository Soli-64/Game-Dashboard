import { ReactNode } from "react"
import { UserDbContentSchema } from "."

export enum UserStatus {
    Loading = 'loading',
    Connected = 'connected',
    Deconnected = 'deconnected',
    WaitingEmailValidation = 'waitig-for-email'
}

export type UserContextValue = {
    name: string,
    setName: (arg: string) => void,
    email: string,
    setEmail: (arg: string) => void,
    id: number,
    setId: (arg: number) => void,
    isAdmin: boolean,
    setIsAdmin: (arg: boolean) => void
    status: UserStatus
    setStatus: (arg: UserStatus) => void
    dbContent: UserDbContentSchema
    setDbContent: (arg: UserDbContentSchema) => void
}

export type UserContextProviderProps = {
    children: ReactNode
}
