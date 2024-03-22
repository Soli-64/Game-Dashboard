import { api } from "../../../services/api.service";
import { ProjectSchema, UserContextValue } from "../../types";

export async function getProjects(User: UserContextValue, loadSet: (arg: boolean) => void) {

    if (User.id === 0) {
        loadSet(true)
        return
    }

    loadSet(true)

    const apiProjectResponse = await api.getProjects(User)

    if (apiProjectResponse.success) {
        User.setProjects(
            apiProjectResponse.data as ProjectSchema[]
        )
    }

    loadSet(false)

}
