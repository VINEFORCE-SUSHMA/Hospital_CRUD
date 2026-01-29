import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { BedServiceProxy, CreateBedDto, RoomServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '@shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
    templateUrl: './create-bed-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        AbpValidationSummaryComponent,
        LocalizePipe,
        TabsetComponent,
        TabDirective
    ],
})
export class CreateBedDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();

    saving = false;
    bed = new CreateBedDto();
    rooms: { id: number; name: string }[] = []; // Rooms for FK dropdown

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

    //     // Load rooms for dropdown
    //     this._roomService.getAll().subscribe((result) => {
    //         this.rooms = result;
    //     });
    // 
    }

    save(): void {
        this.saving = true;

        this._bedService.create(this.bed).subscribe(
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
