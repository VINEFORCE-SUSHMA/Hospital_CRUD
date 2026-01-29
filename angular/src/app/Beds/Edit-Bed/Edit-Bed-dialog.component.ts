import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { BedServiceProxy, BedDto, RoomServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AbpValidationSummaryComponent } from '@shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    templateUrl: './Edit-Bed-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        TabsetComponent,
        TabDirective,
        AbpValidationSummaryComponent,
        AbpModalFooterComponent,
        LocalizePipe,
    ],
})
export class EditBedDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();

    saving = false;
    bed = new BedDto();
    rooms: { id: number; name: string }[] = []; // Rooms dropdown
    id: number;

    constructor(
        injector: Injector,
        private _bedService: BedServiceProxy,
        private _roomService: RoomServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        // Load bed details
        this._bedService.get(this.id).subscribe((result) => {
            this.bed = result;
            this.cd.detectChanges();
        });

        // // Load rooms for dropdown
        // this._roomService.getAll().subscribe((result) => {
        //     this.rooms = result;
        // });
    }

    save(): void {
        this.saving = true;
        const input = this.bed;
        this._bedService.update(this.bed.id, input).subscribe(
            () => {
                this.saving = false;
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            (error) => {
                this.saving = false;
                this.notify.error(this.l('SaveFailed'));
                console.error(error);
            }
        );
    }
}
