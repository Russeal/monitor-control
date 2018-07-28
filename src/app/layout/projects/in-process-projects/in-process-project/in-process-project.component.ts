import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../../services/projectsService';
import { ProjectDto } from '../../../../dto/projectDto';
import { ProjectUtilService } from '../../../../services/projectUtilService';
import { StateTreeDto } from '../../../../dto/stateTreeDto';
import { ProfileService } from '../../../../services/profileService';
import { ProfileDto } from '../../../../dto/profileDto';

@Component({
  selector: 'app-in-process-project',
  templateUrl: './in-process-project.component.html',
  styleUrls: ['./in-process-project.component.scss'],
  providers: [ ProjectsService, ProjectUtilService, ProfileService ]
})
export class InProcessProjectComponent implements OnInit {
  
  public projectId: number;
  public project: ProjectDto;
  public isPM: Boolean = false;
  public emps: Array<ProfileDto>;
  
  constructor(private activeRoute: ActivatedRoute, private router: Router,
              private profileService: ProfileService,
              private projectService: ProjectsService,
              private projectUtilService: ProjectUtilService) {
  }

  ngOnInit() {
    this.activeRoute.params.forEach(param => {
      this.projectId = parseInt(param["id"]);
    });
    
    this.getProject();
  }

  private getProject() {
    this.projectService.getProjectInfo(this.projectId).subscribe(
      (data) => {
        if (data.state === 1) {
          this.project = data;
          this.isPM = data.isPm;
          this.getProjectEmployees();
          console.log(data);
          this.getProjectStateTree();
        }
      },
      error => console.log(error)
    );
  }

  private getProjectStateTree() {
    this.projectUtilService.getPSTree(this.projectId).subscribe(
      (data) => {
        document.getElementById("state" + data[data.length-1].stateNumber).classList.remove("btn-info");
        document.getElementById("state" + data[data.length-1].stateNumber).classList.add("btn-danger");
      },
      error => console.log(error)
    );
  }

  submitProject() {
    this.projectUtilService.finalApprove(this.project.id).subscribe(
      (data) => {
        if (data.state === 1) {
          this.router.navigate(["./projects/in-approval-projects"]);
        }
      },
      error => console.log(error)
    );
  }

  private getProjectEmployees() {
    this.projectService.getProjectEmployees(this.project.id).subscribe(
      (data) => {
        this.emps = data;
      },
      error => console.log(error)
    );
  }

  addClass(e) {
    e.target.classList.add('bounce-to-right');
  }

  removeClass(e) {
    e.target.classList.remove('bounce-to-right');
  }
}