
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BedsComponent } from './Bed.component';
import { BedsRoutingModule } from './Bed-routing.module';
import { CreateBedDialogComponent } from '../Beds/create-Bed-dialog.component';
import { EditBedDialogComponent } from './Edit-Bed/Edit-Bed-dialog.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    SharedModule,
    BedsRoutingModule,
    CommonModule,
    TableModule,
    BedsComponent,
     CreateBedDialogComponent,
    EditBedDialogComponent,
  ],
})
export class BedsModule {}
