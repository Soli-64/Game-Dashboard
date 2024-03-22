import { GithubApiUser } from "./git_user.type"

export type GithubApiRepo = {

    owner: GithubApiUser
    creationDate: string
    id: number
    name: string
    private: boolean
    defaultBranch: string

}