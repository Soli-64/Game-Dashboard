import { ProjectSchema } from "../types";


export default class Project {

    public name: string;
    public description: string;
    public version: string;
    public owner_id: string;
    public repo_name: string;

    constructor(dataObject: ProjectSchema) {

        this.name = dataObject.name
        this.description = dataObject.description
        this.version = dataObject.version

    }

}
