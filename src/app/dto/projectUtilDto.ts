import { ProfileDto } from "./profileDto";

export class ProjectUtilDto {
    public state: number;
    public id: number;
    public name: string;
    public description: string;
    public imageLink: string;
    public profile: ProfileDto;

    constructor() {}
}