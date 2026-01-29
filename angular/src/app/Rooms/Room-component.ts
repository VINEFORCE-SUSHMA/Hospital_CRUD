import { Component, Injector, ChangeDetectorRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Table, TableModule } from 'primeng/table';
import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';
import { Paginator, PaginatorModule } from 'primeng/paginator';

import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';

import {
    RoomDto,
    RoomServiceProxy,
} from '../../shared/service-proxies/service-proxies';

import { CreateRoomDialogComponent } from './Create-Room/Create-Room-dialog.component';
import { EditRoomDialogComponent } from './Edit-Room/Edit-Room-dialog.component';

@Component({
    templateUrl: './Room.component.html',
    animations: [appModuleAnimation()],
    standalone: true,
    imports: [
        FormsModule,
        TableModule,
        PrimeTemplate,
        PaginatorModule,
        LocalizePipe,
        CommonModule,
        NgIf,
    ],
})
export class RoomsComponent extends PagedListingComponentBase<RoomDto> {
    protected delete(entity: RoomDto): void {
        throw new Error('Method not implemented.');
    }

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    rooms: RoomDto[] = [];
    keyword = '';
    advancedFiltersVisible = false;

    constructor(
        injector: Injector,
        private _roomService: RoomServiceProxy,
        private _modalService: BsModalService,
        cd: ChangeDetectorRef
    ) {
        super(injector, cd);
    }

    // List rooms (PrimeNG lazy load supported)
    list(event?: LazyLoadEvent): void {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            if (this.primengTableHelper.records?.length) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._roomService
            .getAll()
            .pipe(
                finalize(() =>
                    this.primengTableHelper.hideLoadingIndicator()
                )
            )
            .subscribe((result) => {
                this.primengTableHelper.records = result;
                this.primengTableHelper.totalRecordsCount = result.length;
                this.cd.detectChanges();
            });
    }

    // Open create room modal
    createRoom(): void {
        const modalRef = this._modalService.show(
            CreateRoomDialogComponent,
            { class: 'modal-lg' }
        );

        modalRef.content.onSave.subscribe(() => this.refresh());
    }

    // Open edit room modal
    editRoom(room: RoomDto): void {
        const modalRef = this._modalService.show(
            EditRoomDialogComponent,
            {
                class: 'modal-lg',
                initialState: { id: room.id },
            }
        );

        modalRef.content.onSave.subscribe(() => this.refresh());
    }

    // Delete room with confirmation
    deleteRoom(room: RoomDto): void {
        abp.message.confirm(
            this.l('RoomDeleteWarningMessage', room.roomNumber),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._roomService.delete(room.id).subscribe(() => {
                        abp.notify.success(
                            this.l('SuccessfullyDeleted')
                        );
                        this.refresh();
                    });
                }
            }
        );
    }
}




