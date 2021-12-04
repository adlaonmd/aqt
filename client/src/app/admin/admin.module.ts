import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '@auth0/auth0-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentModule } from './appointment/appointment.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ScheduleModule,
    AppointmentModule,
    AuthModule.forRoot({
      domain: 'dev-kot70-ns.us.auth0.com',
      clientId: 'FZSl4gpAz7mlqjKewshWbIYvzLgF184H',
    }),
  ],
})
export class AdminModule {}
