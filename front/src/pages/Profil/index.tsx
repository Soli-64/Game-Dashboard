import { useContext } from "react";
import { UserContext } from "../../hooks/useUser";


export default function ProfilPage() {

    const User = useContext(UserContext)


    return (
        <div>

            <p>Email: { User.email }</p>

        </div>
    )


}