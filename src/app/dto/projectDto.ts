import { ProfileDto } from "./profileDto";
import { DepartmentDto } from "./departmentDto";
import { ProjectEmployeeDto } from "./projectEmployeeDto";
import { AttachDto } from "./attachDto";
import { RawMaterialDto } from "./rawMaterialDto";
import { ProjectEquipmentDto } from "./projectEquipmentDto";
import { StateTreeDto } from "./stateTreeDto";

export class ProjectDto {
    public state: number;
    public id: number;
    public dId: number;
    public deadline: number;
    public name: string;
    public description: string;
    public imgLink: string;
    public profile: ProfileDto;
    public departments: Array<DepartmentDto>;
    public projectDeps: Array<DepartmentDto>;
    public projectEmps: Array<ProjectEmployeeDto>;
    public rawMaterials: Array<RawMaterialDto>;
    public projectEquips: Array<ProjectEquipmentDto>;
    public attachs: Array<AttachDto>;
    public isPm: Boolean;
    public isCeo: Boolean;
    public projectState: StateTreeDto;

    constructor() {}
}