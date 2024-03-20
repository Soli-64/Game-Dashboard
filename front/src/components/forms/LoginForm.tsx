import { useContext } from "react"
import validator from "validator"
import { validatePassword } from "../../packages/functions/validation.functions"
import { toast } from "sonner"
import { UserContext } from "../../hooks/useUser"
import { useForm, SubmitHandler } from "react-hook-form"
import { sendLoginRequest } from "../../packages/functions/auth/login"

type Inputs = {
    email: string
    password: string
    remember: boolean
}


export function LoginForm() {

    const User = useContext(UserContext)

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data)  => {

        const submitContent = {
            email: data.email,
            password: data.password,
            remember: data.remember
        }

        if (validator.isEmail(data.email)) {

            if (validatePassword(data.password)) {

                sendLoginRequest(submitContent, User)
              
            } else {
                toast('Le mot de passe ne correspond pas au format attendu.')
            }

        } else {
            toast('Veuillez entrer un email valide')
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card bg-white w-80 glass h-full items-center ">
            
            <div className="card-body flex flex-col relative mt-5 pt-10 pb-5">

                <h1 className="card-title text-4xl text-center font-extrabold text-base-100 mb-10">Se connecter</h1>
                    <label className="input input-bordered h-10 text-lg flex items-center">
                        <input className="grow" placeholder="email" {...register('email', { required: true })} />
                    </label>

                    <hr className="my-2" />

                    {/* {errors.email && <span>This field is required</span>} */}

                    <label className="input input-bordered h-10 text-lg flex items-center">
                        <input type="password" placeholder="password" {...register('password', { required: true })} />
                    </label>
                    
                    {/* {errors.password && <span>This field is required</span>} */}

                <label className="label cursor-pointer justify-around mb-5">
                    <input className="checkbox checkbox-primary" type="checkbox" {...register('remember')} />
                    <span className="label-text text-black text-lg font-bold">Se souvenir de moi</span>
                </label>

                <div className="flex mt-auto justify-end">
                    <input value="Se Connecter" className="w-full btn btn-outline btn-primary" type="submit" />
                </div>


            </div>


        </form>
    )

}
