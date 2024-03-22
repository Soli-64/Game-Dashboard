import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/useUser";
import { getProjects, getRepo } from "../../packages/functions";
import { ProjectSchema } from "../../packages/types";
import { useParams } from "react-router-dom";


export default function ProjectDashPage() {
  
    const { projectname } = useParams();
    
    const User = useContext(UserContext);
    
    const [projectsLoading, setProjectsLoading] = useState(false);
    
    const [project, setProject] = useState<ProjectSchema>({} as ProjectSchema);

    useEffect(() => {

        if (User.id === 0) {
        window.location.assign("/"); //(`${import.meta.env.VITE_DEV_REACT_APP_URL}`)
        } else {
        getProjects(User, setProjectsLoading);
        }

        setProject(
            User.projects.filter(
                (proj) => proj.name === projectname
            )[0] as ProjectSchema
        );

        getRepo('fastJSON-Builder', 'Soli-64')
        
    }, []);

  return (

    <div className="mt-16 w-full bg-white">
        {
            projectsLoading ? (

                <p>azeaz</p>
            
            ) : (
                
                <>

                    <div className="w-1/5 bg-gray-100 right-column h-screen text-black p-5">
                        
                        <div className="flex flex-col items-start">

                            <p className="text-4xl my-5"> { project.name } </p>    
                            
                            <p className="badge badge-primary text-lg my-2"> v{ project.version } </p>

                        </div>
                    
                    </div>  
                </>
            )
        }
    </div>
  );
}
