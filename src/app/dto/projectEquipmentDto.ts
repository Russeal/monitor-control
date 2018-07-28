import { MachineDto } from "./machineDto";

export class ProjectEquipmentDto {
    public projectId: number;
    public equipment: MachineDto;
    public workHour: number;
    public state: number;
    public id: number;
    
    constructor() {}
}