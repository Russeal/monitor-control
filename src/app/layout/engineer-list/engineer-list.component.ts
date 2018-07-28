import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profileService';

@Component({
  selector: 'app-engineer-list',
  templateUrl: './engineer-list.component.html',
  styleUrls: ['./engineer-list.component.scss'],
  providers: [ProfileService]
})
export class EngineerListComponent implements OnInit {

  public engineers;
  
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getProfilesList();
  }

  private getProfilesList() {
    this.profileService.getEmployees().subscribe(
      (data) => {
        this.engineers = data;
      },
      error => console.log(error)
    );
  }
}
