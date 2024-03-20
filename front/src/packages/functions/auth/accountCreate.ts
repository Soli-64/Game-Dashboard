import { api } from "../../../services/api.service"
import { UserContextValue, UserSchema, UserStatus } from "../../types"

type SubmitContent = {
    email: string
    password: string
}


export const createAccount = async (data: SubmitContent, User: UserContextValue) => {
    
    const response = await api.createAccountRequest(data.email, data.password)

    if (response.success) {
        
        const dbUser = response.user as UserSchema

        User.setId(dbUser.id)
        User.setEmail(dbUser.email as string)
        
        User.setStatus(UserStatus.WaitingEmailValidation)

    } else {
    
        console.log('Erreur retour serveur création de compte:', response.errors)

    }

}
