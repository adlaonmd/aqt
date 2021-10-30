import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';
import { months } from '../months';
import { AppointmentService } from '../services/appointment.service';

const emailRegex: RegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const phoneRegex: RegExp = /^(09)\d{9}$/gm;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  step: number = 1;
  currentYear: string = new Date().getFullYear().toString();
  yearList: string[] = [this.currentYear, `${(new Date().getFullYear() + 1).toString()}`];
  monthList!: string[];
  dayList!: string[];
  timeList!: string[];

  appointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      day: ['', Validators.required],
      time: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneRegex)]],
      groupSize: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
    });

    this.getMonthList();
    this.generateMonthList();
    this.getDayList();
    this.generateDayList();
    this.getTimeList();
    this.generateTimeList();
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  handleSubmit(): void {
    this.appointmentService.addAppointment(this.appointmentForm.value);
  }

  getMonthList(): void {
    this.appointmentForm.get('year')?.valueChanges.subscribe((selectedYear) => {
      this.appointmentForm.patchValue({ month: '' });
      this.appointmentForm.patchValue({ day: '' });
      this.appointmentForm.patchValue({ time: '' });
      this.dayList = [];
      this.timeList = [];
      this.scheduleService.getScheduleByYear(selectedYear);
    });
  }

  generateMonthList(): void {
    this.scheduleService.currentMonthList.subscribe((schedule) => {
      this.monthList = [];

      Object.values(schedule).map((sched: any) => {
        this.monthList.push(sched.month);
      });

      this.monthList.sort(function (a: any, b: any) {
        return months.indexOf(a) - months.indexOf(b);
      });
    });
  }

  getDayList(): void {
    this.appointmentForm.get('month')?.valueChanges.subscribe((selectedMonth) => {
      const { year } = this.appointmentForm.value;

      if (year !== '' && selectedMonth) {
        this.appointmentForm.patchValue({ day: '' });
        this.appointmentForm.patchValue({ time: '' });
        this.timeList = [];
        this.scheduleService.getScheduleByYearMonth(year, selectedMonth);
      }
    });
  }

  generateDayList(): void {
    this.scheduleService.currentDayList.subscribe((schedule) => {
      this.dayList = [];

      if (this.appointmentForm.get('month')?.value !== '') {
        Object.values(schedule).map((sched: any) => {
          this.dayList.push(sched.day);
        });
      }
    });
  }

  getTimeList(): void {
    this.appointmentForm.get('day')?.valueChanges.subscribe((selectedDay) => {
      const { year, month } = this.appointmentForm.value;

      if (month !== '' && selectedDay) {
        this.appointmentForm.patchValue({ time: '' });
        this.scheduleService.getSchedule(year, month, selectedDay);
      }
    });
  }

  generateTimeList(): void {
    this.scheduleService.currentTimeList.subscribe((schedule) => {
      this.timeList = [];

      if (this.appointmentForm.get('day')?.value !== '') {
        Object.values(schedule).map((sched: any) => {
          Object.values(sched.schedule).map((result: any) => {
            this.timeList.push(result.time);
          });
        });
      }
    });
  }
}
