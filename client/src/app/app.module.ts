import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AddScheduleComponent } from './admin/add-schedule/add-schedule.component';
import { ViewScheduleComponent } from './admin/view-schedule/view-schedule.component';
import { ListScheduleComponent } from './admin/list-schedule/list-schedule.component';
import { ListScheduleItemComponent } from './admin/list-schedule/list-schedule-item/list-schedule-item.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [AppComponent, AdminComponent, AddScheduleComponent, ViewScheduleComponent, ListScheduleComponent, ListScheduleItemComponent, AppointmentComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
