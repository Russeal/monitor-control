import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { GeneralKey } from '../utils/generalKey';
import { CountDto } from '../dto/countDto';
import { CommentDto } from '../dto/commentDto';

@Injectable()
export class CommentService {

    constructor(private http: HttpClient) {}

    public createComment(comment: CommentDto) {
        let json = JSON.stringify(comment);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<CommentDto>(GeneralURL.commentURL.concat('create'), json, options);
    }

    public getComment(projectCommentId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<CommentDto>(GeneralURL.commentURL.concat('get/' + projectCommentId), options);
    }

    public updateComment(comment: CommentDto) {
        let json = JSON.stringify(comment);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.put(GeneralURL.commentURL.concat('update/' + comment.id), json, options);
    }

    public deleteComment(projectCommentId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.delete<CountDto>(GeneralURL.commentURL.concat('delete/' + projectCommentId), options);
    }

    public getLastComment(projectId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<CommentDto>>(GeneralURL.commentURL.concat('get_last/' + projectId), options);
    }

    public getCommentPagination(projectId: number, paging: CountDto) {
        let json = JSON.stringify(paging);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.post<Array<CommentDto>>(GeneralURL.commentURL.concat('get_message_page/' + projectId), json, options);
    }

    public getNotReadComments(projectId: number) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<CommentDto>>(GeneralURL.commentURL.concat('not_read_all/' + projectId), options);
    }
}