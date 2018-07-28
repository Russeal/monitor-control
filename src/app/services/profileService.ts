import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { ProfileDto } from '../dto/profileDto';
import { GeneralKey } from '../utils/generalKey';
import { CountDto } from '../dto/countDto';
import { RoleDto } from '../dto/roleDto';
import { ProjectDto } from '../dto/projectDto';
import { ImageDto } from '../dto/imageDto';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    public authorization(profile: ProfileDto) {
        let json = JSON.stringify(profile);
        
        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.post<ProfileDto>(GeneralURL.profileURL.concat('authorization'),
            json, options);
    }

    public createProfile(profile: ProfileDto) {
        let json = JSON.stringify(profile);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<CountDto>(GeneralURL.profileURL.concat('create'), json, options);
    }

    public getProfile(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<ProfileDto>(GeneralURL.profileURL.concat('find/' + id), options);
    }

    public getMyProfile() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<ProfileDto>(GeneralURL.profileURL.concat('my_profile'), options);
    }

    public updateProfile(profile: ProfileDto) {
        let json = JSON.stringify(profile);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put<CountDto>(GeneralURL.profileURL.concat('update'), json, options);
    }

    public updateMyImage(profile: ProfileDto) {
        let json = JSON.stringify(profile);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put<ImageDto>(GeneralURL.profileURL.concat('updateImg'), json, options);
    }

    public getEmployees() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProfileDto>>(GeneralURL.profileURL.concat('all'), options);
    }

    public deleteProfile(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.profileURL.concat('delete/' + id), options);
    }

    public getMyRole() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<RoleDto>>(GeneralURL.profileURL.concat('my_roles'), options);
    }

    public getMyProjects() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProjectDto>>(GeneralURL.profileURL.concat('prof_proj'), options);
    }

    public getProfileProjects(profileId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProjectDto>>(GeneralURL.profileURL.concat('prof_proj/' + profileId), options);
    }
}