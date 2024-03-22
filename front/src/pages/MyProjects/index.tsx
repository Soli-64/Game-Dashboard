import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/useUser";
import { getProjects } from "../../packages/functions";
import ProjectCard from "../../components/cards/ProjectCard";



export default function ProjectsPage() {
  
    const User = useContext(UserContext);
    const [projectsLoading, setProjectsLoading] = useState(false)

    useEffect(() => {

        if (User.id === 0) {
            window.location.assign('/') //(`${import.meta.env.VITE_DEV_REACT_APP_URL}`)
        } else {
            getProjects(User, setProjectsLoading)
        }

    }, [])

    return (
        <div className="pt-20 h-screen overflow-y-scroll">

            <h1 className="pt-5 text-6xl text-center font-bold text-black">
                Vos projets
            </h1>

            <div className="mt-10 h-40 flex justify-around items-center w-full">
                <button className="btn btn-outline btn-primary">
                    + Créer un nouveau projet
                </button>
            </div>

            <div className="p-10 w-full flex flex-row h-max justify-start flex-wrap bg-white">

                {

                    projectsLoading ? (

                        <div className="flex flex-row items-center justify-around w-full h-auto">
                            
                            {/* <p className="text-4xl text-black">
                                Loading Projects...
                            </p> */}

                            <div className="absolute animate-spin block w-12 h-12 rounded-full border-400-grey border-e-black border-8"></div>
                        
                        </div>
                        
                    ) : (
                        
                        User.projects.map((e, i) => {
                            return <ProjectCard project={e} key={i} />
                            }
                        )
                        
                    )

                }

            </div>

        </div>
    );

}
