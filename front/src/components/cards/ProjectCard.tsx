import { Link } from "react-router-dom";
import { ProjectSchema } from "../../packages/types";

interface ProjectCardProps {
    project: ProjectSchema
}


export default function ProjectCard({ project }: ProjectCardProps) {


    return (
        <div className="card w-80 h-52 shadow-2xl glass m-3 scroll-smooth snap-center transition-all duration-500 hover:scale-105">

            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"/></figure>

            <div className="card-body">
                
                <h2 className="card-title">
                    { project.name }
                    <div className="badge badge-accent">
                        v{ project.version }
                    </div>
                </h2>

                <p>{ project.description }</p>

                <div className="cards-actions flex justify-end bg-transparent">
                    <button className="btn btn-sm btn-primary mx-2">
                        <Link to={`/projects/${project.name}`}>Voir</Link>
                    </button>
                    <button className="btn btn-sm btn-primary btn-outline">Supprimer</button>
                </div>

            </div>

        </div>
    )

}
