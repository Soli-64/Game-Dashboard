import { createContext, useState } from "react";
import { ProjectSchema, UserContextProviderProps, UserContextValue, UserDbContentSchema, UserStatus } from "../packages/types";

export const UserContext = createContext<UserContextValue>(
    {
        name: 'default-name', 
        setName: () => {},
        email: 'test@email.com',
        setEmail: () => {},
        id: 0, 
        setId: () => {},
        isAdmin: false,
        setIsAdmin: () => {},
        status: UserStatus.Deconnected,
        setStatus: () => {},
        projects: [],
        setProjects: () => {},
        dbContent: {},
        setDbContent: () => {}
    }
)

export function UserContextProvider ({ children }: UserContextProviderProps) {
    const [name, setName] = useState<string>('guess') 
    const [email, setEmail] = useState<string>('guess') 
    const [id, setId] = useState(0) 
    const [isAdmin, setIsAdmin] = useState(false) 
    const [status, setStatus] = useState(UserStatus.Deconnected)
    const [projects, setProjects] = useState<ProjectSchema[]>([])
    const [dbContent, setDbContent] = useState<UserDbContentSchema>({})

    return (
    
        <UserContext.Provider value={{
            name,
            setName: (arg: string) => setName(arg),
            email,
            setEmail: (arg: string) => setEmail(arg),
            id,
            setId: (arg: number) => setId(arg),
            isAdmin,
            setIsAdmin: (arg: boolean) => setIsAdmin(arg),
            status,
            setStatus: (arg: UserStatus) => setStatus(arg),
            projects,
            setProjects: (arg: ProjectSchema[]) => setProjects(arg),
            dbContent,
            setDbContent: (arg: UserDbContentSchema) => setDbContent(arg)
        }}>

            { children }

        </UserContext.Provider>
    
    )

}
