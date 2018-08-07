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
  private chosenId: number;

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
    position.name = this.newPos.trim();
    this.positionService.createPosition(position).subscribe(
      (data) => {
        if (data.state === 1) {
          this.newPos = '';
          this.getPositions();
        }
      },
      (error) => {
        if (error.error.state === -1 && error.error.errMsg === "This name already exists, please choose another name.") {
          document.getElementById("errModal11").click();
          this.newPos = '';
        }
      }
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
    this.chosenId = id;
    document.getElementById("delPos1").click();
  }

  delPosition() {
    if (this.chosenId) {
      this.positionService.deletePosition(this.chosenId).subscribe(
        (data) => {
          this.chosenId = null;
          document.getElementById("closeDelPos").click();
          this.getPositions();
        },
        error => console.log(error)
      );
    }
  }

  saveEdited() {
    this.positionService.updatePosition(this.editingPos).subscribe(
      (data) => {
        if (data.state === 1) {
          this.isEditing = false;
          document.querySelector('.editing').classList.remove('editing');
          this.getPositions();
        }
      },
      (error) => {
        if (error.error.state === -1 && error.error.errMsg === "This name already exists, please choose another name.") {
          document.getElementById("errModal11").click();
        }
      }
    );
  }

  cancelEditing() {
    this.isEditing = false;
    document.querySelector('.editing').classList.remove('editing');
  }
}