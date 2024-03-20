import { useContext } from "react"
import { UserContext } from "../../hooks/useUser"
import { useForm, SubmitHandler } from 'react-hook-form';
import { verifyEmail } from '../../packages/functions/auth/verifyEmail';

type Inputs = {
    code: string
}


export function VerifyEmailForm() {

    const User = useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => verifyEmail(data, User)


    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-6xl font-bold ">Entrez le code</h1>
            <p className="my-5" > qui vous a été envoyé à l'adresse: { User.email }</p>
            <div className="inline">
                <input placeholder="email" {...register('code', { required: true })} />
                {errors.code && <span>This field is required</span>}                <button onClick={() => {}} className="ml-5 bg-custom-blue text-white p-1 rounded-md"> Réenvoyer un code </button>
            </div>
            <input type="submit" value="Vérifier mon code" />
        </form>
    )

}
