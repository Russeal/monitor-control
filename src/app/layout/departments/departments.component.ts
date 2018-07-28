import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/departmentService';
import { CentersService } from '../../services/centersService';
import { DepartmentDto } from '../../dto/departmentDto';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  providers: [ DepartmentService, CentersService ]
})
export class DepartmentsComponent implements OnInit {

  public departments;
  public allDeps;
  public centers;

  constructor(private departmentService: DepartmentService, private centersService: CentersService) { }

  ngOnInit() {
    this.getDepartmentsList();
    this.getCenterList();
  }

  getDepartmentsList() {
    this.departmentService.getDepartments().subscribe(
      (data) => {
        this.allDeps = data;
        this.departments = data;
      },
      error => console.log(error)
    );
  }

  getCenterList() {
    this.centersService.getCenters().subscribe(
      (data) => {
        this.centers = data;
      },
      error => console.log(error)
    );
  }

  getDepListByCenter(centerId, e) {
    document.querySelector('.active2').classList.remove('active2');
    e.target.classList.add('active2');
    this.departments = [];
    for(var i = 0; i < this.allDeps.length; i++) {
      if (this.allDeps[i].center.id === centerId) {
        this.departments.push(this.allDeps[i]);
      }
    }
  }

  getAllDeps(e) {
    document.querySelector('.active2').classList.remove('active2');
    e.target.classList.add('active2');
    this.departments = this.allDeps;
  }
}