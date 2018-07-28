import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-center-item',
  templateUrl: './center-item.component.html',
  styleUrls: ['./center-item.component.scss']
})
export class CenterItemComponent implements OnInit {

  @Input() center;

  constructor() { }

  ngOnInit() {
  }

}
