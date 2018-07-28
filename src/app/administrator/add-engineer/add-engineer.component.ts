import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CentersService } from '../../services/centersService';
import { PositionService } from '../../services/positionService';
import { ProfileService } from '../../services/profileService';
import { ProfileDto } from '../../dto/profileDto';

@Component({
  selector: 'app-add-engineer',
  templateUrl: './add-engineer.component.html',
  styleUrls: ['./add-engineer.component.scss'],
  providers: [CentersService, PositionService, ProfileService]
})

export class AddEngineerComponent implements OnInit {

  public centers;
  public name = '';
  public surname = '';
  public login = '';
  public password = '123456789';
  public previous = 'Markazlar';
  public departments;
  public positions;
  public src:string;
  public isEngReady: Boolean = false;
  public isCenterChosen: Boolean = false;
  public isDepChosen: Boolean = false;

  constructor(private router: Router, private posService: PositionService, private centersService: CentersService, private profileService: ProfileService) { }

  ngOnInit() {
    this.getCentersList();
    this.getPositions();
  }

  getCentersList() {
    this.centersService.getCenters().subscribe(
      (data) => {
        this.centers = data;
      },
      error => console.log(error)
    );
  }

  onChangeCenter() {
    if(parseInt((<HTMLInputElement>document.getElementById('addEngIn3')).value) && parseInt(this.previous) !== parseInt((<HTMLInputElement>document.getElementById('addEngIn3')).value)) {
      this.previous = (<HTMLInputElement>document.getElementById('addEngIn3')).value;
      this.isCenterChosen = true;
      this.centersService.getDepartmentsOfCenter(parseInt((<HTMLInputElement>document.getElementById('addEngIn3')).value)).subscribe(
        (data) => {
          this.departments = data;
          this.isDepChosen = true;
          this.isEngReady = true;
        },
        error => console.log(error)
      );
    }
  }

  getPositions() {
    this.posService.getPositions().subscribe(
      (data) => {
        this.positions = data;
      },
      error => console.log(error)
    );
  }

  saveProfile() {
    var profile = new ProfileDto();
    profile.login = this.login;
    profile.password = this.password;
    profile.firstName = this.name;
    profile.lastName = this.surname;
    profile.centerId = (<HTMLInputElement>document.getElementById('addEngIn3')).value;
    profile.departmentId = (<HTMLInputElement>document.getElementById('addEngIn4')).value;
    profile.positionId = (<HTMLInputElement>document.getElementById('addEngIn5')).value;
    
    this.profileService.createProfile(profile).subscribe(
      (data) => {
        if(data.state === 1) {
          this.router.navigate(["./employees"]);
        }
      },
      error => console.log(error)
    );
  }
}