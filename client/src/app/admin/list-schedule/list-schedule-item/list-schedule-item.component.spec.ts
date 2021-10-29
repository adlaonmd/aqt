import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleItemComponent } from './list-schedule-item.component';

describe('ListScheduleItemComponent', () => {
  let component: ListScheduleItemComponent;
  let fixture: ComponentFixture<ListScheduleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScheduleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
