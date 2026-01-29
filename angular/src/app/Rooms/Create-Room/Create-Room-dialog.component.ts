import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy, CreateRoomDto } from '@shared/service-proxies/service-proxies';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
    templateUrl: './create-room-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        AbpValidationSummaryComponent,
        LocalizePipe,
        TabsetComponent,
        TabDirective,
    ],
})
export class CreateRoomDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();

    saving = false;
    room = new CreateRoomDto();

    constructor(
        injector: Injector,
        private _roomService: RoomServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.room.isActive = true;
    }

    save(): void {
        this.saving = true;

        this._roomService.create(this.room).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            () => {
                this.saving = false;
            }
        );
    }
}
