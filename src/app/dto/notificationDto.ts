import { ProfileDto } from "./profileDto";

export class NotificationDto {
    public state: number;
    public id: number;
    public content: string;
    public readed: Boolean;
    public receiver: ProfileDto;
    public sender: ProfileDto;

    constructor() {}
}