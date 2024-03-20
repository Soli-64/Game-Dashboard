import { UserSchema, AuthError } from ".."


export type CreateAccountResponse = {
    success: boolean,
    status: number,
    errors?: AuthError,
    user?: UserSchema
}

export type CreateAccountResponseData = {
    success: boolean
    user?: UserSchema
    errors?: AuthError
}

export type ResponseData = {
    success: boolean
    user?: UserSchema
    errors?: AuthError
}

export type LoginResponse = {
    success: boolean,
    status: number,
    errors?: AuthError,
    user?: UserSchema
}

export type LogoutResponse = {
    success: boolean,
    status: number,
    errors?: AuthError
}
