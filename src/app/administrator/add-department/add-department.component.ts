import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CentersService } from '../../services/centersService';
import { DepartmentService } from '../../services/departmentService';
import { ImageService } from '../../services/imageService';
import { DepartmentDto } from '../../dto/departmentDto';
import { ImageDto } from '../../dto/imageDto';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
  providers: [CentersService, DepartmentService, ImageService]
})
export class AddDepartmentComponent implements OnInit {

  public centers;
  public image: ImageDto;
  public src:string;
  public srcName: string;
  public isImgReady: Boolean = false;
  public isDepReady: Boolean = false;
  public isImgChoosen: Boolean = false;

  constructor(private router: Router, private centersService: CentersService,
    private imageService: ImageService, private departmentService: DepartmentService){
      this.image = new ImageDto();
    }

  ngOnInit() {
    this.getCentersList();
    
    document.getElementById('uploadImg3').style.height = document.getElementById('uploadImg3').offsetWidth*2/3 + 'px';
  }

  getCentersList() {
    this.centersService.getCenters().subscribe(
      (data) => {
        this.centers = data;
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
    
    this.imageService.uploadImage(file).subscribe(
      (data) => {
        this.image = data;
        this.src = data.imageLink;
      },
      error => console.log(error)
    );

    this.onChangeName();
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
    var department = new DepartmentDto;
    department.name = (<HTMLInputElement>document.getElementById('formDepName')).value;
    department.centerId = parseInt((<HTMLInputElement>document.getElementById('selCenter')).value);
    department.imgLink = this.image.imageName;

    this.departmentService.createDepartment(department).subscribe(
      (data) => {
        if(data.state === 1) {
          this.router.navigate(["./departments"]);
        }
      },
      error => console.log(error)
    );
  }

  onChangeName() {
    if((<HTMLInputElement>document.getElementById('formDepName')).value.length > 1 && (<HTMLInputElement>document.getElementById('selCenter')).value !== "Markazlar" && this.isImgReady) {
      this.isDepReady = true;
    } else {
      this.isDepReady = false;
    }
  }
}