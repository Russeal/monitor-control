import { Component, OnInit } from '@angular/core';
import { ProfileDto } from '../../dto/profileDto';
import { ProfileService } from '../../services/profileService';
import { Router } from '@angular/router';
import { ImageDto } from '../../dto/imageDto';
import { ImageService } from '../../services/imageService';
import { LocalStorageSecurity } from '../../dto/localStorageSecurity';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ProfileService, ImageService]
})

export class EditProfileComponent implements OnInit {

  public profile: ProfileDto;
  public skills;
  public newSkill: string = '';
  public birthday: Date;
  public image: ImageDto;
  public src:string;
  public isImgChosen: Boolean = false;
  public isImgReady: Boolean = false;
  public password: string = '';
  public oldPass: string = '';
  public newPass: string = '';
  public newPass2: string = '';
  public isErr1: boolean = false;
  public isErr2: boolean = false;
  public isErr3: boolean = false;
  public degrees = [
    "O'rta-maxsus",
    "OTM talabasi",
    "Bakalavr",
    "Magistr",
    "PhD",
    "Doktor"
  ]

  constructor(private profileService: ProfileService, private router: Router, private imgService: ImageService) {
    this.skills = [];
  }

  ngOnInit() {
    this.getMyProfile();

    setTimeout(() => {
      document.getElementById('uploadImg5').style.height = document.getElementById('uploadImg5').offsetWidth + 'px';
    }, 500);
  }

  private getMyProfile() {
    this.profileService.getMyProfile().subscribe(
      (data) => {
        this.profile = data;
        console.log(data);
        
        if(data.birthDate) {
          this.birthday = new Date(data.birthDate);
        }
        if (data.skills) {
          this.skills = data.skills.split(',');
        }
        if (data.imageLink) {
          this.src = data.imageLink;
          this.isImgChosen = true;
          this.isImgReady = true;
        }
      },
      error => console.log(error)
    );
  }

  public changePassword() {
    if (this.oldPass === this.profile.password) {
      this.isErr1 = false;
      if (this.oldPass !== this.newPass && this.newPass === this.newPass2) {
        this.isErr2 = false;

        var newAuth = new ProfileDto();
        newAuth.login = "admin";
        newAuth.password = this.newPass;
        this.profileService.UpdateLoginPass(newAuth).subscribe(
          (data) => {
            if (data.state === 1) {
              document.getElementById("warnwarner").click();
              localStorage.clear();
              this.router.navigate(['log-in']);
            }
          },
          error => console.log(error)
        );


      } else {
        this.isErr2 = true;
      }
    } else {
      this.isErr1 = true;
    }
  }

  addSkill() {
    this.skills.push(this.newSkill);
    this.newSkill = '';
  }

  removeSkill(skill: string) {
    if(this.skills.indexOf(skill) !== -1) {
      this.skills.splice(this.skills.indexOf(skill), 1);
    }
  }

  saveProfile() {
    this.profile.birthDate = (<HTMLInputElement>document.getElementById('editEngIn4')).value;
    this.profile.skills = this.skills.toString();
    this.profile.studyDegree = (<HTMLInputElement>document.getElementById("editEngIn5")).value;
    this.profileService.updateProfile(this.profile).subscribe(
      (data) => {
        if(data.state === 1) {
          this.router.navigate(['profile']);
        }
      },
      error => console.log(error)
    );
  }

  validateEmail(e) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(e.match(mailformat)) {
      document.getElementById('editEmail').classList.remove('redBottom');
      document.getElementById('emailLabel').classList.remove('redFont');
      return true;
    }
    else {
      document.getElementById('editEmail').classList.add('redBottom');
      document.getElementById('emailLabel').classList.add('redFont');
      return false;
    }
  }

  validatePhone(e) {
    var phoneFormat = /^\d{12}$/;
    if(e.match(phoneFormat)) {
      document.getElementById('editPhone').classList.remove('redBottom');
      document.getElementById('phoneLabel').classList.remove('redFont');
      return true;
    }
    else {
      document.getElementById('editPhone').classList.add('redBottom');
      document.getElementById('phoneLabel').classList.add('redFont');
      return false;
    }
  }

  onSelect(e) {
    this.src = e;
    this.isImgChosen = true
  }

  saveImg() {
    this.isImgReady = true;
    var file = this.dataURLtoFile(this.src, 'a.png');

    this.imgService.uploadImage(file).subscribe(
      (data) => {
        this.image = data;
        this.src = data.imageLink;
        this.updateEmployeeImg();
      },
      error => console.log(error)
    );
  }

  updateEmployeeImg() {
    var profile = new ProfileDto();
    profile.imageLink = this.image.imageName;

    this.profileService.updateMyImage(profile).subscribe(
      (data) => {
        LocalStorageSecurity.setItem('profileImg', data.imageLink);
      },
      error => console.log(error)
    );
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  removeImg() {
    this.isImgReady = false;
    this.isImgChosen = false;
  }
}