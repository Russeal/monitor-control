import { Component, OnInit } from '@angular/core';
import { ProjectUtilService } from '../../../services/projectUtilService';

@Component({
  selector: 'app-planning-projects',
  templateUrl: './planning-projects.component.html',
  styleUrls: ['./planning-projects.component.scss'],
  providers: [ProjectUtilService]
})
export class PlanningProjectsComponent implements OnInit {

  public projects;

  constructor(private projectUtilService: ProjectUtilService) {
    this.projects = [];
  }

  ngOnInit() {
    this.getProjectList();
  }

  private getProjectList() {
    this.projectUtilService.getPlanningProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      error => console.log(error)
    );
  }
}