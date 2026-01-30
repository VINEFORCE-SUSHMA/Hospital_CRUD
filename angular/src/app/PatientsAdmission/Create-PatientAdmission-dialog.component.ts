import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
    PatientAdmissionServiceProxy,
    CreatePatientAdmissionDto,
    PatientServiceProxy,
    DoctorServiceProxy,
    BedServiceProxy,
    PatientDto,
    DoctorDto,
    BedDto
} from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '@shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
    templateUrl: './Create-PatientAdmission-dialog.component.html',
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
export class CreatePatientAdmissionDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>(); 

    saving = false;
    admission = new CreatePatientAdmissionDto();

    patients: PatientDto[] = [];
    doctors: DoctorDto[] = [];
    beds: BedDto[] = [];

    constructor(
        injector: Injector,
        private _admissionService: PatientAdmissionServiceProxy,
        private _patientService: PatientServiceProxy,
        private _doctorService: DoctorServiceProxy,
        private _bedService: BedServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.admission.isActive = true; 
        this.loadPatients();
        this.loadDoctors();
        this.loadBeds();
    }

    loadPatients(): void {
        this._patientService.getAll().subscribe(result => {
            this.patients = result; 
        });
    }

    loadDoctors(): void {
        this._doctorService.getAll().subscribe(result => {
            this.doctors = result;
        });
    }

    loadBeds(): void {
        this._bedService.getAll().subscribe(result => {
            this.beds = (result ?? []).filter(b => !b.isOccupied);
        });
    }

    save(): void {
        if (!this.admission.patientId || !this.admission.doctorId || !this.admission.bedId) {
            this.notify.warn(this.l('PleaseSelectRequiredFields'));
            return;
        }

        this.saving = true;

        this._admissionService.create(this.admission).subscribe({
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
