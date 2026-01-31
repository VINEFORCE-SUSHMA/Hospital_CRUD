import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
// import { AppComponentBase } from '@shared/app-component-base';
import { PatientAdmissionDto,PatientAdmissionServiceProxy, UpdatePatientAdmissionDto } from '../../../shared/service-proxies/service-proxies';

import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AppComponentBase } from '../../../shared/app-component-base';


@Component({
  templateUrl: './Edit-PateientAdmission-dialog.component.html',
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
export class EditPatientAdmissionComponent extends AppComponentBase implements OnInit {
  @Output() onSave = new EventEmitter<any>();

  saving = false;
  patientAdmission = new UpdatePatientAdmissionDto();
  id: number;

  constructor(
    injector: Injector,
    public _patientService: PatientAdmissionServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._patientService.get(this.id).subscribe((result) => {
      this.patientAdmission = result;
      this.cd.detectChanges();
    });
  }

  save(): void {
    this.saving = true;
    const input = this.patientAdmission;
    this._patientService.update(this.id, input).subscribe(
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
