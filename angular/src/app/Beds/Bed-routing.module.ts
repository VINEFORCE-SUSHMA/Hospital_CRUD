// src/app/beds/beds-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedsComponent } from './Bed.component';


const routes: Routes = [
    {
        path: '',
        component: BedsComponent,
        pathMatch: 'full',
    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BedsRoutingModule {}

