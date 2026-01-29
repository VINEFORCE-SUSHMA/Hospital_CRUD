import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef, input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { DoctorServiceProxy, DoctorDto } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AbpValidationSummaryComponent } from '@shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    templateUrl: './edit-doctor-dialog.component.html',
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
export class EditDoctorDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();

    saving = false;
    doctor = new DoctorDto();
    id: number;

    constructor(
        injector: Injector,
        public _doctorService: DoctorServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._doctorService.getById(this.id).subscribe((result) => {
            this.doctor = result;
            this.cd.detectChanges();
        });
    }

   save(): void {
    this.saving = true;
    const input = this.doctor; // or your form value
    this._doctorService.update(this.doctor.id, input).subscribe(
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
