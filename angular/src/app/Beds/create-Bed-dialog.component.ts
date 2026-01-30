import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
    BedServiceProxy,
    CreateBedDto,
    RoomServiceProxy
} from '@shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '@shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@node_modules/@angular/common';

@Component({
    templateUrl: './create-bed-dialog.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        AbpValidationSummaryComponent,
        LocalizePipe,
        TabsetComponent,
        TabDirective
    ]
})
export class CreateBedDialogComponent extends AppComponentBase implements OnInit {

    @Output() onSave = new EventEmitter<void>();

    saving = false;
    bed = new CreateBedDto();

    // Dropdown list
    rooms: { id: number; roomNumber: string }[] = [];

    constructor(
        injector: Injector,
        private _bedService: BedServiceProxy,
        private _roomService: RoomServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.bed.isOccupied = false;
        this.loadRooms();
    }

    // Load rooms for dropdown
  loadRooms(): void {
  this._roomService.getAll().subscribe({
    next: (result) => {
      this.rooms = result;   
    },
    error: () => {
      this.notify.error(this.l('FailedToLoadRooms'));
    }
  });
}


    // Save bed
    save(): void {
        if (!this.bed.roomId) {
            this.notify.warn(this.l('PleaseSelectRoom'));
            return;
        }

        this.saving = true;

        this._bedService.create(this.bed).subscribe({
            next: () => {
                this.notify.success(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            error: () => {
                this.saving = false;
            }
        });
    }
}
