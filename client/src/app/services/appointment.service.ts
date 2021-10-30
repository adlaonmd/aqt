import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../interfaces/appointment';

const APPOINTMENTS_URL = 'http://localhost:3000/api/appointments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient, private router: Router) {}

  addAppointment(appointment: Appointment): void {
    this.http.post(APPOINTMENTS_URL, appointment).subscribe(
      (res: any) => {
        alert('Added appointment successfully - ID: ' + res.appointment_id);
      },
      (err) => {
        alert(err.error);
      }
    );
  }
}
