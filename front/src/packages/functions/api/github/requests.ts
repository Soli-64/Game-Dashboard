import { api } from "../../../../services/api.service";



export async function getRepo(repo_name: string, user_gitid: string) {

    console.log(await api.getRepo(repo_name, user_gitid))

}