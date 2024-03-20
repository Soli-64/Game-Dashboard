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
        // formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => verifyEmail(data, User)

    return (
        <div className="w-full h-full justify-around flex">

            <form className="card w-96 h-4/5 glass" onSubmit={handleSubmit(onSubmit)}>

                <div className="card-body">
                    <h1 className="card-title text-5xl text-black font-bold ">Entrez le code</h1>
                    
                    <p className="mt-10 text-black text-lg text-center" > qui vous a été envoyé à l'adresse: { User.email }</p>
                    
                    <label className="input input-bordered h-10 text-lg flex items-center mx-5">
                        <input className="grow" placeholder="ex: 123456" {...register('code', { required: true })} />
                    </label>
                    {/* {errors.code && <span>This field is required</span>}                 */}
                    <button onClick={() => {}} className="btn btn-primary btn-outline mx-20"> Réenvoyer un code </button>
                    <input className="btn btn-primary" type="submit" value="Vérifier mon code" />
                </div>
                
            </form>

        </div>
    )

}
