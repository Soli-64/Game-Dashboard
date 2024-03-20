import { useContext } from "react";
import { UserContext } from "../../hooks/useUser";
import { logout } from "../../packages/functions/auth/logout";
import Avatar from "boring-avatars";
import { createAvatarRandomColors } from "../../packages/functions";

export default function ProfilPage() {
  const User = useContext(UserContext);



  return (
    <div className="h-screen pt-20">

        <div className="ml-40 py-10 w-96 items-center justify-around flex">

            {/* <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div> */}
        
            <Avatar 
            
                size={80}
                name={User.name}
                variant="marble"
                colors={createAvatarRandomColors()}

            />

            <h1 className="text-6xl text-black font-bold">
                { User.name }
            </h1>
        
        </div>

        <div className="mt-5 flex flex-col text-black ml-64 h-80 justify-around items-start">

            <div>
                <p className="font-bold text-2xl">Email: <span className="font-medium text-xl pl-2"> {User.email} </span> </p>
            </div>

            <button onClick={() => logout(User)} className="w-44 btn btn-neutral">
                Logout
            </button>

        </div>

    </div>
  );
}
