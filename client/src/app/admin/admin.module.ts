import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentModule } from './appointment/appointment.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, ScheduleModule, AppointmentModule],
})
export class AdminModule {}
