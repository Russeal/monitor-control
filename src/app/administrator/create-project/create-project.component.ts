import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CentersService } from '../../services/centersService';
import { DepartmentService } from '../../services/departmentService';
import { ProjectsService } from '../../services/projectsService';
import { ImageService } from '../../services/imageService';

import { DepartmentDto } from '../../dto/departmentDto';
import { ImageDto } from '../../dto/imageDto';
import { ProjectDto } from '../../dto/projectDto';
import { ProfileDto } from '../../dto/profileDto';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [CentersService, DepartmentService, ImageService, ProjectsService]
})

export class CreateProjectComponent implements OnInit {

  public name: string = '';
  public description: string = '';
  public managers;
  public departments;
  public chosenDeps;
  public chosenFiles;
  public isDepReady: Boolean = false;
  public image: ImageDto;
  public src:string;
  public isImgReady: Boolean = false;
  public isImgChoosen: Boolean = false;
  public isProjectReady: Boolean = false;

  constructor(private router: Router, private projectService: ProjectsService, private imageService: ImageService, private centerService: CentersService, private depService: DepartmentService) {
    this.chosenFiles = [];
    this.chosenDeps = [];
  }

  ngOnInit() {
    this.getDepartmentManagers();
    this.getDepartmentsList();
    
    document.getElementById('uploadImg6').style.height = document.getElementById('uploadImg6').offsetWidth*2/3 + 'px';
  }

  private getDepartmentManagers() {
    this.centerService.getDepartmentManagers().subscribe(
      (data) => {
        this.managers = data;
      },
      error => console.log(error)
    );
  }

  private getDepartmentsList() {
    this.depService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      error => console.log(error)
    );
  }

  addDepartment() {
    var dep = parseInt((<HTMLInputElement>document.getElementById("projectForm4")).value);
    for(var i=0; i<this.departments.length; i++) {
      if(this.departments[i].id === dep) {
        this.chosenDeps.push(this.departments[i]);
        this.departments.splice(i, 1);
        break;
      }
    }
    this.isDepReady = false;
    document.querySelector(".ready").classList.remove('ready');
    (<HTMLInputElement>document.getElementById('projectForm4')).value = "Bo'limlar";
    this.checkProject();
  }

  removeDepartment(dep: DepartmentDto, i: number) {
    this.chosenDeps.splice(i, 1);
    this.departments.push(dep);
  }

  saveProject() {
    var project = new ProjectDto();
    project.profile = new ProfileDto();
    project.name = this.name;
    project.description = this.description;
    project.profile.id = (<HTMLInputElement>document.getElementById('projectForm3')).value;
    project.departments = this.chosenDeps;
    project.imgLink = this.image.imageName;
    project.attachs = this.chosenFiles;

    this.projectService.createProject(project).subscribe(
      (data) => {
        if (data.state === 1) {
          this.router.navigate(["./projects/new-planned-projects"]);
        }
      },
      error => console.log(error)
    );
  }

  handleFileInput(files: FileList) {
    for (var i = 0; i < files.length; i++) {
      var flag = true;
      for (var j = 0; j < this.chosenFiles.length; j++) {
        if (this.chosenFiles[j].name === files[i].name) {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.imageService.createAttach(files[i]).subscribe(
          (data) => {
            if(data.state === 1) {
              this.chosenFiles.push(data);    
            }
          },
            error => console.log(error)
        );
      }
    }
  }

  removeFile(file: File, i: number) {
    this.chosenFiles.splice(i, 1);
  }

  onSelectDep() {
    this.isDepReady = true;
    document.querySelector(".plusButton").classList.add('ready');
  }

  onSelect(e) {
    this.src = e;
    this.isImgChoosen = true;
  }

  onRemove() {
    this.isImgChoosen = false;
    this.isImgReady = false;
    this.checkProject();
  }

  saveImg() {
    var file = this.dataURLtoFile(this.src, 'a.png');
    
    this.imageService.uploadImage(file).subscribe(
      (data) => {
        this.image = data;
        this.src = data.imageLink;
        this.isImgReady = true;
        this.checkProject();
      },
      error => console.log(error)
    );
    this.checkProject();
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  checkProject() {
    if(this.name.length > 0 && this.description.length > 0 &&
      (<HTMLInputElement>document.getElementById('projectForm3')).value !== 'Menejerlar'
      && this.chosenDeps.length > 0 && this.isImgReady) {
        this.isProjectReady = true;
    } else {
      this.isProjectReady = false;
    }
  }
}