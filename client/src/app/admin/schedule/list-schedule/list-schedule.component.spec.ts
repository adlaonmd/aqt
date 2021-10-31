import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleComponent } from './list-schedule.component';

describe('ListScheduleComponent', () => {
  let component: ListScheduleComponent;
  let fixture: ComponentFixture<ListScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
