import { DepartmentDto } from "./departmentDto";

export class ProfileDto {
    public login: string;
    public password: string;
    public state: number;
    public firstName: string;
    public lastName: string;
    public token: string;
    public skills: string;
    public roles: any;
    public centerId: string;
    public departmentId: string;
    public department: DepartmentDto;
    public positionId: string;

    public birthDate;
    public email;
    public id;
    public imageLink;
    public parentName;
    public phoneNumber;
    public studyDegree;
    public studyPlace;

    constructor() {}
}