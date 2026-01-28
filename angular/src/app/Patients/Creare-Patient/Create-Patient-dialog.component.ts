import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { PatientDto, CreatepatientDto, PatientServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    selector: 'app-create-patient-dialog',
    templateUrl: './Create-Ptient-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        LocalizePipe
    ],
})
export class CreatePatientDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<void>();

    saving = false;
    patient: CreatepatientDto = new CreatepatientDto();
genders: any;

    constructor(
        injector: Injector,
        public _PatientService: PatientServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        // Initialization logic if needed
    }

    save(): void {
        if (!this.patient.firstName || !this.patient.lastName) {
            this.notify.warn(this.l('PleaseEnterRequiredFields'));
            return;
        }

        this.saving = true;

        this._PatientService.create(this.patient).subscribe({
            next: () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
                this.saving = false;
            },
            error: (err) => {
                console.error(err);
                this.notify.error(this.l('SaveFailed'));
                this.saving = false;
            }
        });
    }
}
