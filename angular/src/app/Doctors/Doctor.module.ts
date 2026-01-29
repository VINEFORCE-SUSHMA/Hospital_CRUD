import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CreateDoctorDialogComponent } from './Create-Doctor/Create-Doctor-dialog.component';
import { EditDoctorDialogComponent } from './Edit-Doctor/edit-Doctor-dialog.component';
import { DoctorsRoutingModule } from './Doctor-routing.module';
import { DoctorsComponent } from './Doctor.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SharedModule,
        DoctorsRoutingModule,
        CommonModule,
        DoctorsComponent,
        CreateDoctorDialogComponent,
        EditDoctorDialogComponent,
    ],
})
export class DoctorsModule {}
