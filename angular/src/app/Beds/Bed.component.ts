import {
  Component,
  Injector,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';
import {
  BedDto,
  BedServiceProxy
} from '../../shared/service-proxies/service-proxies';
import { CreateBedDialogComponent } from '../Beds/create-Bed-dialog.component';
import { EditBedDialogComponent } from './Edit-Bed/Edit-Bed-dialog.component';

@Component({
  templateUrl: './Bed.component.html',
  animations: [appModuleAnimation()],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    
    NgIf,
    TableModule
  ],
})
export class BedsComponent extends PagedListingComponentBase<BedDto> {

  @ViewChild('dataTable', { static: true })
  dataTable: TableModule;

  @ViewChild('paginator', { static: true })
  paginator: Paginator;

  beds: BedDto[] = [];
  keyword = '';
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _bedService: BedServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  list(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records?.length) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._bedService.getAll().subscribe((result) => {
      this.primengTableHelper.records = result;
      this.primengTableHelper.totalRecordsCount = result.length;
      this.cd.detectChanges();
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  createBed(): void {
    const modalRef = this._modalService.show(
      CreateBedDialogComponent,
      { class: 'modal-lg' }
    );

    modalRef.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  editBed(bed: BedDto): void {
    const modalRef = this._modalService.show(
      EditBedDialogComponent,
      {
        class: 'modal-lg',
        initialState: { id: bed.id },
      }
    );

    modalRef.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(entity: BedDto): void {
    abp.message.confirm(
      this.l('BedDeleteWarningMessage', entity.bedNumber),
      undefined,
      (result: boolean) => {
        if (result) {
          this._bedService.delete(entity.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
}
