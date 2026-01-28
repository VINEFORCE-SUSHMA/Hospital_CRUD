import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientComponent} from './Patient.Component';
import { CreatePatientDialogComponent } from './Creare-Patient/Create-Patient-dialog.component';
import {EditPatientDialogComponent } from './edit-Patient/edit-Patient-dialog.component';
// import { PatientDetailsComponent } from './patient-details/patient-details.component';

const routes: Routes = [
    {
        path: '',
        component:PatientComponent,
        pathMatch: 'full',
    },
    {
        path: 'create',
        component:CreatePatientDialogComponent,
    },
    {
        path: 'edit/:id',
        component: EditPatientDialogComponent,
    },
    // {
    //     path: 'details/:id',
    //     component: PatientDetailsComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PatientRoutingModule {}
