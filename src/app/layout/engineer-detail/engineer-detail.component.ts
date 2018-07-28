import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profileService';
import { ProfileDto } from '../../dto/profileDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-engineer-detail',
  templateUrl: './engineer-detail.component.html',
  styleUrls: ['./engineer-detail.component.scss'],
  providers: [ProfileService]
})
export class EngineerDetailComponent implements OnInit {

  public profile: ProfileDto;
  public profileId: number;
  public skills;
  public isMyProfile: Boolean = false;
  public isSuperUser: boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.activeRoute.params.forEach(param => {
      this.profileId = parseInt(param["id"]);
    });
    
    this.getProfile();
    this.checkRole();
  }

  private getProfile() {
    this.profileService.getProfile(this.profileId).subscribe(
      (data) => {
        this.profile = data;
        if (data.skills) {
          this.skills = data.skills.split(',');
        }
      },
      error => console.log(error)
    );
  }

  private checkRole() {
    this.profileService.getMyRole().subscribe(
      (data) => {
        for(var i=0; i<data.length; i++){
          if (data[i].name === 'super_user') {
              this.isSuperUser = true;
              break;
          }
        }
      },
      error => console.log(error)
    );
  }

  deleteProfile() {
    this.profileService.deleteProfile(this.profile.id).subscribe(
      (data) => {
        if (data.state === 1) {
          setTimeout(() => {
            this.router.navigate(["employees"]);
          }, 200);
        }
      },
      error => console.log(error)
    );
  }
}