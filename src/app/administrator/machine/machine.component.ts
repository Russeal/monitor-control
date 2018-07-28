import { Component, OnInit } from '@angular/core';
import { MachineDto } from '../../dto/machineDto';
import { MachineService } from '../../services/machineService';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
  providers: [ MachineService ]
})
export class MachineComponent implements OnInit {

  public newMachine: string = '';
  public price: number;
  public isEditing: boolean = false;
  public machines: Array<MachineDto>;
  public editingMachine: MachineDto;

  constructor(private machineService: MachineService) {
    this.machines = [];
  }

  ngOnInit() {
    this.getMachines();
  }

  private getMachines() {
    this.machineService.getMachines().subscribe(
      (data) => {
        this.machines = data;
      },
      error => console.log(error)
    );
  }

  saveNewMachine() {
    var machine = new MachineDto;
    machine.name = this.newMachine;
    machine.ph = this.price;
    
    this.machineService.createMachine(machine).subscribe(
      (data) => {
        if(data.state === 1) {
          this.getMachines();
        }
      },
      error => console.log(error)
    );

    this.newMachine = '';
    this.price = null;
  }

  editMachine(id) {
    this.isEditing = true;
    this.machineService.getMachine(id).subscribe(
      (data) => {
        if(data.state === 1) {
          this.editingMachine = data;
        }
      },
      error => console.log(error)
    );
  }

  deleteMachine(id) {
    this.machineService.deleteMachine(id).subscribe(
      (data) => {
          this.getMachines();
      },
      error => console.log(error)
    );
  }

  saveEdited() {
    this.machineService.updateMachine(this.editingMachine).subscribe(
      (data) => {
        this.isEditing = false;
        this.editingMachine = null;
        this.getMachines();
      },
      error => console.log(error)
    );
  }

  cancelEditing() {
    this.isEditing = false;
    this.editingMachine = null;
  }
}