import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { GeneralKey } from '../utils/generalKey';
import { PositionDto } from '../dto/positionDto';
import { LocalStorageSecurity } from '../dto/localStorageSecurity';

@Injectable()
export class PositionService {

    constructor(private http: HttpClient) {}

    public createPosition(position: PositionDto) {
        let json = JSON.stringify(position);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<PositionDto>(GeneralURL.positionURL.concat('create'),
            json, options);
    }

    public getPositions() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<PositionDto>(GeneralURL.positionURL.concat('all'), options);
    }

    public getPosition(posId) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<PositionDto>(GeneralURL.positionURL.concat('find/' + posId), options);
    }

    public updatePosition(position: PositionDto) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };
        let options2 = {
            params: new HttpParams().set('name', position.name)
        }

        return this.http.put<PositionDto>(GeneralURL.positionURL.concat('update/' + position.id), options, options2);
    }

    public deletePosition(posId) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete(GeneralURL.positionURL.concat('delete/' + posId), options);
    }
}