import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule.service';
import { months } from '../../../months';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss', '../schedule.component.scss'],
})
export class ViewScheduleComponent implements OnInit {
  currentYear: string = new Date().getFullYear().toString();
  currentMonth: number = new Date().getMonth();
  yearList: string[] = [this.currentYear, `${(new Date().getFullYear() + 1).toString()}`];
  monthList: string[] = months;
  viewSchedule: boolean = false;
  viewScheduleForm!: FormGroup;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.viewScheduleForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
    });
  }

  handleSubmit() {
    const { year, month } = this.viewScheduleForm.value;
    this.scheduleService.getScheduleByYearMonth(year, month).subscribe((res) => {
      this.scheduleService.setScheduleList(res);
      this.viewSchedule = true;
    });
  }
}
