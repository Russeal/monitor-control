import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../services/departmentService';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss'],
  providers: [DepartmentService]
})

export class DepartmentDetailComponent implements OnInit {

  public depId;
  public department;
  public engineers;
  public liveProjects;
  public finishedProjects;
  public isSuperUser: Boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private depService: DepartmentService) { }

  ngOnInit() {
    this.activeRoute.params.forEach(params => {
      this.depId = parseInt(params["department"]);
    });

    this.getDepartment();
    this.getProjects();

    if (localStorage.getItem('userType') === 'super_user') {
      this.isSuperUser = true;
    }
    
    if(window.innerWidth < 1200) {
      setTimeout(() => {
        document.querySelector('.infEngineers').classList.add('row');
      }, 300);
    }
  }

  getDepartment() {
    this.depService.getDepartmentInfo(this.depId).subscribe(
      (data) => {
        this.department = data;
        this.getEngineers();
      },
      error => console.log(error)
    );
  }

  getEngineers() {
    this.depService.getEngineersOfDepartment(this.depId).subscribe(
      (data) => {
        this.engineers = data;
      },
      error => console.log(error)
    );
  }

  deleteDepartment() {
    this.depService.deleteDepartment(this.depId).subscribe(
      (data) => {
        this.router.navigate(['departments']);
      },
      error => console.log(error)
    );
  }

  getProjects() {
    this.liveProjects = this.depService.getOngoingProjects(this.depId);
    this.finishedProjects = this.depService.getFinishedProjects(this.depId);
  }
}