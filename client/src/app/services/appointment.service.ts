import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../interfaces/appointment';
import { BehaviorSubject, Observable } from 'rxjs';

const APPOINTMENTS_URL = 'http://localhost:3000/api/appointments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private message = new BehaviorSubject<string>('');
  currentMessage = this.message.asObservable();

  constructor(private http: HttpClient) {}

  addAppointment(appointment: Appointment): Observable<Object> {
    return this.http.post(APPOINTMENTS_URL, appointment);
  }

  setMessage(message: string): void {
    this.message.next(message);
  }
}
