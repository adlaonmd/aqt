import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentRoutingModule } from './appointment/appointment-routing.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { FindAppointmentComponent } from './find-appointment/find-appointment.component';

@NgModule({
  declarations: [AppComponent, FindAppointmentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppointmentModule,
    AppointmentRoutingModule,
    AdminModule,
    AdminRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
