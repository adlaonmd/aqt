import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { months } from '../../../months';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss', '../appointment.component.scss'],
})
export class ViewAppointmentComponent implements OnInit {
  currentYear: string = new Date().getFullYear().toString();
  currentMonth: number = new Date().getMonth();
  yearList: string[] = [this.currentYear, `${(new Date().getFullYear() + 1).toString()}`];
  monthList!: string[];
  dayList!: string[];
  viewAppointments: boolean = false;
  viewAppointmentsForm!: FormGroup;

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.viewAppointmentsForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      day: ['', Validators.required],
    });

    this.generateMonthList();
    this.generateDayList();
  }

  handleSubmit() {
    const { year, month, day } = this.viewAppointmentsForm.value;

    this.appointmentService.getAppointmentsByDay(year, month, day).subscribe((res) => {
      this.appointmentService.setAppointmentList(res);
      this.viewAppointments = true;
    });
  }

  generateMonthList(): void {
    this.viewAppointmentsForm.get('year')?.valueChanges.subscribe((selectedYear) => {
      this.monthList = months;
    });
  }

  generateDayList(): void {
    this.viewAppointmentsForm.get('month')?.valueChanges.subscribe((selectedMonth) => {
      this.viewAppointmentsForm.patchValue({ day: '' });
      this.dayList = [];

      const { year } = this.viewAppointmentsForm.value;

      let chosenMonth = new Date(`${year}-${selectedMonth}`);
      let daysInMonth = new Date(parseInt(year), chosenMonth.getMonth() + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {
        this.dayList.push(i.toString());
      }
    });
  }
}
