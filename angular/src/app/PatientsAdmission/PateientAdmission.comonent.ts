import { Component, Injector, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { TableModule } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';
import { PatientAdmissionDto, PatientAdmissionServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CreatePatientAdmissionDialogComponent } from '../PatientsAdmission/Create-PatientAdmission-dialog.component';
import { EditPatientAdmissionDialogComponent } from './Edit-PatientsAdmission/Edit-PateientAdmission-dialog.componet';
import { LazyLoadEvent } from '@node_modules/primeng/api';

@Component({
    templateUrl: './PateientAdmission.component.html',
    animations: [appModuleAnimation()],
    standalone: true,
    imports: [FormsModule, TableModule, Paginator, LocalizePipe, CommonModule, NgIf]
})
export class PatientAdmissionsComponent extends PagedListingComponentBase<PatientAdmissionDto> {
    protected delete(entity: PatientAdmissionDto): void {
        throw new Error('Method not implemented.');
    }
    @ViewChild('dataTable', { static: true }) dataTable: TableModule;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    admissions: PatientAdmissionDto[] = [];
    keyword = '';
    advancedFiltersVisible = false;

    constructor(
        injector: Injector,
        private _admissionService: PatientAdmissionServiceProxy,
        private _modalService: BsModalService,
        cd: ChangeDetectorRef
    ) {
        super(injector, cd);
    }

    list(event?: LazyLoadEvent): void {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records?.length) return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._admissionService.getAll()
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe(result => {
                this.primengTableHelper.records = result;
                this.primengTableHelper.totalRecordsCount = result.length;
                this.cd.detectChanges();
            });
    }

    createAdmission(): void {
        const modalRef = this._modalService.show(CreatePatientAdmissionDialogComponent, { class: 'modal-lg' });
        modalRef.content.onSave.subscribe(() => this.refresh());
    }

    editAdmission(admission: PatientAdmissionDto): void {
        const modalRef = this._modalService.show(EditPatientAdmissionDialogComponent, {
            class: 'modal-lg',
            initialState: { id: admission.id }
        });
        modalRef.content.onSave.subscribe(() => this.refresh());
    }

    deleteAdmission(admission: PatientAdmissionDto): void {
        abp.message.confirm(
            this.l('PatientAdmissionDeleteWarningMessage', admission.patientName),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._admissionService.delete(admission.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }
}
