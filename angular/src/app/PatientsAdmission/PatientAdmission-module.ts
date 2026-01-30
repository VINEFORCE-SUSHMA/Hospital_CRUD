import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PatientAdmissionsRoutingModule } from './PatientAdmission-routing.module';
import { PatientAdmissionsComponent } from './PateientAdmission.comonent';
import { CreatePatientAdmissionDialogComponent } from '../PatientsAdmission/Create-PatientAdmission-dialog.component';
import { EditPatientAdmissionDialogComponent } from './Edit-PatientsAdmission/Edit-PateientAdmission-dialog.componet';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SharedModule,
        PatientAdmissionsRoutingModule,
        CommonModule,
       PatientAdmissionsRoutingModule,
        CreatePatientAdmissionDialogComponent,
        EditPatientAdmissionDialogComponent
    ],
})
export class PatientAdmissionsModule {}
