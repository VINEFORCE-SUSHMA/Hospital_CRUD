import { Component, Injector, ChangeDetectorRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Table, TableModule } from 'primeng/table';
import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';
import { DoctorDto, DoctorServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CreateDoctorDialogComponent } from './Create-Doctor/Create-Doctor-dialog.component';
import { EditDoctorDialogComponent } from './Edit-Doctor/edit-Doctor-dialog.component';

@Component({
  templateUrl: './doctor.component.html',
  animations: [appModuleAnimation()],
  standalone: true,
  imports: [FormsModule, TableModule, PrimeTemplate, PaginatorModule, LocalizePipe, CommonModule, NgIf]
})
export class DoctorsComponent extends PagedListingComponentBase<DoctorDto> {
  protected delete(entity: DoctorDto): void {
      throw new Error('Method not implemented.');
  }

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  doctors: DoctorDto[] = [];
  keyword = '';
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _doctorService: DoctorServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  // List doctors with optional PrimeNG lazy load event
  list(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      if (this.primengTableHelper.records?.length) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();
this._doctorService.getAll(
  
)

  .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
  .subscribe((result) => {
    this.primengTableHelper.records = result; // already mapped to items
    this.primengTableHelper.totalRecordsCount = result.length; // or use totalCount if needed
    this.cd.detectChanges();
  });

  }

  // Open modal to create a new doctor
  createDoctor(): void {
    const modalRef = this._modalService.show(CreateDoctorDialogComponent, { class: 'modal-lg' });
    modalRef.content.onSave.subscribe(() => this.refresh());
  }

  // Open modal to edit an existing doctor
  editDoctor(doctor: DoctorDto): void {
    const modalRef = this._modalService.show(EditDoctorDialogComponent, {
      class: 'modal-lg',
      initialState: { id: doctor.id }
    });
    modalRef.content.onSave.subscribe(() => this.refresh());
  }

  // Delete a doctor with confirmation
  deleteDoctor(doctor: DoctorDto): void {
    abp.message.confirm(
      this.l('DoctorDeleteWarningMessage', doctor.fullName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._doctorService.delete(doctor.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
}
