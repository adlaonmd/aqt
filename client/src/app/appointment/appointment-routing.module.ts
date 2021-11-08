import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AuthGuard } from './auth.guard';
import { CancelComponent } from './cancel/cancel.component';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: 'appointment',
    children: [
      { path: '', component: AppointmentComponent },
      { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },
      { path: 'error', component: ErrorComponent, canActivate: [AuthGuard] },
      { path: 'cancel', component: CancelComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
