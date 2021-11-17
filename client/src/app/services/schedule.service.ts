import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AvailableSchedule } from '../interfaces/available-schedule';

const AVAILABLE_SCHED_URL = 'http://localhost:3000/api/available_schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private scheduleList = new BehaviorSubject<Object>([]);
  private monthList = new BehaviorSubject<Object>([]);
  private dayList = new BehaviorSubject<Object>([]);
  private timeList = new BehaviorSubject<Object>([]);
  currentScheduleList = this.scheduleList.asObservable();
  currentMonthList = this.monthList.asObservable();
  currentDayList = this.dayList.asObservable();
  currentTimeList = this.timeList.asObservable();

  constructor(private http: HttpClient) {}

  setScheduleList(list: Object): void {
    this.scheduleList.next(list);
  }

  setMonthList(list: Object): void {
    this.monthList.next(list);
  }

  setDayList(list: Object): void {
    this.dayList.next(list);
  }

  setTimeList(list: Object): void {
    this.timeList.next(list);
  }

  addSchedule(schedule: AvailableSchedule): Observable<Object> {
    return this.http.post(AVAILABLE_SCHED_URL, schedule);
  }

  getScheduleByYear(year: string): Observable<Object> {
    return this.http.get(`${AVAILABLE_SCHED_URL}/${year}`);
  }

  getScheduleByYearMonth(year: string, month: string): Observable<Object> {
    return this.http.get(`${AVAILABLE_SCHED_URL}/${year}/${month}`);
  }

  getSchedule(year: string, month: string, day: string): Observable<Object> {
    return this.http.get(`${AVAILABLE_SCHED_URL}/${year}/${month}/${day}`);
  }

  updateSchedule(): void {
    console.log('Updating schedule');
  }

  deleteSchedule(schedule: AvailableSchedule): Observable<Object> {
    return this.http.delete(`${AVAILABLE_SCHED_URL}/${schedule._id}`);
  }
}
