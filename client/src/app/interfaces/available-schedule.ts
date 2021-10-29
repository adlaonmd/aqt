export interface AvailableSchedule {
  _id: string;
  year: string;
  month: string;
  day: string;
  openingTime: string;
  closingTime: string;
  schedule: Array<Schedule>;
  persons: number;
}

interface Schedule {
  time: string;
  slots: number;
}
