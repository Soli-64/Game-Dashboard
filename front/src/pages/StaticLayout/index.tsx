import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react"
import { UserContext } from "../../hooks/useUser"
import { UserSchema, UserStatus } from "../../packages/types";
import { CreateAccountForm, LoginForm } from "../../components";
import { Toaster } from 'sonner'
import { VerifyEmailForm } from "../../components/forms/VerifyEmailForm";
import { getInStorage } from "../../packages/functions/storage.functions";
import style from './index.module.scss'
// import { loginRequest } from "../../scripts/api/auth.functions";


export default function StaticLayout() {

    const User = useContext(UserContext)

    useEffect(() => {

        async function fetchData(){

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

        fetchData()

    })

    return (
      <>
        <header className="flex bg-base-100 fixed top-0 left-0 right-0 text-white font-bold h-18">
            
            <p className="flex-none m-5 w-1/5 text-center ">
                <Link to='/'>
                    Dashboard
                </Link>
            </p>
            
            <nav className="flex-1 pl-5 m-5 w-4/5 flex">
                
                <Link className="flex-1 text-center" to="/projects">
                    Mes Projets
                </Link>

                <Link className="flex-1 text-center" to="/profil">
                    Profil
                </Link>

            </nav>

        </header>

        {

            User.status === UserStatus.Deconnected &&

                <div className={style.expand}> {/*  */}

                    <div className="flex justify-around items-center">

                        <CreateAccountForm />

                        <h1 className="text-4xl">ou</h1>

                        <LoginForm />
                    
                    </div>

                    
                
                </div>
        
        }

        {
            User.status === UserStatus.Loading &&

            <div className={style.expand}> {/*  */}

                <h1 className="text-5xl font-bold text-center">Chargement ...</h1>

                <div className="w-1/1 h-20 mt-28 flex justify-center">
                    <div className="absolute animate-spin block w-12 h-12 rounded-full border-400-grey border-e-black border-8"></div>
                </div>

            </div>

            
        }

        {
            User.status === UserStatus.WaitingEmailValidation &&

            <div className={style.expand}> {/*  */}

                <VerifyEmailForm />
            
            </div>

        }

        <Toaster />
        <Outlet />
      </>
    );

}
