import { ProfileDto } from "./profileDto";

export class ProjectEmployeeDto {
    public projectId: number;
    public profileId: number;
    public salary: number;
    public state: number;
    public id: number;
    public profile: ProfileDto;
    
    constructor() {}
}