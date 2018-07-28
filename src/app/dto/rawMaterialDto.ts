import { UnitDto } from "./unitDto";

export class RawMaterialDto {
    public state: number;
    public id: number;
    public projectId: number;
    public name: string;
    public price: number;
    public count: number;
    public unit: UnitDto;
    public link: string;
    
    constructor() {}
}