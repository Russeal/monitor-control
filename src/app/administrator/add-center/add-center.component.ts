import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ImageService } from '../../services/imageService';
import { CentersService } from '../../services/centersService';
import { CenterDto } from '../../dto/centerDto';

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.scss'],
  providers: [ImageService, CentersService]
})

export class AddCenterComponent implements OnInit {
  
  src:string;
  srcName: string;
  isImgReady: Boolean = false;
  isCenterReady: Boolean = false;
  isImgChoosen: Boolean = false;

  constructor(private router: Router, private imageService: ImageService, private centerService: CentersService) { }

  ngOnInit() {   
    document.getElementById('uploadImg').style.height = document.getElementById('uploadImg').offsetWidth*2/3 + 'px';
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
        this.src = data.imageLink;
        this.srcName = data.imageName;
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

  saveCenter() {
    var center = new CenterDto;
    center.name = (<HTMLInputElement>document.getElementById('formCenterName')).value;
    center.imgLink = this.srcName;
    
    this.centerService.createCenter(center).subscribe(
      (data) => {
        if(data.state === 1) {
          this.router.navigate(["./markazlar"]);
        }
      },
      error => console.log(error)
    );
  }

  onChangeName() {
    if((<HTMLInputElement>document.getElementById('formCenterName')).value.length > 1 && this.isImgReady) {
      this.isCenterReady = true;
    } else {
      this.isCenterReady = false;
    }
  }
}