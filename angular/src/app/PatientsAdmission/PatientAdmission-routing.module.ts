import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientAdmissionsComponent  } from './PateientAdmission.comonent';

const routes: Routes = [
    {
        path: '',
        component: PatientAdmissionsComponent ,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PatientAdmissionsRoutingModule {}
