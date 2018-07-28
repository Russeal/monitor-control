import { Component, OnInit } from '@angular/core';
import { CentersService } from '../../services/centersService';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss'],
  providers: [ CentersService ]
})
export class CentersComponent implements OnInit {

  public centers;
  
  constructor(private centerService: CentersService) {
  }

  ngOnInit() {
    this.getCentersList();
  }

  getCentersList() {
    this.centerService.getCenters().subscribe(
      (data) => {
        this.centers = data;
      },
      error => console.log(error)
    );
  }
}