import { ProfileDto } from "./profileDto";
import { CenterDto } from "./centerDto";

export class DepartmentDto {
    public department: DepartmentDto;
    public id: number;
    public centerId: number;
    public state: number;
    public name: string;
    public submitDate: string;
    public center: CenterDto;
    public imgLink: string;
    public profile: ProfileDto;
    
    constructor() {}
}