import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projectsService';
import { DepartmentService } from '../../services/departmentService';
import { CentersService } from '../../services/centersService';
import { ImageService } from '../../services/imageService';
import { ProjectDto } from '../../dto/projectDto';
import { DepartmentDto } from '../../dto/departmentDto';
import { fail } from 'assert';
import { ProfileDto } from '../../dto/profileDto';
import { AttachDto } from '../../dto/attachDto';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
  providers: [CentersService, DepartmentService, ProjectsService, ImageService]
})
export class EditProjectComponent implements OnInit {

  public projectId: number;
  public project: ProjectDto;
  public name: string;
  public description: string;
  public src: string;
  public srcName: string;
  public isImgChosen: Boolean = false;
  public isImgReady: Boolean = false;
  public chosenDeps: Array<DepartmentDto>;
  public chosenFiles: Array<AttachDto>;
  public attachs: Array<AttachDto>;
  public departments: Array<DepartmentDto>;
  public managers: Array<ProfileDto>;
  public chosenPM: ProfileDto;
  public isProjectReady: Boolean = false;
  public isDepReady: Boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private projectService: ProjectsService, private imageService: ImageService, private centerService: CentersService, private depService: DepartmentService) {
    this.chosenFiles = [];
    this.attachs = [];
    this.managers = [];
  }

  ngOnInit() {
    this.activeRoute.params.forEach(params => {
      this.projectId = parseInt(params["projectId"]);
    });

    this.getProject();
    this.getManagers();

    setTimeout(() => {
      document.getElementById('uploadImg7').style.height = document.getElementById('uploadImg7').offsetWidth*2/3 + 'px';
    }, 1000);
  }

  private getProject() {
    this.chosenDeps = [];
    this.projectService.getProjectInfo(this.projectId).subscribe(
      (data) => {
        this.project = data;
        if (data.imgLink) {
          this.src = data.imgLink;
          this.isImgChosen =true;
          this.isImgReady= true;
        }
        this.name = data.name;
        this.description = data.description;
        for(var i=0; i<data.projectDeps.length; i++) {
          this.chosenDeps.push(data.projectDeps[i].department);
        }
        this.chosenPM = data.profile;
        this.getDepartments();
        this.getAttachedFiles();
      },
      error => console.log(error)
    );
    setTimeout(() => {
      this.checkProject();
    }, 1000);
  }

  private getDepartments() {
    this.departments = [];
    this.depService.getDepartments().subscribe(
      (data) => {
        for(var i=0; i<data.length; i++) {
          var flag = true;
          for( var j=0; j<this.chosenDeps.length; j++) {
            if(data[i].id === this.chosenDeps[j].id) {
              flag = false;
            }
          }
          if(flag) {
            this.departments.push(data[i]);
          }
        }
      },
      error => console.log(error)
    );
  }

  private getManagers() {
    this.centerService.getDepartmentManagers().subscribe(
      (data) => {
        if (data.length > 0) {
          this.managers = data;
        }
      },
      error => console.log(error)
    );
  }

  private getAttachedFiles() {
    this.chosenFiles = [];
    this.imageService.getAllAttachs(this.project.id).subscribe(
      (data) => {
        if(data.length > 0) {
          this.chosenFiles = data;
        }
      },
      error => console.log(error)
    );
  }

  onSelectDep() {
    this.isDepReady = true;
    document.querySelector(".plusButton").classList.add('ready');
  }

  addDepartment() {
    var dep = parseInt((<HTMLInputElement>document.getElementById("proEditForm4")).value);
    for(var i=0; i<this.departments.length; i++) {
      if(this.departments[i].id === dep) {
        var proj = new ProjectDto();
        proj.id = this.project.id;
        proj.dId = dep;
        this.projectService.addDepartment(proj).subscribe(
          (data) => {
            if(data.state === 1) {
              this.getProject();
            }
          },
          error => console.log(error)
        );
        break;
      }
    }
    this.isDepReady = false;
    document.querySelector(".ready").classList.remove('ready');
    (<HTMLInputElement>document.getElementById('proEditForm4')).value = "Bo'limlar";
    this.checkProject();
  }

  onSelect(e) {
    this.src = e;
    this.isImgChosen = true
  }

  saveImg() {
    this.isImgReady = true;
    var file = this.dataURLtoFile(this.src, 'a.png');
    
    this.imageService.uploadImage(file).subscribe(
      (data) => {
        this.src = data.imageLink;
        this.srcName = data.imageName;
        this.updateProjectImg();
      },
      error => console.log(error)
    );
  }

  updateProjectImg() {
    // proyektni imageini update qiladigan funksiya
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  onRemove() {
    this.isImgReady = false;
    this.isImgChosen = false;
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
            this.addAttachToProject(data);
          },
            error => console.log(error)
        );
      }
    }
  }

  private addAttachToProject(attach: AttachDto) {
    var newAttach = new AttachDto();
    newAttach.id = attach.id;
    newAttach.projectId = this.project.id;

    this.imageService.addAttach(newAttach).subscribe(
      (data) => {
        if (data.state === 1) {
          this.chosenFiles.push(attach);
        }
      },
        error => console.log(error)
    );
  }

  removeFile(file: AttachDto, i: number) {
    this.imageService.deleteAttach(file.id).subscribe(
      (data) => {
        if (data.state === 1) {
          this.chosenFiles.splice(i, 1);
        }
      },
      error => console.log(error)
    );
  }

  checkProject() {
    if(this.isImgReady && this.name.length > 3 && this.description.length > 3 && (<HTMLInputElement>document.getElementById('proEditForm3')).value !== 'Menejerlar' && this.chosenDeps.length > 0) {
      this.isProjectReady = true;
    } else {
      this.isProjectReady = false;
    }
  }

  saveProject() {
    var project = new ProjectDto();
    project.profile = new ProfileDto();
    project.id = this.project.id;
    project.name = this.name;
    project.description = this.description;
    project.profile.id = (<HTMLInputElement>document.getElementById('proEditForm3')).value;
    project.attachs = this.chosenFiles;

    this.projectService.updateProject(project).subscribe(
      (data) => {
        if (data.state === 1) {
          this.router.navigate(["./projects/new-planned-projects/" + this.project.id]);
        }
      },
      error => console.log(error)
    );
  }

  removeDepartment(dep: DepartmentDto) {
    for(var i=0; i<this.project.projectDeps.length; i++) {
      if(this.project.projectDeps[i].department.id === dep.id) {
        this.projectService.deleteDepartment(this.project.projectDeps[i].id).subscribe(
          (data) => {
            if(data.state === 1) {
              this.getProject();
            }
          },
          error => console.log(error)
        );
        break;
      }
    }
  }
}