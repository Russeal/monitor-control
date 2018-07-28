import { Component, OnInit, Input } from '@angular/core';
import { ProfileDto } from '../../../dto/profileDto';

@Component({
  selector: 'app-one-engineer',
  templateUrl: './one-engineer.component.html',
  styleUrls: ['./one-engineer.component.scss']
})
export class OneEngineerComponent implements OnInit {

  @Input() engineer: ProfileDto;
  public skills;

  constructor() {
    this.skills = [];
  }

  ngOnInit() {
    if(this.engineer.skills) {
      this.skills = this.engineer.skills.split(',');
    }
  }
}