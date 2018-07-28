import { ProjectDto } from "./projectDto";
import { ProfileDto } from "./profileDto";

export class CommentDto {
    public state: number;
    public id: number;
    public content: string;
    public submitDate: string;
    public updateDate: string;
    public project: ProjectDto;
    public sender: ProfileDto;

    constructor() {}
}