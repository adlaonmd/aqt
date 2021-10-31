import { Component, OnInit, Input } from '@angular/core';
import { AvailableSchedule } from 'src/app/interfaces/available-schedule';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-list-schedule-item',
  templateUrl: './list-schedule-item.component.html',
  styleUrls: ['./list-schedule-item.component.scss'],
})
export class ListScheduleItemComponent implements OnInit {
  @Input() sched!: AvailableSchedule;

  open: boolean = false;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {}

  viewSchedule(): void {
    this.open = !this.open;
  }

  deleteSchedule(schedule: any): void {
    this.scheduleService.deleteSchedule(schedule);
  }
}
