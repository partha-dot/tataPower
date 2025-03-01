import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCalendarComponent } from './date-calendar.component';

describe('DateCalendarComponent', () => {
  let component: DateCalendarComponent;
  let fixture: ComponentFixture<DateCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateCalendarComponent]
    });
    fixture = TestBed.createComponent(DateCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
