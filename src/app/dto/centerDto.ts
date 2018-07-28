import { ProfileDto } from "./profileDto";

export class CenterDto {
    public state: number;
    public id: number;
    public name: string;
    public imgLink: string;
    public centerManager: number;
    public profile: ProfileDto;

    constructor() {}
}