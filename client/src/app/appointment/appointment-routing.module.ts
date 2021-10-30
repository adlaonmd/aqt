import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: 'appointment',
    children: [
      { path: '', component: AppointmentComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'error', component: ErrorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
