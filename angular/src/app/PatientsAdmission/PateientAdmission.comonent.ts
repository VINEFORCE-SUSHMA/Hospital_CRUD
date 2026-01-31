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
import {
  PatientAdmissionDto,
  PatientAdmissionServiceProxy
} from '../../shared/service-proxies/service-proxies';
import { CreatePatientAdmissionDialogComponent } from '../PatientsAdmission/Create-patientAdmission-dialog.component';
import { EditPatientAdmissionComponent } from './Edit-PatientsAdmission/Edit-PateientAdmission-dialog.componet';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: './PateientAdmission.component.html',
  animations: [appModuleAnimation()],
  standalone: true,
  imports: [FormsModule, TableModule, Paginator, LocalizePipe, CommonModule, NgIf]
})
export class PatientAdmissionsComponent extends PagedListingComponentBase<PatientAdmissionDto> {

  @ViewChild('dataTable', { static: true }) dataTable: TableModule;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  keyword = '';
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _admissionService: PatientAdmissionServiceProxy,
    private _modalService: BsModalService,
    protected override cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  // Load admissions list
  list(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records.length) return;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._admissionService.getAll()
      .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
      .subscribe((result: PatientAdmissionDto[]) => {
        // result is an array, not { items, totalCount }
        this.primengTableHelper.records = result ?? [];
        this.primengTableHelper.totalRecordsCount = result?.length ?? 0;
        this.cd.detectChanges();
      });
  }

  // Open modal to create new admission
  createAdmission(): void {
    const modalRef = this._modalService.show(CreatePatientAdmissionDialogComponent, { class: 'modal-lg' });
    modalRef.content.onSave.subscribe(() => this.refresh());
  }

  // Open modal to edit admission
  editAdmission(admission: PatientAdmissionDto): void {
    const modalRef = this._modalService.show(EditPatientAdmissionComponent, {
      class: 'modal-lg',
      initialState: { id: admission.id }
    });
    modalRef.content.onSave.subscribe(() => this.refresh());
  }

  // Delete admission (implements abstract method)
  protected delete(entity: PatientAdmissionDto): void {
    abp.message.confirm(
      this.l('PatientAdmissionDeleteWarningMessage', entity.patientName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._admissionService.delete(entity.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  // Localization helper
  l(key: string, ...args: any[]): string {
    return key; // Replace with actual localization logic
  }
}
