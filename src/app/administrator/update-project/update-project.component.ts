import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projectsService';
import { ProfileService } from '../../services/profileService';
import { MachineService } from '../../services/machineService';
import { ImageService } from '../../services/imageService';
import { DepartmentService } from '../../services/departmentService';
import { ProjectUtilService } from '../../services/projectUtilService';
import { ProjectDto } from '../../dto/projectDto';
import { ProjectEmployeeDto } from '../../dto/projectEmployeeDto';
import { UnitDto } from '../../dto/unitDto';
import { RawMaterialDto } from '../../dto/rawMaterialDto';
import { MachineDto } from '../../dto/machineDto';
import { ProjectEquipmentDto } from '../../dto/projectEquipmentDto';
import { AttachDto } from '../../dto/attachDto';
import { DeadlineDto } from '../../dto/deadlineDto';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
  providers: [ImageService, DepartmentService, ProjectUtilService, ProjectsService, ProfileService, MachineService]
})

export class UpdateProjectComponent implements OnInit {

  public projectId: number;
  public project: ProjectDto;
  public isSuperUser: Boolean;
  public isPm: Boolean;
  public employees;
  public units: Array<UnitDto>;
  public equipments: Array<MachineDto>;
  public allEmployees;
  public isEmpChosen: Boolean = false;
  public isMtrlReady: Boolean = false;
  public isEquipReady: Boolean = false;
  public hasDeadline: Boolean = false;
  public files: Array<AttachDto>;
  public salary: number = 0;
  public mtrlWholePrice: number = 0;
  public equipPrice: number = 0;
  public equipWholePrice: number = 0;
  public chosenUnit: UnitDto;
  public totalSalary: number;
  public totalRawMat: number;
  public totalMachine: number;
  public totalSum: number;
  public deadline: number;

  constructor(private router: Router, private projectUtilService: ProjectUtilService, private imgService: ImageService, private depService: DepartmentService, private machineService: MachineService, private activeRoute: ActivatedRoute, private projectService: ProjectsService, private profileService: ProfileService) {}

  ngOnInit() {
    this.activeRoute.params.forEach(params => {
      this.projectId = parseInt(params["projectId"]);
    });

    this.getProject();
    this.getEquipments();
  }

  getProject() {
    this.allEmployees = [];
    this.projectService.getProjectInfo(this.projectId).subscribe(
      (data) => {
        if (data.state !== -1) {
          this.project = data;
          this.isPm = data.isPm;
          this.isSuperUser = data.isCeo;
          this.getAttachedFiles();
          this.getPossibleEmployees();
          this.countSalaries();
        }
      },
      error => console.log(error)
    );
  }

  getPossibleEmployees() {
    this.employees = [];
    for(var i=0; i<this.project.projectDeps.length; i++) {
      this.depService.getEngineersOfDepartment(this.project.projectDeps[i].department.id).subscribe(
        (data) => {
          if(data.length > 0) {
            this.employees.push.apply(this.employees, data);
            this.allEmployees.push.apply(this.allEmployees, data);
          }
        },
        error => console.log(error)
      );
    }
    this.getUnits();
  }

  getAttachedFiles() {
    this.files = [];
    this.imgService.getAllAttachs(this.projectId).subscribe(
      (data) => {
        if(data.length > 0) {
          this.files = data;
        }
      },
      error => console.log(error)
    );
  }

  getUnits() {
    this.units = [];
    this.projectService.getUnits().subscribe(
      (data) => {
        this.units = data;
        this.chosenUnit = data[0];
      },
      error => console.log(error)
    );
  }

  getEquipments() {
    this.machineService.getMachines().subscribe(
      (data) => {
        this.equipments = data;
      },
      error => console.log(error)
    );
  }

  onChangeUnit() {
    for(var i=0; i<this.units.length; i++) {
      if(this.units[i].id === parseInt((<HTMLInputElement>document.getElementById('chooseUnitToMtrl')).value)) {
        this.chosenUnit = this.units[i];
        break;
      }
    }
  }

  checkMtrlWholePrice() {
    if((<HTMLInputElement>document.getElementById('MtrlCount')).value && (<HTMLInputElement>document.getElementById('MtrlPrice')).value) {
      this.mtrlWholePrice = parseInt((<HTMLInputElement>document.getElementById('MtrlCount')).value) * parseInt((<HTMLInputElement>document.getElementById('MtrlPrice')).value);
    }
    if((<HTMLInputElement>document.getElementById('MtrlName')).value && (<HTMLInputElement>document.getElementById('MtrlCount')).value && (<HTMLInputElement>document.getElementById('MtrlPrice')).value) {
      this.isMtrlReady = true;
    } else {
      this.isMtrlReady = false;
    }
  }

  onDepChange() {
    if ((<HTMLInputElement>document.getElementById('chooseDepToPro')).value !== "Bo'limlar") {
      this.getSortedEmployees(parseInt((<HTMLInputElement>document.getElementById('chooseDepToPro')).value));
    } else {
      this.employees = [];
      this.employees.push.apply(this.employees, this.allEmployees);
    }
  }

  onEquipChange() {
    if((<HTMLInputElement>document.getElementById('chooseEquipToPro')).value !== 'Jihozlar') {
      for(var i=0; i<this.equipments.length; i++) {
        if(this.equipments[i].id === parseInt((<HTMLInputElement>document.getElementById('chooseEquipToPro')).value)) {
          this.equipPrice =  this.equipments[i].ph;
          break;
        }
      }
      if ((<HTMLInputElement>document.getElementById('equipHour')).value) {
        this.equipWholePrice = this.equipPrice * parseInt((<HTMLInputElement>document.getElementById('equipHour')).value);
        this.isEquipReady = true;
      } else {
        this.isEquipReady = false;
        this.equipWholePrice = null;
      }
    } else {
      this.equipPrice = null;
      this.equipWholePrice = null;
      this.isEquipReady = false;
    }
  }

  getSortedEmployees(id: number) {
    this.employees = [];
    this.depService.getEngineersOfDepartment(id).subscribe(
      (data) => {
        if(data.length > 0) {
          this.employees.push.apply(this.employees, data);
        }
      },
      error => console.log(error)
    );
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.id).subscribe(
      (data) => {
        if(data.state === 1) {
          this.router.navigate(["./projects/new-planned-projects"]);
        }
      },
      error => console.log(error)
    );
  }

  saveNewEmp() {
    var projectEmp = new ProjectEmployeeDto();
    projectEmp.profileId = parseInt((<HTMLInputElement>document.getElementById('addEmpToPro')).value);
    projectEmp.projectId = this.project.id;
    projectEmp.salary = this.salary;
    this.projectService.addEmployee(projectEmp).subscribe(
      (data) => {
        if (data.state === 1) {
          (<HTMLInputElement>document.getElementById('addEmpToPro')).value = "Hodimlar";
          (<HTMLInputElement>document.getElementById('chooseDepToPro')).value = "Bo'limlar";
          this.salary = 0;
          this.isEmpChosen = false;
          this.getProject();
        }
      },
      error => console.log(error)
    );
  }

  deleteEmployee(id: number) {
    this.projectService.deleteEmployee(id).subscribe(
      (data) => {
        if(data.state === 1) {
          this.getProject();
        }
      },
      error => console.log(error)
    );
  }

  saveNewMtrl() {
    var material = new RawMaterialDto();
    material.projectId = this.project.id;
    material.name = (<HTMLInputElement>document.getElementById('MtrlName')).value;
    material.count = parseInt((<HTMLInputElement>document.getElementById('MtrlCount')).value);
    material.price = parseInt((<HTMLInputElement>document.getElementById('MtrlPrice')).value);
    material.link = (<HTMLInputElement>document.getElementById('MtrlLink')).value;
    material.unit = this.chosenUnit;
    this.projectService.addRawMaterial(material).subscribe(
      (data) => {
        if (data.state === 1) {
          (<HTMLInputElement>document.getElementById('MtrlName')).value = null;
          (<HTMLInputElement>document.getElementById('MtrlCount')).value = null;
          (<HTMLInputElement>document.getElementById('MtrlPrice')).value = null;
          (<HTMLInputElement>document.getElementById('MtrlLink')).value = null;
          this.mtrlWholePrice = 0;
          this.chosenUnit = this.units[0];
          this.isMtrlReady = false;
          this.getProject();
        }
      },
      error => console.log(error)
    );
  }

  deleteMaterial(id: number) {
    this.projectService.deleteRawMaterial(id).subscribe(
      (data) => {
        if(data.state === 1) {
          this.getProject();
        }
      },
      error => console.log(error)
    );
  }

  saveDeadline() {
    var newDealine = new DeadlineDto();
    newDealine.id = this.project.id;
    newDealine.deadline = this.deadline;

    this.projectService.updateDeadline(newDealine).subscribe(
      (data) => {
        if (data.state === 1) {
          this.getProject();
        }
      },
      error => console.log(error)
    );

    this.hasDeadline = true;
  }

  saveNewEquip() {
    var equipment = new ProjectEquipmentDto();
    equipment.equipment = new MachineDto();
    equipment.projectId = this.project.id;
    equipment.equipment.id = parseInt((<HTMLInputElement>document.getElementById('chooseEquipToPro')).value);
    equipment.workHour = parseInt((<HTMLInputElement>document.getElementById('equipHour')).value);
    this.projectService.addEquipment(equipment).subscribe(
      (data) => {
        if (data.state === 1) {
          (<HTMLInputElement>document.getElementById('chooseEquipToPro')).value = 'Jihozlar';
          (<HTMLInputElement>document.getElementById('equipHour')).value = null;
          this.equipPrice = null;
          this.equipWholePrice = null;
          this.chosenUnit = this.units[0];
          this.isEquipReady = false;
          this.getProject();
        }
      },
      error => console.log(error)
    );
  }

  deleteEquipment(id: number) {
    this.projectService.deleteEquipment(id).subscribe(
      (data) => {
        if(data.state === 1) {
          this.getProject();
        }
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

  onEmpChange() {
    if((<HTMLInputElement>document.getElementById('addEmpToPro')).value !== "Hodimlar") {
      this.isEmpChosen = true;
    } else {
      this.isEmpChosen = false;
    }
  }

  countSalaries() {
    this.totalMachine = 0;
    this.totalRawMat = 0;
    this.totalSalary = 0;
    for(var i=0; i<this.project.projectEmps.length; i++) {
      this.totalSalary += this.project.projectEmps[i].salary;
    }
    for(var j=0; j<this.project.rawMaterials.length; j++) {
      this.totalRawMat += (this.project.rawMaterials[j].count * this.project.rawMaterials[j].price);
    }
    for(var k=0; k<this.project.projectEquips.length; k++) {
      this.totalMachine += this.project.projectEquips[k].workHour * this.project.projectEquips[k].equipment.ph;
    }
    this.totalSum = this.totalSalary + this.totalRawMat +  this.totalMachine;
  }

  startProject() {
    this.projectUtilService.startProject(this.project.id).subscribe(
      (data) => {
        this.router.navigate(["./projects/in-process-projects"]);
      },
      error => console.log(error)
    );
  }

  projectReady() {
    this.projectUtilService.pmAcceptProject(this.project.id).subscribe(
      (data) => {
        if (data.state === 1) {
          this.router.navigate(["./projects/in-process-projects"]);
        }
      },
      error => console.log(error)
    );
  }
}