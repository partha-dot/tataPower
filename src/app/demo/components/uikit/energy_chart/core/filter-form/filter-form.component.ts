import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormGroup, NgControl } from '@angular/forms';

@Component({
  selector: 'filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements ControlValueAccessor {


    @Input({required:true}) _graphical_view_menus:Required<{name:string,code:string}>[] = [];

    @Output() onChange:EventEmitter<{name:string,code:string}> = new EventEmitter();

    constructor(@Self() public ngControl:NgControl) {ngControl.valueAccessor = this;}
    writeValue(obj) {}
    registerOnChange(fn: Function) {}
    registerOnTouched(fn: Function) {}
    setDisabledState?(isDisabled: boolean) {}

    ngAfterViewInit():void{
        this.ngControl.valueChanges.subscribe(res =>{
            this.onChange.emit(res);
        })
    }

}
