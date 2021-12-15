import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../interfaces/appointment';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const APPOINTMENTS_URL = `${environment.backend_api_url}/api/appointments`;

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  private submittedStatus = false;
  private message = new BehaviorSubject<string>('');
  private appointmentList = new BehaviorSubject<Object>([]);

  currentMessage = this.message.asObservable();
  currentAppointmentList = this.appointmentList.asObservable();

  get isAppointmentSubmitted() {
    return this.submittedStatus;
  }

  setMessage(message: string): void {
    this.message.next(message);
  }

  setSubmittedStatus(value: boolean): void {
    this.submittedStatus = value;
  }

  setAppointmentList(list: Object): void {
    this.appointmentList.next(list);
  }

  addAppointment(appointment: Appointment): Observable<Object> {
    return this.http.post(APPOINTMENTS_URL, appointment);
  }

  getAppointment(appointment_id: string): Observable<Object> {
    return this.http.get(`${APPOINTMENTS_URL}/${appointment_id}`);
  }

  getAppointmentsByDay(year: string, month: string, day: string): Observable<Object> {
    return this.http.get(`${APPOINTMENTS_URL}/${year}/${month}/${day}`);
  }

  cancelAppointment(appointment: Appointment): Observable<Object> {
    return this.http.patch(`${APPOINTMENTS_URL}/cancel`, appointment);
  }

  arrivedAppointment(appointment: Appointment): Observable<Object> {
    return this.http.patch(`${APPOINTMENTS_URL}/arrived`, appointment);
  }
}
