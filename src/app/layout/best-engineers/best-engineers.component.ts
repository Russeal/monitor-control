import { Component, OnInit } from '@angular/core';
import { EngineersService } from '../../services/engineerService';
import { ProjectsService } from '../../services/projectsService';
import { ProfileDto } from '../../dto/profileDto';
import { ProjectDto } from '../../dto/projectDto';

@Component({
  selector: 'app-best-engineers',
  templateUrl: './best-engineers.component.html',
  styleUrls: ['./best-engineers.component.scss'],
  providers: [EngineersService, ProjectsService]
})
export class BestEngineersComponent implements OnInit {

  public bestEngineers: Array<ProfileDto>;
  public bestProjects: Array<ProjectDto>;

  constructor(private engineersService: EngineersService, private projectsService: ProjectsService) {
    this.bestEngineers = [];
    this.bestProjects = [];
  }

  ngOnInit() {
    // this.getBestEngineersList();
    // this.getBestProjectsList();
  }

  // getBestEngineersList() {
  //   this.bestEngineers = this.engineersService.getBestEngineers();
  // }

  // getBestProjectsList() {
  //   this.bestProjects = this.projectsService.getBestProjects();
  // }
}
