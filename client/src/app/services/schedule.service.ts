import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AvailableSchedule } from '../interfaces/available-schedule';

const AVAILABLE_SCHED_URL = 'http://localhost:3000/api/available_schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private monthList = new BehaviorSubject<Object>([]);
  private dayList = new BehaviorSubject<Object>([]);
  private timeList = new BehaviorSubject<Object>([]);
  currentMonthList = this.monthList.asObservable();
  currentDayList = this.dayList.asObservable();
  currentTimeList = this.timeList.asObservable();

  constructor(private http: HttpClient) {}

  addSchedule(schedule: AvailableSchedule): void {
    this.http.post(AVAILABLE_SCHED_URL, schedule).subscribe(
      (res) => {
        alert(res);
      },
      (err) => {
        alert(err.error);
      }
    );
  }

  getScheduleByYear(year: string): void {
    this.http.get(`${AVAILABLE_SCHED_URL}/${year}`).subscribe((res) => {
      this.monthList.next(res);
    });
  }

  getScheduleByYearMonth(year: string, month: string): void {
    this.http.get(`${AVAILABLE_SCHED_URL}/${year}/${month}`).subscribe((res) => {
      this.dayList.next(res);
    });
  }

  getSchedule(year: string, month: string, day: string): void {
    this.http.get(`${AVAILABLE_SCHED_URL}/${year}/${month}/${day}`).subscribe((res) => {
      this.timeList.next(res);
    });
  }

  updateSchedule(): void {
    console.log('Updating schedule');
  }

  deleteSchedule(schedule: AvailableSchedule): void {
    this.http.delete(`${AVAILABLE_SCHED_URL}/${schedule._id}`).subscribe((res) => {
      this.getScheduleByYearMonth(schedule.year, schedule.month);
    });
  }
}
