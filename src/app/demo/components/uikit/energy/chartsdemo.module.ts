import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDemoRoutingModule } from './chartsdemo-routing.module';
import { ChartModule } from 'primeng/chart'
import { ChartsDemoComponent } from './chartsdemo.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';


@NgModule({
	imports: [
        TableModule,
		TabViewModule,
		DropdownModule,
		CommonModule,
		ChartsDemoRoutingModule,
		ChartModule,
		CalendarModule,
		InputTextModule,
		ButtonModule,
		AutoCompleteModule,
		FormsModule,
		ReactiveFormsModule,
		ConfirmDialogModule,
		ToastModule,
		InputSwitchModule,
		NgApexchartsModule,
		TabMenuModule

	],
	declarations: [ChartsDemoComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ChartsDemoModule { }
