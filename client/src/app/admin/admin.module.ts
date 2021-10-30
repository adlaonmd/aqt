import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { ListScheduleItemComponent } from './list-schedule/list-schedule-item/list-schedule-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AddScheduleComponent,
    ViewScheduleComponent,
    ListScheduleComponent,
    ListScheduleItemComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {}
