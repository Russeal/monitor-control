import { DepartmentDto } from "./departmentDto";

export class ProjectDepartmentDto {
    public state: number;
    public id: number;
    public dId: number;
    public department: DepartmentDto;
    
    constructor() {}
}