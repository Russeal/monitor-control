import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from '../../../services/departmentService';

@Component({
  selector: 'app-department-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss'],
  providers: [DepartmentService]
})

export class DepartmentItemComponent implements OnInit {

  @Input() department;
  public engineersCount: number;

  constructor(private depService: DepartmentService) { }

  ngOnInit() {
    this.getDepartment();
  }

  getDepartment() {
    this.depService.getEngineersCountOfDepartment(this.department.id).subscribe(
      data => this.engineersCount = data.value,
      error => console.log(error)
    );
  }
}