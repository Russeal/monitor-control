import { Component, OnInit } from '@angular/core';
import { ProjectUtilService } from '../../../services/projectUtilService';

@Component({
  selector: 'app-in-approving-projects',
  templateUrl: './in-approving-projects.component.html',
  styleUrls: ['./in-approving-projects.component.scss'],
  providers: [ProjectUtilService]
})
export class InApprovingProjectsComponent implements OnInit {

  public projects;

  constructor(private projectUtilService: ProjectUtilService) {
    this.projects = [];
  }

  ngOnInit() {
    this.getProjectList();
  }

  private getProjectList() {
    this.projectUtilService.getInApprovingProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      error => console.log(error)
    );
  }
}