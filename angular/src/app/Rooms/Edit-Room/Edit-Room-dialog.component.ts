import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { RoomServiceProxy, RoomDto } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    selector: 'app-edit-room-dialog',
    templateUrl: './Edit-room-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        AbpValidationSummaryComponent,
        TabsetComponent,
        TabDirective,
        LocalizePipe,
    ],
})
export class EditRoomDialogComponent
    extends AppComponentBase
    implements OnInit
{
    @Output() onSave = new EventEmitter<void>();
    @Input() id!: number;

    saving = false;
    room = new RoomDto();

    constructor(
        injector: Injector,
        private _roomService: RoomServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if (this.id) {
            this.loadRoom();
        }
    }

    private loadRoom(): void {
        this._roomService.getById(this.id).subscribe({
            next: (result) => {
                this.room = result;
                this.cd.detectChanges();
            },
            error: () => {
                this.notify.error(this.l('LoadFailed'));
            },
        });
    }

    save(): void {
        this.saving = true;

        this._roomService.update(this.room.id, this.room).subscribe({
            next: () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
                this.saving = false;
            },
            error: () => {
                this.notify.error(this.l('SaveFailed'));
                this.saving = false;
            },
        });
    }
}
