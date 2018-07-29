import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentersService } from '../../services/centersService';
import { DepartmentService } from '../../services/departmentService';
import { ImageService } from '../../services/imageService';
import { CenterDto } from '../../dto/centerDto';
import { ImageDto } from '../../dto/imageDto';
import { DepartmentDto } from '../../dto/departmentDto';
import { ProfileDto } from '../../dto/profileDto';
import { DepManagerDto } from '../../dto/depManagerDto';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss'],
  providers: [CentersService, DepartmentService, ImageService]
})

export class EditDepartmentComponent implements OnInit {

  public departmentId: number;
  public department: DepartmentDto;
  public departmentName: string;
  public centerOfDepartment: CenterDto;
  public managerOfDepartment: ProfileDto;
  public fuckId: number;
  public centers;
  public engineers;
  public image: ImageDto;
  public src:string;
  public isImgReady: Boolean = true;
  public isDepReady: Boolean = false;
  public isImgChoosen: Boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private imgService: ImageService, private centerService: CentersService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.activeRoute.params.forEach(params => {
      this.departmentId = parseInt(params["department"]);
    });

    this.getDepartmentInfo();
    this.getCentersList();

    setTimeout(() => {
      document.getElementById('uploadImg4').style.height = document.getElementById('uploadImg4').offsetWidth*2/3 + 'px';
    }, 500);
  }

  getDepartmentInfo() {
    this.departmentService.getDepartmentInfo(this.departmentId).subscribe(
      (data) => {
        if(data.center) {
          this.centerOfDepartment = data.center;
        }
        if(data.profile) {
          this.managerOfDepartment = data.profile;
          this.fuckId = data.profile.id;
        }
        this.department = data;
        this.src = data.imgLink;
        this.departmentName = data.name;

        this.getEngineers();
      },
      error => console.log(error)
    );
  }

  // getCenterOfDepartment() {
  //   this.departmentService.getCenterOfDepartment(this.departmentId).subscribe(
  //     (data) => {
  //       if(data.state === 1){
  //         this.centerOfDepartment = data;
  //       }
  //     },
  //     error => console.log(error)
  //   );
  // }

  getEngineers() {
    this.departmentService.getEngineersOfDepartment(this.departmentId).subscribe(
      (data) => {
        this.engineers = data;
      },
      error => console.log(error)
    );
  }

  getCentersList() {
    this.centerService.getCenters().subscribe(
      data => this.centers = data,
      error => console.log(error)
    );
  }

  onSelect(e) {
    this.src = e;
    this.isImgChoosen = true
  }

  saveImg() {
    this.isImgReady = true;
    var file = this.dataURLtoFile(this.src, 'a.png');

    this.imgService.uploadImage(file).subscribe(
      (data) => {
        this.image = data;
        this.src = data.imageLink;
        this.updateDepartmentImg();
      },
      error => console.log(error)
    );
  }

  updateDepartmentImg() {
    this.departmentService.updateDepartmentImage(this.departmentId, this.image.imageName).subscribe(
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

  saveDep() {
    var dep = new DepartmentDto();
    dep.id = this.departmentId;
    dep.name = this.departmentName;
    dep.centerId = parseInt((<HTMLInputElement>document.getElementById('selCenter2')).value);

    this.departmentService.updateDepartment(dep).subscribe(
      (data) => {
        if(data.state === 1) {
          if(this.managerOfDepartment) {
            this.updateManagerOfDepartment();
          } else {
            this.createManagerOfDepartment();
          }
          this.router.navigate(["./departments/" + dep.id]);
        }
      },
      error => console.log(error)
    );
  }

  createManagerOfDepartment() {
    var manager = new DepManagerDto();
    manager.id = this.departmentId;
    manager.dmId = parseInt((<HTMLInputElement>document.getElementById('selManager2')).value);

    this.departmentService.createDepartmentManager(manager).subscribe(
      error => console.log(error)
    );
  }

  updateManagerOfDepartment() {
    var manager = new DepManagerDto();
    manager.id = this.departmentId;
    manager.dmId = parseInt((<HTMLInputElement>document.getElementById('selManager2')).value);

    this.departmentService.updateDepartmentManager(manager).subscribe(
      error => console.log(error)
    );
  }

  onChangeName() {
    if(this.centerOfDepartment && (<HTMLInputElement>document.getElementById('selCenter2')).value !== "Markazlar" && (<HTMLInputElement>document.getElementById('selManager2')).value !== "Hodimlar" && this.isImgReady){
      if((<HTMLInputElement>document.getElementById('formDepName2')).value.length > 1) {
        this.isDepReady = true;
      } else {
        this.isDepReady = false;
      }
    };
  }

  removeImg() {
    this.isImgReady = false;
    this.isImgChoosen = false;
  }
}