import { toast } from "sonner"
import { setInStorage } from "../storage.functions"
import { UserContextValue, UserSchema, UserStatus } from "../../types"
import { api } from "../../../services/api.service"


type SubmitContent = {
    email: string,
    password: string,
    remember: boolean
}


export async function sendLoginRequest(data: SubmitContent, User: UserContextValue) {

    const response = await api.loginRequest(data.email, data.password)

        if (response.success) {
            
            const dbUser = response.user as UserSchema

            console.log(dbUser)

            User.setId(dbUser.id)
            User.setEmail(dbUser.email as string)
            
            User.setStatus(UserStatus.Connected)

            if (data.remember) {
                setInStorage('user', {
                    email: dbUser.email,
                    id: dbUser.id,
                    isAdmin: dbUser.isAdmin
                })
            }

        } else {
        
            toast('Erreur lors de la connexion:', response.errors)

        }

}