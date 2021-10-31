import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [AdminComponent, AppointmentComponent],
  imports: [CommonModule, AdminRoutingModule, ScheduleModule],
})
export class AdminModule {}
