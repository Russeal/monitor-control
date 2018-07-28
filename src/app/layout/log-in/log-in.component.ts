import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profileService';
import { ProfileDto } from '../../dto/profileDto';
import { GeneralKey } from '../../utils/generalKey';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [ProfileService]
})
export class LogInComponent implements OnInit {

  public login: string = '';
  public password: string = '';
  public isInvalidLogin: Boolean = false;
  
  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
  }

  authorization() {
    this.isInvalidLogin = false;
    if( this.login && this.password && this.login.length > 2 &&
      this.password.length > 2) {
        var profile = new ProfileDto;
        profile.login = this.login;
        profile.password = this.password;
        console.log(profile);
        
        this.profileService.authorization(profile).subscribe(
          (data) => {            
            if (data.state === 1) {
              localStorage.setItem(GeneralKey.ROLE, data.roles[0].name);
              localStorage.setItem(GeneralKey.NAME, data.firstName);
              localStorage.setItem(GeneralKey.SURNAME, data.lastName);
              if (data.imageLink) {
                localStorage.setItem(GeneralKey.PROFILEIMG, data.imageLink);                
              }
              localStorage.setItem(GeneralKey.TOKEN, data.token);
              this.router.navigate(['profile']);
            } else {
              this.isInvalidLogin = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}