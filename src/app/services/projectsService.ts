import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProjectDto } from '../dto/projectDto';

import { GeneralKey } from '../utils/generalKey';
import { GeneralURL } from '../utils/generalUrl';
import { CountDto } from '../dto/countDto';
import { ProjectEmployeeDto } from '../dto/projectEmployeeDto';
import { RawMaterialDto } from '../dto/rawMaterialDto';
import { UnitDto } from '../dto/unitDto';
import { ProjectEquipmentDto } from '../dto/projectEquipmentDto';
import { DepartmentDto } from '../dto/departmentDto';
import { ProjectDepartmentDto } from '../dto/projectDepartmentDto';
import { ProfileDto } from '../dto/profileDto';
import { DeadlineDto } from '../dto/deadlineDto';
import { LocalStorageSecurity } from '../dto/localStorageSecurity';

@Injectable()
export class ProjectsService {

    constructor(private http: HttpClient) {
    }

    public createProject(project: ProjectDto) {
        let json = JSON.stringify(project);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<CountDto>(GeneralURL.projectURL.concat('create'), json, options);
    }

    public getProjectInfo(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<ProjectDto>(GeneralURL.projectURL.concat('project_all/' + id), options);
    }
    
    public deleteProject(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.projectURL.concat('delete/' + id), options);
    }

    public updateProject(project: ProjectDto) {
        let json = JSON.stringify(project);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put<CountDto>(GeneralURL.projectURL.concat('update'), json, options);
    }

    public addEmployee(employee: ProjectEmployeeDto) {
        let json = JSON.stringify(employee);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<ProjectEmployeeDto>(GeneralURL.projectURL.concat('add_employee'), json, options);
    }

    public deleteEmployee(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.projectURL.concat('delete_employee/' + id), options);
    }

    public updateEmployee(employee: ProjectEmployeeDto) {
        let json = JSON.stringify(employee);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };
        
        return this.http.put<CountDto>(GeneralURL.projectURL.concat('update_employee'), json, options);
    }

    public addRawMaterial(material: RawMaterialDto) {
        let json = JSON.stringify(material);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<RawMaterialDto>(GeneralURL.projectURL.concat('add_rawMaterial'), json, options);
    }

    public getUnits() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<UnitDto>>(GeneralURL.unitURL.concat('all'), options);
    }

    public deleteRawMaterial(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.projectURL.concat('delete_rawMaterial/' + id), options);
    }

    public addEquipment(equipment: ProjectEquipmentDto) {
        let json = JSON.stringify(equipment);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<ProjectEquipmentDto>(GeneralURL.projectURL.concat('add_equipment'), json, options);
    }

    public deleteEquipment(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.projectURL.concat('delete_equipment/' + id), options);
    }

    public addDepartment(dep: ProjectDto) {
        let json = JSON.stringify(dep);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<ProjectDepartmentDto>(GeneralURL.projectURL.concat('add_department'), json, options);
    }

    public deleteDepartment(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.projectURL.concat('delete_department/' + id), options);
    }

    public getProjectEmployees(projectId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<ProfileDto>>(GeneralURL.projectURL.concat('get_employee/' + projectId), options);
    }

    public updateDeadline(deadline: DeadlineDto) {
        let json = JSON.stringify(deadline);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put<CountDto>(GeneralURL.projectURL.concat('update_deadline'), json, options);
    }
}