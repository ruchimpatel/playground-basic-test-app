import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component: AddPatientComponent }
]

@NgModule({
  declarations: [
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[ DatePipe]
})
export class PatientModule { }
