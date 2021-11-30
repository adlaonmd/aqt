import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  currentMonth: number = new Date().getMonth();
  currentDay: number = new Date().getDate();
  daysInMonth!: number;
  yearList: string[] = [this.currentYear, `${(new Date().getFullYear() + 1).toString()}`];
  monthList!: string[];
  dayList!: string[];
  timeList!: any;
  personsPerTable!: number;
  appointmentId!: string;

  appointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
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

  get firstName() {
    return this.appointmentForm.get('firstName');
  }

  get lastName() {
    return this.appointmentForm.get('lastName');
  }

  get email() {
    return this.appointmentForm.get('email');
  }

  get phoneNumber() {
    return this.appointmentForm.get('phoneNumber');
  }

  get groupSize() {
    return this.appointmentForm.get('groupSize');
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  handleSubmit(): void {
    this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
      (res: any) => {
        this.appointmentId = res.appointment_id;
        this.appointmentService.setMessage(this.appointmentId);
        this.appointmentService.setSubmittedStatus(true);
        this.router.navigate(['success'], { relativeTo: this.route });
      },
      (err) => {
        this.appointmentService.setMessage(err.error);
        this.appointmentService.setSubmittedStatus(true);
        this.router.navigate(['error'], { relativeTo: this.route });
      }
    );
  }

  getMonthList(): void {
    this.appointmentForm.get('year')?.valueChanges.subscribe((selectedYear) => {
      this.appointmentForm.patchValue({ month: '' });
      this.appointmentForm.patchValue({ day: '' });
      this.appointmentForm.patchValue({ time: '' });
      this.dayList = [];
      this.timeList = [];
      this.scheduleService.getScheduleByYear(selectedYear).subscribe((res) => {
        this.scheduleService.setMonthList(res);
      });
    });
  }

  generateMonthList(): void {
    this.scheduleService.currentMonthList.subscribe((schedule) => {
      let { year } = this.appointmentForm.value;
      if (year !== '') {
        this.monthList = [];

        Object.values(schedule).map((sched: any) => {
          this.monthList.push(sched.month);
        });

        this.monthList.sort(function (a: any, b: any) {
          return months.indexOf(a) - months.indexOf(b);
        });
      }
    });
  }

  getDayList(): void {
    this.appointmentForm.get('month')?.valueChanges.subscribe((selectedMonth) => {
      const { year } = this.appointmentForm.value;

      if (year !== '' && selectedMonth) {
        this.appointmentForm.patchValue({ day: '' });
        this.appointmentForm.patchValue({ time: '' });
        this.timeList = [];
        this.scheduleService.getScheduleByYearMonth(year, selectedMonth).subscribe((res) => {
          this.scheduleService.setDayList(res);
        });
      }
    });
  }

  generateDayList(): void {
    this.scheduleService.currentDayList.subscribe((schedule: any) => {
      let { year, month } = this.appointmentForm.value;
      if (month !== '') {
        this.dayList = [];
        let selectedMonth = new Date(`${year}-${month}`);
        this.daysInMonth = new Date(parseInt(year), selectedMonth.getMonth() + 1, 0).getDate();

        if (year === this.currentYear && month === months[this.currentMonth]) {
          for (let i = 0; i < schedule.length; i++) {
            if (parseInt(schedule[i].day) >= this.currentDay) {
              this.dayList.push(schedule[i].day);
            }
          }
        } else {
          for (let i = 0; i < schedule.length; i++) {
            this.dayList.push(schedule[i].day);
          }
        }
      }
    });
  }

  getTimeList(): void {
    this.appointmentForm.get('day')?.valueChanges.subscribe((selectedDay) => {
      const { year, month } = this.appointmentForm.value;

      if (month !== '' && selectedDay) {
        this.appointmentForm.patchValue({ time: '' });
        this.scheduleService.getSchedule(year, month, selectedDay).subscribe((res: any) => {
          this.personsPerTable = res[0].persons;
          this.scheduleService.setTimeList(res);
        });
      }
    });
  }

  generateTimeList(): void {
    this.scheduleService.currentTimeList.subscribe((schedule) => {
      let { day } = this.appointmentForm.value;
      if (day !== '') {
        this.timeList = [];

        if (day !== '') {
          Object.values(schedule).map((sched: any) => {
            Object.values(sched.schedule).map((result: any) => {
              if (result.slots !== 0) {
                this.timeList.push({ time: result.time, tables: result.tables });
              }
            });
          });
        }
      }
    });
  }
}
