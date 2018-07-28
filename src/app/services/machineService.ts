import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { GeneralKey } from '../utils/generalKey';
import { MachineDto } from '../dto/machineDto';
import { CountDto } from '../dto/countDto';

@Injectable()
export class MachineService {

    constructor(private http: HttpClient) {}

    public createMachine(machine: MachineDto) {
        let json = JSON.stringify(machine);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<MachineDto>(GeneralURL.machineURL.concat('create'),
            json, options);
    }

    public getMachines() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<MachineDto>>(GeneralURL.machineURL.concat('all'), options);
    }

    public getMachine(machineId) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<MachineDto>(GeneralURL.machineURL.concat('find/' + machineId), options);
    }

    public updateMachine(machine: MachineDto) {
        let json = JSON.stringify(machine);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put(GeneralURL.machineURL.concat('update/' + machine.id), json, options);
    }

    public deleteMachine(machineId) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.machineURL.concat('delete/' + machineId), options);
    }
}