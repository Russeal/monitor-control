import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authGuard';
import { AdminGuard } from './services/adminGuard';

import { LogInComponent } from './layout/log-in/log-in.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './engineer/profile/profile.component';
import { EditProfileComponent } from './engineer/edit-profile/edit-profile.component';

import { ProjectListComponent } from './layout/projects/project-list/project-list.component';
import { CreateProjectComponent } from './administrator/create-project/create-project.component';
import { UpdateProjectComponent } from './administrator/update-project/update-project.component';
import { PlanningProjectsComponent } from './layout/projects/planning-projects/planning-projects.component';
import { ProjectDetailComponent } from './layout/projects/project-detail/project-detail.component';
import { EditProjectComponent } from './administrator/edit-project/edit-project.component';
import { InProcessProjectsComponent } from './layout/projects/in-process-projects/in-process-projects.component';
import { InApprovingProjectsComponent } from './layout/projects/in-approving-projects/in-approving-projects.component';
import { InProcessProjectComponent } from './layout/projects/in-process-projects/in-process-project/in-process-project.component';
import { InApprovingProjectComponent } from './layout/projects/in-approving-projects/in-approving-project/in-approving-project.component';

import { EngineerListComponent } from './layout/engineer-list/engineer-list.component';
import { EngineerDetailComponent } from './layout/engineer-detail/engineer-detail.component';
import { AddEngineerComponent } from './administrator/add-engineer/add-engineer.component';
import { EditEngineerComponent } from './administrator/edit-engineer/edit-engineer.component';

import { CentersComponent } from './layout/centers/centers.component';
import { AddCenterComponent } from './administrator/add-center/add-center.component';
import { EditCenterComponent } from './administrator/edit-center/edit-center.component';
import { CenterDetailComponent } from './layout/center-detail/center-detail.component';

import { DepartmentsComponent } from './layout/departments/departments.component';
import { AddDepartmentComponent } from './administrator/add-department/add-department.component';
import { EditDepartmentComponent } from './administrator/edit-department/edit-department.component';
import { DepartmentDetailComponent } from './layout/department-detail/department-detail.component';
import { PositionComponent } from './administrator/position/position.component';
import { MachineComponent } from './administrator/machine/machine.component';

const appRoutes: Routes = [
    { path: '', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'projects',
                children: [
                    { path: '', component: ProjectListComponent },
                    { path: 'create-project', component: CreateProjectComponent, canActivate: [AdminGuard] },
                    { path: 'in-process-projects',
                        children: [
                            { path: '', component: InProcessProjectsComponent },
                            { path: ':id', component: InProcessProjectComponent }
                        ]
                    },
                    { path: 'in-approval-projects',
                        children: [
                            { path: '', component: InApprovingProjectsComponent },
                            { path: ':id', component: InApprovingProjectComponent }
                        ]
                    },
                    { path: 'new-planned-projects',
                        children: [
                            { path: '', component: PlanningProjectsComponent },
                            { path: ':projectId',
                                children: [
                                    { path: '', component: UpdateProjectComponent },
                                    { path: 'edit-project', component: EditProjectComponent }
                                ]
                            }
                        ]
                    },
                    { path: ':id', component: ProjectDetailComponent }
                ]
            },
            { path: 'profile',
                children: [
                    { path: '', component: ProfileComponent },
                    { path: 'edit-profile', component: EditProfileComponent }
                ]
            },
            { path: 'positions', component: PositionComponent, canActivate: [AdminGuard] },
            { path: 'machines', component: MachineComponent, canActivate: [AdminGuard] },
            { path: 'employees',
                children: [
                    { path: '', component: EngineerListComponent },
                    { path: 'add-employee', component: AddEngineerComponent, canActivate: [AdminGuard] },
                    { path: ":id",
                        children: [
                            { path: '', component: EngineerDetailComponent },
                            { path: 'edit-employee', component: EditEngineerComponent, canActivate: [AdminGuard] }
                        ]
                    }
                ]
            },
            { path: 'markazlar',
                children: [
                    { path: '', component: CentersComponent },
                    { path: 'yangi-markaz', component: AddCenterComponent, canActivate: [AdminGuard] },
                    { path: ':markaz',
                        children: [
                            { path: '', component: CenterDetailComponent },
                            { path: 'edit-center', component: EditCenterComponent, canActivate: [AdminGuard] }
                        ]
                    }
                ]
            },
            { path: "departments",
                children: [
                    { path: '', component: DepartmentsComponent },
                    { path: "add-department", component: AddDepartmentComponent, canActivate: [AdminGuard] },
                    { path: ":department",
                        children: [
                            { path: '', component: DepartmentDetailComponent },
                            { path: 'edit-department', component: EditDepartmentComponent, canActivate: [AdminGuard] }
                        ]
                    }
                ]
            }
        ]
    },
    { path: 'log-in', component: LogInComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard, AdminGuard],
    declarations: []
})

export class AppRoutingModule {
}