import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentersService } from '../../services/centersService';

@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.scss'],
  providers: [CentersService]
})

export class CenterDetailComponent implements OnInit {
  
  public centerId;
  public center;
  public departments;
  public engineerCount;
  public isSuperUser: boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private centerService: CentersService) {
  }

  ngOnInit() {
    this.activeRoute.params.forEach(params => {
      this.centerId = parseInt(params["markaz"]);
    });

    this.getCenter();
    if(localStorage.getItem('userType') === 'super_user'){
      this.isSuperUser = true;
    }
    
    if(window.innerWidth < 1200) {
      setTimeout(() => {
        document.querySelector('.minInfDeps').classList.add('row');
      }, 300);
    }
  }

  getCenter() {
    this.centerService.getCenterInfo(this.centerId).subscribe(
      (data) => {
        if (data.state === 1) {
          this.center = data;
          this.getDepartments();
          this.getEngineersCount();
        }
      },
      error => console.log(error)
    );
  }

  getDepartments() {
    this.centerService.getDepartmentsOfCenter(this.centerId).subscribe(
      (data) => {
        this.departments = data;
      },
      error => console.log(error)
    );
  }

  getEngineersCount() {
    this.centerService.getEngineersCountOfCenter(this.centerId).subscribe(
      (data) => {
        if(data.state === 1)
          this.engineerCount = data.value;
      },
      error => console.log(error)
    );
  }

  deleteCenter() {
    this.centerService.deleteCenter(this.centerId).subscribe(
      (data) => {
        this.router.navigate(['markazlar']);
      },
      error => console.log(error)
    );
  }

  addClass(e) {
    e.target.classList.add('bounce-to-right');
  }

  removeClass(e) {
    e.target.classList.remove('bounce-to-right');
  }
}