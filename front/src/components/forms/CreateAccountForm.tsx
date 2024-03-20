import { useContext } from "react"
import { UserContext } from "../../hooks/useUser"
import validator from 'validator';
import { validatePassword } from "../../packages/functions/validation.functions";
import { toast } from "sonner";
import { createAccount } from "../../packages/functions/auth/accountCreate";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserStatus } from "../../packages/types";

type Inputs = {
    email: string
    password: string
    confirmPassword: string
}


export function CreateAccountForm() {

    const User = useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        User.setStatus(UserStatus.Loading)

        const submitContent = {
            email: data.email,
            password: data.password
        }

        if (validator.isEmail(data.email)) {

            if (validatePassword(data.password)) {

                if (data.password === data.confirmPassword) {
                    
                    createAccount(submitContent, User)

                } else {
                    toast('Les mot de passe ne sont pas les mêmes.')
                }                

            } else {
                toast('Le mot de passe ne correspond pas au format attendu.')
            }

        } else {
            toast('Veuillez entrer un email valide')
        }

    }

    return (
        <>
        
            <form onSubmit={handleSubmit(onSubmit)} className="card bg-white w-72 glass">
                
                <div className="card-body flex flex-col relative mt-5">
                
                    <h1 className="card-title text-4xl text-center font-extrabold text-base-100 mb-5">Créer un compte</h1>

                    <label className="input input-bordered h-10 text-lg flex items-center">
                        <input className="grow" placeholder="email" {...register('email', { required: true })} />
                    </label>
                    {/* {errors.email && <span>This field is required</span>}   */}

                    <hr className="my-2" />
                    
                    <label className="input input-bordered h-10 text-lg flex items-center">
                        <input className="grow" type="password" placeholder="password" {...register('password', { required: true })} />
                    </label>
                    {/* {errors.password && <span>This field is required</span>} */}

                    
                    <label className="input input-bordered h-10 text-lg flex items-center">
                        <input className="grow" type="password" placeholder="password (again)" {...register('confirmPassword', { required: true })} />
                    </label>
                    {/* {errors.confirmPassword && <span>This field is required</span>} */}
                    
                    <input className="btn btn-primary btn-outline" type="submit" />

                </div>

            </form>

        </>
    )

}
