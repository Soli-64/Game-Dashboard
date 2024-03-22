import axios, { AxiosInstance } from "axios"
import { UserContextValue } from "../packages/types"
import { ApiResponse } from "../packages/functions"


class ApiService {

    public api: AxiosInstance

    constructor() {

        this.api = axios.create({
            baseURL: import.meta.env.VITE_DEV_API_URL
        })

    }

    async createAccountRequest(email: string, name: string, password: string) {

        const response = await this.api.post('/signup', { email, password, name })

        return ApiResponse(response.data.success, response.data.user, response.data.errors)

    }

    async verifyEmailRequest(id: number, submitCode: string) {
        const response = await this.api.post('/validate-email', { id, submitCode })
    
        return ApiResponse(response.data.success, response.data.user, response.data.errors)

    }

    async loginRequest(email: string, password: string) {

        const response = await this.api.post('/login', { email, password })

        return ApiResponse(response.data.success, response.data.user, response.data.errors)

    }

    async logoutRequest() {
        const response = await this.api.post('/logout', {})

        return ApiResponse(response.data.success, {}, response.data.errors)
    }

    async getProjects(User: UserContextValue) {

        const response = await this.api.post('/get-projects', { user_id: User.id })

        return ApiResponse(response.data.success, response.data.content, response.data.errors)

    }

    async getRepo(repo_name: string, user_gitid: string) {

        const response = await axios.get(`https://api.github.com/repos/${user_gitid}/${repo_name}`)

        return response

    }

}


export const api = new ApiService()
