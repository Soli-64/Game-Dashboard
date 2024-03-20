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
        formState: { errors },
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  items-center justify-center">
            
            <h1 className="text-4xl font-bold mb-8">Se connecter</h1>

            <div className="flex flex-col">
                <input placeholder="email" {...register('email', { required: true })} />
                {errors.email && <span>This field is required</span>}
                <hr className="h-6" />
                <input type="password" placeholder="password" {...register('password', { required: true })} />
                {errors.password && <span>This field is required</span>}
            </div>

            <div className="flex flex-row items-center justify-center w-60 h-8 my-3">
                <input type="checkbox" {...register('remember')} />
                <label className="h-6">Se souvenir de moi</label>
            </div>

            <input type="submit" />

        </form>
    )

}
