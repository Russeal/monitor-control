import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profileService';
import { ProfileDto } from '../../dto/profileDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  public profile: ProfileDto;
  public skills;
  public isMyProfile: Boolean = false;

  constructor(private activeRoute: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.activeRoute.parent.url.forEach(element => {
      if(element[0].path === 'profile') {
        this.isMyProfile = true;
      }
    });
    
    this.getMyProfile();
  }

  private getMyProfile() {
    this.profileService.getMyProfile().subscribe(
      (data) => {
        this.profile = data;
        if (data.skills) {
          this.skills = data.skills.split(',');
        }
      },
      error => console.log(error)
    );
  }
}