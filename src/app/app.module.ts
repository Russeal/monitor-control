import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-Routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxImgModule } from 'ngx-img';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LogInComponent } from './layout/log-in/log-in.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectListComponent } from './layout/projects/project-list/project-list.component';
import { ProjectItemComponent } from './layout/projects/project-list/project-item/project-item.component';
import { ProfileComponent } from './engineer/profile/profile.component';
import { EngineerListComponent } from './layout/engineer-list/engineer-list.component';
import { OneEngineerComponent } from './layout/engineer-list/one-engineer/one-engineer.component';
import { CentersComponent } from './layout/centers/centers.component';
import { CenterItemComponent } from './layout/centers/center-item/center-item.component';
import { DepartmentsComponent } from './layout/departments/departments.component';
import { DepartmentItemComponent } from './layout/departments/department-item/department-item.component';
import { AddCenterComponent } from './administrator/add-center/add-center.component';
import { EditCenterComponent } from './administrator/edit-center/edit-center.component';
import { CenterDetailComponent } from './layout/center-detail/center-detail.component';
import { BestEngineersComponent } from './layout/best-engineers/best-engineers.component';
import { AddDepartmentComponent } from './administrator/add-department/add-department.component';
import { EditDepartmentComponent } from './administrator/edit-department/edit-department.component';
import { DepartmentDetailComponent } from './layout/department-detail/department-detail.component';
import { EngineerDetailComponent } from './layout/engineer-detail/engineer-detail.component';
import { AddEngineerComponent } from './administrator/add-engineer/add-engineer.component';
import { EditEngineerComponent } from './administrator/edit-engineer/edit-engineer.component';
import { PositionComponent } from './administrator/position/position.component';
import { EditProfileComponent } from './engineer/edit-profile/edit-profile.component';
import { CreateProjectComponent } from './administrator/create-project/create-project.component';
import { MachineComponent } from './administrator/machine/machine.component';
import { UpdateProjectComponent } from './administrator/update-project/update-project.component';
import { PlanningProjectsComponent } from './layout/projects/planning-projects/planning-projects.component';
import { ProjectDetailComponent } from './layout/projects/project-detail/project-detail.component';
import { EditProjectComponent } from './administrator/edit-project/edit-project.component';
import { InProcessProjectsComponent } from './layout/projects/in-process-projects/in-process-projects.component';
import { InApprovingProjectsComponent } from './layout/projects/in-approving-projects/in-approving-projects.component';
import { InProcessProjectComponent } from './layout/projects/in-process-projects/in-process-project/in-process-project.component';
import { InApprovingProjectComponent } from './layout/projects/in-approving-projects/in-approving-project/in-approving-project.component';
import { CommentComponent } from './layout/projects/comment/comment.component';
import { MyProjectsComponent } from './layout/projects/my-projects/my-projects.component';
import { MyProjectComponent } from './layout/projects/my-projects/my-project/my-project.component';
import { EngineerProjectsComponent } from './layout/engineer-detail/engineer-projects/engineer-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministratorComponent,
    LogInComponent,
    SidebarComponent,
    LayoutComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProfileComponent,
    EngineerListComponent,
    OneEngineerComponent,
    CentersComponent,
    CenterItemComponent,
    DepartmentsComponent,
    DepartmentItemComponent,
    AddCenterComponent,
    EditCenterComponent,
    CenterDetailComponent,
    BestEngineersComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    DepartmentDetailComponent,
    EngineerDetailComponent,
    AddEngineerComponent,
    EditEngineerComponent,
    PositionComponent,
    EditProfileComponent,
    CreateProjectComponent,
    MachineComponent,
    UpdateProjectComponent,
    PlanningProjectsComponent,
    ProjectDetailComponent,
    EditProjectComponent,
    InProcessProjectsComponent,
    InApprovingProjectsComponent,
    InProcessProjectComponent,
    InApprovingProjectComponent,
    CommentComponent,
    MyProjectsComponent,
    MyProjectComponent,
    EngineerProjectsComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    NgxImgModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
