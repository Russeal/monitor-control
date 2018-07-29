import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentersService } from '../../services/centersService';
import { CenterDto } from '../../dto/centerDto';
import { CenterManagerDto } from '../../dto/centerManagerDto';
import { ImageService } from '../../services/imageService';

@Component({
  selector: 'app-edit-center',
  templateUrl: './edit-center.component.html',
  styleUrls: ['./edit-center.component.scss'],
  providers: [CentersService, ImageService]
})

export class EditCenterComponent implements OnInit {

  public center: CenterDto;
  public managers;
  public centerId;
  public managerBekId;
  public src:string;
  public srcName:string;
  public isCenterReady: Boolean = false;
  public isImgReady: Boolean = true;
  public isImgChoosen: Boolean = false;


  constructor(private imgService: ImageService, private router: Router, private activeRoute: ActivatedRoute, private centerService: CentersService) { }

  ngOnInit() {
    this.activeRoute.params.forEach(params => {
      this.centerId = parseInt(params["markaz"]);
    });

    this.getDepartmentManagers();
    this.getCenterInfo();

    setTimeout(() => {
      document.getElementById('uploadImg2').style.height = document.getElementById('uploadImg2').offsetWidth*2/3 + 'px';
    }, 500);
  }

  getCenterInfo() {
    this.centerService.getCenterInfo(this.centerId).subscribe(
      (data) => {
        if(data.profile.state === 1) {
          this.managerBekId = data.profile.id;
          this.isCenterReady = true;
        }
        this.center = data;
        this.src = this.center.imgLink;
      },
      error => console.log(error)
    );
  }

  getDepartmentManagers() {
    this.centerService.getDepartmentManagers().subscribe(
      (data) => {
        this.managers = data;
      },
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
        this.src = data.imageLink;
        this.srcName = data.imageName;
        this.updateCenterImage();
      },
      error => console.log(error)
    );

    this.onChangeName();
  }

  updateCenterImage() {
    this.centerService.updateImage(this.centerId, this.srcName).subscribe(
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

  saveCenter() {
    var center = new CenterDto();
    center.id = this.centerId;
    center.name = this.center.name;

    this.centerService.updateCenter(center).subscribe(
      (data) => {
        if(this.managerBekId) {
          this.updateManager();
        } else {
          this.createManager();
        }
        setTimeout(() => {
          this.router.navigate(["markazlar/" + this.centerId]);
        }, 200);
      },
      error => console.log(error)
    );
  }

  createManager() {
    var manager = new CenterManagerDto();
    manager.cmId = parseInt((<HTMLInputElement>document.getElementById('selManager')).value);
    manager.id =  this.centerId;

    this.centerService.createCenterManager(manager).subscribe(
      error => console.log(error)
    );
  }

  updateManager() {
    var manager = new CenterManagerDto();
    manager.cmId = parseInt((<HTMLInputElement>document.getElementById('selManager')).value);
    manager.id =  this.centerId;

    this.centerService.updateCenterManager(manager).subscribe(
      error => console.log(error)
    );
  }

  onChangeName() {
    if((<HTMLInputElement>document.getElementById('formCntr2')).value.length > 1 && (<HTMLInputElement>document.getElementById('selManager')).value !== 'Hodimlar' && this.isImgReady) {
      this.isCenterReady = true;
    } else {
      this.isCenterReady = false;
    }
  }

  removeImg() {
    this.isImgReady = false;
    this.isImgChoosen = false;
  }
}