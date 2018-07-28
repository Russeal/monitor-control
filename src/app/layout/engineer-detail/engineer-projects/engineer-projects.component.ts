import { Component, OnInit,Input } from '@angular/core';
import { ProfileService } from '../../../services/profileService';
import { ProjectDto } from '../../../dto/projectDto';

@Component({
  selector: 'app-engineer-projects',
  templateUrl: './engineer-projects.component.html',
  styleUrls: ['./engineer-projects.component.scss'],
  providers: [ProfileService]
})
export class EngineerProjectsComponent implements OnInit {

  @Input() profileId;
  public projects: Array<ProjectDto>;

  constructor(private profileService: ProfileService) {
    this.projects = [];
  }

  ngOnInit() {
    this.getProjectList();
  }

  private getProjectList() {
    this.profileService.getProfileProjects(this.profileId).subscribe(
      (data) => {
        this.projects = data;
      },
      error => console.log(error)
    );
  }
}