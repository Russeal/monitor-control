import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralKey } from '../utils/generalKey';
import { GeneralURL } from '../utils/generalUrl';
import { ProjectUtilDto } from '../dto/projectUtilDto';
import { CountDto } from '../dto/countDto';
import { StateTreeDto } from '../dto/stateTreeDto';
import { LocalStorageSecurity } from '../dto/localStorageSecurity';

@Injectable()
export class ProjectUtilService {

    constructor(private http: HttpClient) {
    }

    public declineProject(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.project_utilURL.concat('bc_in_st/'+ id), options);
    }

    public startProject(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.project_utilURL.concat('start_project/'+ id), options);
    }

    public pmAcceptProject(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.project_utilURL.concat('pm_accept/'+ id), options);
    }

    public getPlanningProjects() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProjectUtilDto>>(GeneralURL.project_utilURL.concat('get_pl_project'), options);
    }

    public getInProcessProjects() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProjectUtilDto>>(GeneralURL.project_utilURL.concat('get_in_project'), options);
    }

    public getInApprovingProjects() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProjectUtilDto>>(GeneralURL.project_utilURL.concat('get_app_project'), options);
    }

    public getFinishedProjects() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProjectUtilDto>>(GeneralURL.project_utilURL.concat('get_fin_project'), options);
    }

    public getPSTree(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<StateTreeDto>>(GeneralURL.project_utilURL.concat('get_ps_tree/' + id), options);
    }

    public finalApprove(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.project_utilURL.concat('pm_final_approve/' + id), options);
    }

    public finishProject(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CountDto>(GeneralURL.project_utilURL.concat('finish_project/' + id), options);
    }
}