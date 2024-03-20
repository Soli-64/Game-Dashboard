import { toast } from "sonner"
import { UserContextValue, UserSchema, UserStatus } from "../../types"
import { setInStorage } from "../storage.functions"
import { api } from "../../../services/api.service"



type SubmitContent = {
    code: string
}

export const verifyEmail = async (data: SubmitContent, User: UserContextValue) => {
        
    const submitCode = data.code

    if (submitCode.length === 6) {

        const response = await api.verifyEmailRequest(User.id, submitCode)

        if (response.success) {

            const user = response.user as UserSchema

            User.setStatus(UserStatus.Connected)

            User.setEmail(user.email as string)
            User.setIsAdmin(user.isAdmin as boolean)

            setInStorage('user', {
                email: User.email,
                id: User.id,
                isAdmin: User.isAdmin
            })

            toast(`Connecté en tant que ${User.email}`)
        
        } else {
            toast('Erreur lors de la connexion')
        }

    } else {
        toast('Erreur: le code doit faire 6 caractères')
        console.log('La longueur du code n\'est pas la bonne')
    }

} 