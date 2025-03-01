import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDemo2RoutingModule } from './chartsdemo2-routing.module';
import { ChartModule } from 'primeng/chart'
import { ChartsDemo2Component } from './chartsdemo2.component';
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

@NgModule({
	imports: [
		TabViewModule,
		DropdownModule,
		CommonModule,
		ChartsDemo2RoutingModule,
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
	declarations: [ChartsDemo2Component],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ChartsDemo2Module { }
