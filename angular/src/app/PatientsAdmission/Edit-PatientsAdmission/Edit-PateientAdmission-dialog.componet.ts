import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
    PatientAdmissionServiceProxy,
    PatientAdmissionDto,
    UpdatePatientAdmissionDto,
    PatientServiceProxy,
    DoctorServiceProxy,
    BedServiceProxy,
    PatientDto,
    DoctorDto,
    BedDto
} from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    templateUrl: './Edit-PateientAdmission-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        TabsetComponent,
        TabDirective,
        AbpModalFooterComponent,
        LocalizePipe
    ],
})
export class EditPatientAdmissionDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();

    saving = false;
    admission = new PatientAdmissionDto();
    id: number;

    // FK arrays
    patients: PatientDto[] = [];
    doctors: DoctorDto[] = [];
    beds: BedDto[] = [];

    constructor(
        injector: Injector,
        private _admissionService: PatientAdmissionServiceProxy,
        private _patientService: PatientServiceProxy,
        private _doctorService: DoctorServiceProxy,
        private _bedService: BedServiceProxy,
        public bsModalRef: BsModalRef,
        private cd: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.loadFKs();

        // Load single admission: use getAll and filter if getById doesn't exist
        if (this.id) {
            this._admissionService.getAll().subscribe(result => {
                const admission = result.find(a => a.id === this.id);
                if (admission) {
                    this.admission = admission;
                    this.cd.detectChanges();
                }
            });
        }
    }

    loadFKs(): void {
        // Patients
        this._patientService.getAll().subscribe(result => {
            this.patients = result; // PatientDto[]
        });

        // Doctors
        this._doctorService.getAll().subscribe(result => {
            this.doctors = result; // DoctorDto[]
        });

        // Beds (only unoccupied)
        this._bedService.getAll().subscribe(result => {
            this.beds = (result ?? []).filter(b => !b.isOccupied);
        });
    }

    save(): void {
        // Basic validation
        if (!this.admission.patientId || !this.admission.doctorId || !this.admission.bedId) {
            this.notify.warn(this.l('PleaseSelectRequiredFields'));
            return;
        }

        this.saving = true;
        const input = new UpdatePatientAdmissionDto();
        Object.assign(input, this.admission);

        this._admissionService.update(this.admission.id, input).subscribe({
            next: () => {
                this.saving = false;
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            error: (err) => {
                this.saving = false;
                this.notify.error(this.l('SaveFailed'));
                console.error(err);
            }
        });
    }
}
