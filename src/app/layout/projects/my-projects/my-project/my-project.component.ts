import { Component, OnInit, Input } from '@angular/core';
import { ProjectDto } from '../../../../dto/projectDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.scss']
})
export class MyProjectComponent implements OnInit {

  @Input() project: ProjectDto;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public moveToProject() {
    switch (this.project.projectState.stateNumber) {
      case 1:
      this.router.navigate(["./projects/in-process-projects/" + this.project.id]);
      break;

      case 2:
      this.router.navigate(["./projects/new-planned-projects/" + this.project.id]);
      break;

      case 3:
      this.router.navigate(["./projects/in-process-projects/" + this.project.id]);
      break;
      
      case 4:
      this.router.navigate(["./projects/in-approval-projects/" + this.project.id]);
      break
      
      case 5:
      this.router.navigate(["./projects/" + this.project.id]);
      break
    
      default:
      break;
    }
  }
}