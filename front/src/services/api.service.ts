import axios, { AxiosInstance } from "axios"
import { AuthError, ResponseData, UserSchema } from "../packages/types"


class ApiService {

    public api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: import.meta.env.VITE_DEV_API_URL
        })

    }

    async createAccountRequest(email: string, password: string) {

        const response = await this.api.post('/signup', { email, password })

        const responseData: ResponseData = {
            success: response.data.success
        }

        if (response.data.success) {
            responseData.user = response.data.user as UserSchema
        } else {
            responseData.errors = response.data.errors as AuthError
        }

        return responseData

    }

    async verifyEmailRequest(id: number, submitCode: string) {
        const response = await this.api.post('/validate-email', { id, submitCode })
    
        const responseData: ResponseData = {
            success: response.data.success
        }

        if (response.data.success) {
            responseData.user = response.data.user as UserSchema
        } else {
            responseData.errors = response.data.errors as AuthError
        }

        return responseData
    }

    async loginRequest(email: string, password: string) {

        const response = await this.api.post('/login', { email, password })
        
        const responseData: ResponseData = {
            success: response.data.success
        }

        if (response.data.success) {
            responseData.user = response.data.user as UserSchema
        } else {
            responseData.errors = response.data.errors as AuthError
        }

        return responseData
    }

    async logoutRequest() {
        const response = await this.api.post('/logout', {})

        const responseData: ResponseData = {
            success: response.data.success
        }

        if (!response.data.success) {
            responseData.errors = response.data.errors as AuthError
        }

        return responseData
    }

}


export const api = new ApiService()
