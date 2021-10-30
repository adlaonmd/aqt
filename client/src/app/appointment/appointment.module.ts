import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [AppointmentComponent, SuccessComponent, ErrorComponent],
  imports: [CommonModule, ReactiveFormsModule, AppointmentRoutingModule],
})
export class AppointmentModule {}
