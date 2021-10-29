import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../interfaces/appointment';

const APPOINTMENTS_URL = 'http://localhost:3000/api/appointments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  addAppointment(appointment: Appointment): void {
    this.http.post(APPOINTMENTS_URL, appointment, { responseType: 'text' }).subscribe(
      (res) => {
        alert(res);
      },
      (err) => {
        alert(err.error);
      }
    );
  }
}
