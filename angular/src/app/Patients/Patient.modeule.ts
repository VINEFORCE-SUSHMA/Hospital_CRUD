import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

import { SharedModule } from '@shared/shared.module';

import { PatientComponent } from './Patient.Component';
import { CreatePatientDialogComponent } from './Creare-Patient/Create-Patient-dialog.component';
import { EditPatientDialogComponent } from './edit-Patient/edit-Patient-dialog.component';
import { PatientRoutingModule } from './Patient-routing.module';

@NgModule({
   
    
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ModalModule.forChild(),
        TableModule,
        PaginatorModule,
        PatientRoutingModule,
    ],
})
export class PatientsModule {}



