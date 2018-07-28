import { Component, OnInit } from '@angular/core';
import { ProjectUtilService } from '../../../services/projectUtilService';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [ProjectUtilService]
})
export class ProjectListComponent implements OnInit {

  public projects;

  constructor(private projectUtilService: ProjectUtilService) {
    this.projects = [];
  }

  ngOnInit() {
    this.getProjectList();
  }

  private getProjectList() {
    this.projectUtilService.getFinishedProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log(data);
      },
      error => console.log(error)
    );
  }
}