import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GeneralURL } from '../utils/generalUrl';
import { GeneralKey } from '../utils/generalKey';
import { CountDto } from '../dto/countDto';
import { RoleDto } from '../dto/roleDto';
import { LocalStorageSecurity } from '../dto/localStorageSecurity';

@Injectable()
export class AdminGuard implements CanActivate {
 
    private isSuperAdmin: boolean = false;

    constructor(private router: Router, private http: HttpClient) { }
 
    canActivate(route: ActivatedRouteSnapshot) {
        if(LocalStorageSecurity.getItem('userType') === 'super_user'){
            this.isSuperAdmin = true;
        }
        this.getRole();
        if (this.isSuperAdmin) {
            return true;
        }
        this.router.navigateByUrl('/profile');
        return true;
    }

    private getRole() {
        this.getMyRole().subscribe(
            (data) => {
                for(var i=0; i<data.length; i++){
                    if (data[i].name === 'super_user') {
                        this.isSuperAdmin = true;
                        break;
                    }
                }
            },
            error => console.log(error)
        );
    }

    private getMyRole() {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': LocalStorageSecurity.getItem(GeneralKey.TOKEN)
            })
        };

        return this.http.get<Array<RoleDto>>(GeneralURL.profileURL.concat('my_roles'), options);
    }
}