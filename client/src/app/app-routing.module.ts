import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindAppointmentComponent } from './find-appointment/find-appointment.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'find-appointment', component: FindAppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
