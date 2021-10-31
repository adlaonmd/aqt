import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScheduleComponent } from './schedule.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { ListScheduleItemComponent } from './list-schedule/list-schedule-item/list-schedule-item.component';

@NgModule({
  declarations: [
    AddScheduleComponent,
    ViewScheduleComponent,
    ListScheduleComponent,
    ListScheduleItemComponent,
    ScheduleComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ScheduleModule {}
