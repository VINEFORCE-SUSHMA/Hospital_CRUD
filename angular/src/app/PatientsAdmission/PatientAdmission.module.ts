import { NgModule } from '@angular/core';
import { PatientAdmissionsRoutingModule } from './PatientAdmission-routing.module';
import { PatientAdmissionsComponent  } from './PateientAdmission.comonent';
import { CreatePatientAdmissionDialogComponent } from '../PatientsAdmission/Create-patientAdmission-dialog.component';
import { EditPatientAdmissionComponent } from './Edit-PatientsAdmission/Edit-PateientAdmission-dialog.componet';
import { SharedModule } from '../../shared/shared.module';
import { TableModule} from 'primeng/table';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    PatientAdmissionsComponent ,
    CreatePatientAdmissionDialogComponent,
 EditPatientAdmissionComponent,
    CommonModule,
    SharedModule,
    TableModule ,
    PatientAdmissionsRoutingModule
  ]
})
export class PatientAdmissionModule {}
