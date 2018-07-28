import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { GeneralKey } from '../utils/generalKey';
import { CenterDto } from '../dto/centerDto';
import { CountDto } from '../dto/countDto';
import { ImageDto } from '../dto/imageDto';
import { CenterManagerDto } from '../dto/centerManagerDto';
import { ProfileDto } from '../dto/profileDto';

@Injectable()
export class CentersService {

    constructor(private http: HttpClient) {}

    public getCenters() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };        

        return this.http.get(GeneralURL.centerURL.concat('all'), options);
    }

    public createCenter(center: CenterDto) {
        let json = JSON.stringify(center);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<CenterDto>(GeneralURL.centerURL.concat('create'),
            json, options);
    }

    public getCenterInfo(centerId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CenterDto>(GeneralURL.centerURL.concat('find/' + centerId), options);
    }

    public getDepartmentsOfCenter(centerId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get(GeneralURL.centerURL.concat('department_list/' + centerId), options);
    }

    public getEngineersCountOfCenter(centerId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.centerURL.concat('engineer_count/' + centerId), options);
    }

    public deleteCenter(centerId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete(GeneralURL.centerURL.concat('delete/' + centerId), options);
    }

    public updateImage(centerId: number, link: string) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        let options2 = {
            params: new HttpParams().append('link', link)
        };

        return this.http.put<ImageDto>(GeneralURL.centerURL.concat('updateImg/' + centerId), options, options2);
    }

    public getManagerOfCenter(centerId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get(GeneralURL.managerURL.concat('center/' + centerId), options);
    }

    public getDepartmentManagers() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProfileDto>>(GeneralURL.managerURL.concat('d_m/all'), options);
    }

    public updateCenter(center: CenterDto) {
        let json = JSON.stringify(center);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put<CountDto>(GeneralURL.centerURL.concat('update'),
            json, options);
    }

    public createCenterManager(centerMan: CenterManagerDto) {
        let json = JSON.stringify(centerMan);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<CountDto>(GeneralURL.managerURL.concat('center/create'),
            json, options);
    }
    
        public updateCenterManager(centerMan: CenterManagerDto) {
            let json = JSON.stringify(centerMan);
    
            let options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem(GeneralKey.TOKEN)
                })
            };
    
            return this.http.put<CountDto>(GeneralURL.managerURL.concat('center/update'),
                json, options);
        }
}