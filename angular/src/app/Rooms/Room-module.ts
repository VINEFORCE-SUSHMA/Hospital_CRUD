import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { RoomsRoutingModule } from './Room-routing.module';
import { CreateRoomDialogComponent } from './Create-Room/Create-Room-dialog.component';
import { EditRoomDialogComponent } from './Edit-Room/Edit-Room-dialog.component';
import { RoomsComponent } from './Room-component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
       RoomsRoutingModule ,

        // standalone components
        RoomsComponent,
         CreateRoomDialogComponent,
        EditRoomDialogComponent,
    ],
})
export class RoomsModule {}

