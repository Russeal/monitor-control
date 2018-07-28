import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profileService';
import { ProjectDto } from '../../../dto/projectDto';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
  providers: [ProfileService]
})
export class MyProjectsComponent implements OnInit {

  public projects: Array<ProjectDto>;
    
  constructor(private profileService: ProfileService) {
    this.projects = [];
  }

  ngOnInit() {
    this.getProjectList();
  }

  private getProjectList() {
    this.profileService.getMyProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      error => console.log(error)
    );
  }
}