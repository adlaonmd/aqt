import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule.service';
import { months } from '../../../months';
import { times } from '../../../times';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss', '../schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit {
  currentYear: string = new Date().getFullYear().toString();
  currentMonth: number = new Date().getMonth();
  currentDay: number = new Date().getDate();
  currentTime: string = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  yearList: string[] = [this.currentYear, `${(new Date().getFullYear() + 1).toString()}`];
  monthList!: string[];
  dayList!: string[];
  openingTimeList!: string[];
  closingTimeList!: string[];
  timeSpanList: number[] = [1, 2, 4];

  addScheduleForm!: FormGroup;
  daysInMonth!: number;

  existingSchedules!: any;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.addScheduleForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      day: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      timeSpan: ['', Validators.required],
      slots: ['', Validators.required],
      persons: ['', Validators.required],
    });

    this.getAvailableMonths();
    this.getAvailableDays();
    this.generateDayList();
    this.getAvailableOpeningTimes();
    this.getAvailableClosingTimes();
  }

  getAvailableMonths(): void {
    this.addScheduleForm.get('year')?.valueChanges.subscribe((selectedYear) => {
      this.addScheduleForm.patchValue({ month: '' });
      this.generateMonthList(selectedYear);
    });
  }

  generateMonthList(year: string): void {
    this.monthList = [];

    if (year === this.currentYear) {
      for (let i = this.currentMonth; i < months.length; i++) {
        this.monthList.push(months[i]);
      }
    } else {
      for (let i = 0; i < this.currentMonth; i++) {
        this.monthList.push(months[i]);
      }
    }
  }

  getAvailableDays(): void {
    this.addScheduleForm.get('month')?.valueChanges.subscribe((selectedMonth) => {
      if (selectedMonth !== '') {
        this.addScheduleForm.patchValue({ day: '' });
        this.dayList = [];
        this.scheduleService.getScheduleByYearMonth(this.addScheduleForm.value.year, selectedMonth).subscribe((res) => {
          this.scheduleService.setDayList(res);
        });
      }
    });
  }

  generateDayList(): void {
    this.scheduleService.currentDayList.subscribe((res: any) => {
      let { year, month } = this.addScheduleForm.value;
      if (month !== '') {
        let selectedMonth = new Date(`${year}-${month}`);
        this.daysInMonth = new Date(parseInt(year), selectedMonth.getMonth() + 1, 0).getDate();

        if (year === this.currentYear && month === months[this.currentMonth]) {
          for (let i = this.currentDay; i <= this.daysInMonth; i++) {
            this.dayList.push(i.toString());
          }
        } else {
          for (let i = 1; i <= this.daysInMonth; i++) {
            this.dayList.push(i.toString());
          }
        }

        for (let i = 0; i < res.length; i++) {
          this.dayList = this.dayList.filter((day) => day !== res[i].day);
        }
      }
    });
  }

  getAvailableOpeningTimes(): void {
    this.addScheduleForm.get('day')?.valueChanges.subscribe((selectedDay) => {
      this.addScheduleForm.patchValue({ openingTime: '' });
      this.generateOpeningTimeList(selectedDay);
    });
  }

  generateOpeningTimeList(day: string): void {
    this.openingTimeList = [];

    if (day !== '') {
      for (let i = 0; i < times.length - 1; i++) {
        this.openingTimeList.push(times[i]);
      }
    }
  }

  getAvailableClosingTimes(): void {
    this.addScheduleForm.get('openingTime')?.valueChanges.subscribe((selectedOpeningTime) => {
      this.addScheduleForm.patchValue({ closingTime: '' });
      this.generateClosingTimeList(selectedOpeningTime);
    });
  }

  generateClosingTimeList(openingTime: string): void {
    this.closingTimeList = [];

    if (openingTime !== '') {
      for (let i = 0; i < times.length; i++) {
        if (openingTime === times[i]) {
          if (i !== times.length - 1) {
            for (let j = i + 1; j < times.length; j++) {
              this.closingTimeList.push(times[j]);
            }
          }
        }
      }
    }
  }

  handleSubmit(): void {
    this.scheduleService.addSchedule(this.addScheduleForm.value).subscribe(
      (res) => {
        alert('Schedule added successfully');
      },
      (err) => {
        alert(err.error);
      }
    );
  }
}
