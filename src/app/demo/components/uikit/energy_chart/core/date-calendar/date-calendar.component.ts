import { Component, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'date-calendar',
  templateUrl: './date-calendar.component.html',
  styleUrls: ['./date-calendar.component.scss']
})
export class DateCalendarComponent implements ControlValueAccessor {


  constructor(@Self() public ngControl:NgControl) {ngControl.valueAccessor = this;}
  writeValue(obj) {}
  registerOnChange(fn: Function) {}
  registerOnTouched(fn: Function) {}
  setDisabledState?(isDisabled: boolean) {}
}