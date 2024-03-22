
export type GithubApiCommiter = {

    name: string
    email: string
    commitDate: string
    
}

export type GithubApiCommit = {

    message: string
    commiter: GithubApiCommiter
    url: string

}
