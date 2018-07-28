import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { GeneralKey } from '../utils/generalKey';
import { DepartmentDto } from '../dto/departmentDto';
import { CenterDto } from '../dto/centerDto';
import { CountDto } from '../dto/countDto';
import { DepManagerDto } from '../dto/depManagerDto';
import { ProfileDto } from '../dto/profileDto';

@Injectable()
export class DepartmentService {

    constructor(private http: HttpClient) {}

    public getDepartments() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };        

        return this.http.get<Array<DepartmentDto>>(GeneralURL.departmentURL.concat('all'), options);
    }

    public createDepartment(department: DepartmentDto) {
        let json = JSON.stringify(department);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<DepartmentDto>(GeneralURL.departmentURL.concat('create'),
            json, options);
    }

    public getDepartmentInfo(depId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<DepartmentDto>(GeneralURL.departmentURL.concat('find/' + depId), options);
    }

    public getEngineersOfDepartment(depId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProfileDto>>(GeneralURL.departmentURL.concat('engineer_list/' + depId), options);
    }

    public getEngineersCountOfDepartment(depId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.departmentURL.concat('engineer_count/' + depId), options);
    }

    public deleteDepartment(depId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete(GeneralURL.departmentURL.concat('delete/' + depId), options);
    }

    public getCenterOfDepartment(depId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CenterDto>(GeneralURL.departmentURL.concat('get_center/' + depId), options);
    }

    public updateDepartment(department: DepartmentDto) {
        let json = JSON.stringify(department);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put<CountDto>(GeneralURL.departmentURL.concat('update'), json, options);
    }
    
    public updateDepartmentImage(depId: number, link: string) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        let options2 = {
            params: new HttpParams().append('link', link)
        };
        
        return this.http.put(GeneralURL.departmentURL.concat('updateImg/' + depId), options, options2);
    }

    public createDepartmentManager(depMan: DepManagerDto) {
        let json = JSON.stringify(depMan);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<CountDto>(GeneralURL.managerURL.concat('department/create'), json, options);
    }

    public updateDepartmentManager(depMan: DepManagerDto) {
        let json = JSON.stringify(depMan);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put<CountDto>(GeneralURL.managerURL.concat('department/update'), json, options);
    }

    public getOngoingProjects(depId: number) {
        return [
            {id:0, title: 'Logo Futbol', department: 'Mexatronika', authors: ['Davron', 'Boriykhon', 'Sardor'], imgSrc: 'assets/images/hum.png'},
            {id:1, title: 'Humanoid Robot', department: 'Axborot Texnologiyalari', authors: ['Firdavs'], imgSrc: 'assets/images/bot.jpg'},
            {id:2, title: "Brayl kitobi", department: 'Mexatronika', authors: ["O'lmas", 'Laziz'], imgSrc: 'assets/images/blind.jpg'},
            {id:3, title: 'Logo Futbol', department: 'Robototexnika', authors: ['Davron', 'Boriykhon', 'Sardor'], imgSrc: 'assets/images/hum.png'},
            {id:4, title: 'Humanoid Robot', department: 'Mexatronika', authors: ['Firdavs'], imgSrc: 'assets/images/bot.jpg'}
        ];
    }

    public getFinishedProjects(depId: number) {
        return [
            {id:0, title: 'Logo Futbol', department: 'Mexatronika', authors: ['Davron', 'Boriykhon', 'Sardor'], imgSrc: 'assets/images/hum.png'},
            {id:1, title: 'Humanoid Robot', department: 'Axborot Texnologiyalari', authors: ['Firdavs'], imgSrc: 'assets/images/bot.jpg'},
            {id:2, title: "Brayl kitobi", department: 'Mexatronika', authors: ["O'lmas", 'Laziz'], imgSrc: 'assets/images/blind.jpg'},
            {id:3, title: 'Logo Futbol', department: 'Robototexnika', authors: ['Davron', 'Boriykhon', 'Sardor'], imgSrc: 'assets/images/hum.png'},
            {id:4, title: 'Humanoid Robot', department: 'Mexatronika', authors: ['Firdavs'], imgSrc: 'assets/images/bot.jpg'}
        ];
    }
}