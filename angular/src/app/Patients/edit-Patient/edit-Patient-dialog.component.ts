import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { PatientServiceProxy, PatientDto } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    selector: 'app-edit-patient-dialog',
    templateUrl: './edit-patient-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        TabsetComponent,
        TabDirective,
        AbpValidationSummaryComponent,
        AbpModalFooterComponent,
        LocalizePipe
    ],
})
export class EditPatientDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<void>();
    @Input() id!: number; // Input property to pass patient id from parent

    saving = false;
    patient = new PatientDto();

    constructor(
        injector: Injector,
        private _patientService: PatientServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if (this.id) {
            this.loadPatient();
        }
    }

    private loadPatient(): void {
        this._patientService.getById(this.id).subscribe({
            next: (result) => {
                this.patient = result;
                this.cd.detectChanges(); // ensure form updates
            },
            error: (err) => {
                console.error(err);
                this.notify.error(this.l('LoadFailed'));
            }
        });
    }

    save(): void {
        this.saving = true;

        this._patientService.update(this.patient.id, this.patient).subscribe({
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
