import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AbpModalHeaderComponent } from '../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';
import { AbpValidationSummaryComponent } from "../../shared/components/validation/abp-validation.summary.component";

// Dummy interfaces for DTOs (replace with your actual DTOs)
interface PatientDto { id: number; name: string; }
interface DoctorDto { id: number; fullName: string; }
interface BedDto { id: number; isOccupied: boolean; }
interface CreatePatientAdmissionDto {
    status: any;
    diagnosis: any;
    dischargeDate: any;
    patientId?: number;
    doctorId?: number;
    bedId?: number;
    admissionDate?: Date;
}

// Dummy service proxies (replace with actual services)
class PatientAdmissionServiceProxy2 {
    create(admission: CreatePatientAdmissionDto) { 
        return { subscribe: (obj: any) => obj.next?.() }; 
    }
}
class PatientServiceProxy { 
    getAll() { return { subscribe: (obj: any) => obj.next?.({ items: [] }) }; } 
}
class DoctorServiceProxy { 
    getAll() { return { subscribe: (obj: any) => obj.next?.({ items: [] }) }; } 
}
class BedServiceProxy { 
    getAll() { return { subscribe: (obj: any) => obj.next?.({ items: [] }) }; } 
}

@Component({
    templateUrl: './Create-PatientAdmission-dialog.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        LocalizePipe,
        AbpValidationSummaryComponent
    ],
    providers: [
        PatientAdmissionServiceProxy2,
        PatientServiceProxy,
        DoctorServiceProxy,
        BedServiceProxy
    ]
})
export class CreatePatientAdmissionDialogComponent implements OnInit {

    @Output() onSave = new EventEmitter<void>();

    saving = false;
    admission: CreatePatientAdmissionDto = {
        status: undefined,
        diagnosis: undefined,
        dischargeDate: undefined
    };

    patients: PatientDto[] = [];
    doctors: DoctorDto[] = [];
    beds: BedDto[] = [];

    // Dummy notify and l function
    notify = {
        info: (msg: string) => alert(msg),
        warn: (msg: string) => alert(msg),
        error: (msg: string) => alert(msg)
    };
    l = (key: string) => key;

    constructor(
        private _admissionService: PatientAdmissionServiceProxy2,
        private _patientService: PatientServiceProxy,
        private _doctorService: DoctorServiceProxy,
        private _bedService: BedServiceProxy,
        public bsModalRef: BsModalRef
    ) {}

    ngOnInit(): void {
        this.loadPatients();
        this.loadDoctors();
        this.loadBeds();
    }

    loadPatients(): void {
        this._patientService.getAll().subscribe(res => {
            this.patients = res.items ?? [];
        });
    }

    loadDoctors(): void {
        this._doctorService.getAll().subscribe(res => {
            this.doctors = res.items ?? [];
        });
    }

    loadBeds(): void {
        this._bedService.getAll().subscribe(res => {
            this.beds = (res.items ?? []).filter(b => !b.isOccupied);
        });
    }

    save(): void {
        if (!this.admission.patientId ||
            !this.admission.doctorId ||
            !this.admission.bedId ||
            !this.admission.admissionDate) {
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
            error: () => {
                this.notify.error(this.l('SaveFailed'));
                this.saving = false;
            }
        });
    }
}
