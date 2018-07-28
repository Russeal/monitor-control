import { Component, OnInit } from '@angular/core';
import { ProjectUtilService } from '../../../services/projectUtilService';

@Component({
  selector: 'app-in-process-projects',
  templateUrl: './in-process-projects.component.html',
  styleUrls: ['./in-process-projects.component.scss'],
  providers: [ProjectUtilService]
})
export class InProcessProjectsComponent implements OnInit {

  public projects;

  constructor(private projectUtilService: ProjectUtilService) {
    this.projects = [];
  }

  ngOnInit() {
    this.getProjectList();
  }

  private getProjectList() {
    this.projectUtilService.getInProcessProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log(data);
      },
      error => console.log(error)
    );
  }
}