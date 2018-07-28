import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { ImageDto } from '../dto/imageDto';
import { GeneralKey } from '../utils/generalKey';
import { AttachDto } from '../dto/attachDto';
import { CountDto } from '../dto/countDto';

@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {
    }

    uploadImage(file: File) {
        let formData = new FormData();
        formData.append('file', file);

        return this.http.post<ImageDto>(GeneralURL.imageURL.concat('create'), formData);
    }

    createAttach(file: File) {
        let formData = new FormData();
        formData.append('file', file);

        return this.http.post<AttachDto>(GeneralURL.attachURL.concat('create'), formData);
    }

    addAttach(attach: AttachDto) {
        let json = JSON.stringify(attach);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<CountDto>(GeneralURL.attachURL.concat('add_to_p'), json, options);
    }

    deleteAttach(id: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.attachURL.concat('delete/' + id), options);
    }

    getAllAttachs(projectId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<AttachDto>>(GeneralURL.attachURL.concat('all/'+ projectId), options);
    }

    getAttach(attachId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<AttachDto>(GeneralURL.attachURL.concat('get/'+ attachId), options);
    }
}