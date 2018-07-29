import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralKey } from '../utils/generalKey';
import { GeneralURL } from '../utils/generalUrl';
import { NotificationDto } from '../dto/notificationDto';
import { CountDto } from '../dto/countDto';
import { LocalStorageSecurity } from '../dto/localStorageSecurity';


@Injectable()
export class NotificationService {

    constructor(private http: HttpClient) {
    }

    public getAllNotifications() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<NotificationDto>>(GeneralURL.notificationURL.concat('all'), options);
    }

    public getNotification(ntfcId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<NotificationDto>(GeneralURL.notificationURL.concat('get/' + ntfcId), options);
    }

    public readNotification(ntfcId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.notificationURL.concat('read_n/' + ntfcId), options);
    }

    public getNotReadNotificationCount() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.notificationURL.concat('rec_not_read_count'), options);
    }

    public getNotReadNotifications() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<NotificationDto>>(GeneralURL.notificationURL.concat('rec_not_read_list'), options);
    }

    public createNotification(ntfc: NotificationDto) {
        let json = JSON.stringify(ntfc);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post(GeneralURL.notificationURL.concat('create'), json, options);
    }

    public updateNotification(ntfc: NotificationDto) {
        let json = JSON.stringify(ntfc);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put(GeneralURL.notificationURL.concat('update/' + ntfc.id), json, options);
    }

    public deleteNotification(ntfcId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.notificationURL.concat('delete/' + ntfcId), options);
    }
}