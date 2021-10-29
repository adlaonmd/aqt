import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppointmentComponent } from './appointment/appointment.component';
//import { AddScheduleComponent } from './admin/add-schedule/add-schedule.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    // children: [
    //   { path: 'add-schedule', component: AddScheduleComponent },
    // ],
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
