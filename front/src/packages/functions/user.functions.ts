import { UserContextValue, UserSchema, UserStatus } from "../types"
import { getInStorage } from "./storage.functions"


export async function fetchUserConfig(User: UserContextValue) {

    if (getInStorage('user')) {
        const userInStorage = getInStorage('user') as UserSchema
        User.setEmail(userInStorage.email as string)
        User.setId(userInStorage.id)
        User.setIsAdmin(userInStorage.isAdmin as boolean)
        User.setName(userInStorage.name as string)

        // User.setDbContent({
        //     ...User.dbContent
        // })

        User.setStatus(UserStatus.Connected)
    }

}
