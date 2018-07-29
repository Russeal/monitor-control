import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../services/positionService';
import { PositionDto } from '../../dto/positionDto';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [PositionService]
})
export class PositionComponent implements OnInit {

  public newPos: string = '';
  public editingPos: PositionDto;
  public positions;
  public isEditing: Boolean = false;

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.getPositions();
  }

  getPositions() {
    this.positionService.getPositions().subscribe(
      (data) => {
        this.positions = data;
      },
      error => console.log(error)
    );
  }

  saveNewPos() {
    var position = new PositionDto;
    position.name = this.newPos;
    this.positionService.createPosition(position).subscribe(
      (data) => {
        this.newPos = '';
        this.getPositions();
      },
      error => console.log(error)
    );
  }

  editPosition(id: number) {
    document.querySelector('.inputField').classList.add('editing');
    this.isEditing = true;
    this.positionService.getPosition(id).subscribe(
      (data) => {
        this.editingPos = data;
      },
      error => console.log(error)
    );
  }

  deletePos(id: number) {
    this.positionService.deletePosition(id).subscribe(
      (data) => {
        this.getPositions();
      },
      error => console.log(error)
    );
  }

  saveEdited() {
    this.positionService.updatePosition(this.editingPos).subscribe(
      (data) => {
        this.isEditing = false;
        document.querySelector('.editing').classList.remove('editing');
        this.getPositions();
      },
      error => console.log(error)
    );
  }

  cancelEditing() {
    this.isEditing = false;
    document.querySelector('.editing').classList.remove('editing');
  }
}