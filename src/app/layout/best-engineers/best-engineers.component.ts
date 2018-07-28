import { Component, OnInit } from '@angular/core';
import { EngineersService } from '../../services/engineerService';
import { ProjectsService } from '../../services/projectsService';

@Component({
  selector: 'app-best-engineers',
  templateUrl: './best-engineers.component.html',
  styleUrls: ['./best-engineers.component.scss'],
  providers: [EngineersService, ProjectsService]
})
export class BestEngineersComponent implements OnInit {

  public bestEngineers;
  public bestProjects;

  constructor(private engineersService: EngineersService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getBestEngineersList();
    this.getBestProjectsList();
  }

  getBestEngineersList() {
    this.bestEngineers = this.engineersService.getBestEngineers();
  }

  getBestProjectsList() {
    this.bestProjects = this.projectsService.getBestProjects();
  }
}
