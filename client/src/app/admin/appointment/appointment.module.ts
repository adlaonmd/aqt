import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppointmentComponent } from './appointment.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { ListAppointmentItemComponent } from './list-appointment/list-appointment-item/list-appointment-item.component';
import { FindAppointmentComponent } from './find-appointment/find-appointment.component';

@NgModule({
  declarations: [AppointmentComponent, ViewAppointmentComponent, ListAppointmentComponent, ListAppointmentItemComponent, FindAppointmentComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppointmentModule {}
