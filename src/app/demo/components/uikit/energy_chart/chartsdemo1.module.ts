import { CUSTOM_ELEMENTS_SCHEMA, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDemo1RoutingModule } from './chartsdemo1-routing.module';
import { ChartModule } from 'primeng/chart'
import { ChartsDemo1Component } from './chartsdemo1.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { ChartContentHolderComponent } from './core/chart-content-holder/chart-content-holder.component';
import { FilterFormComponent } from './core/filter-form/filter-form.component';
import { DateCalendarComponent } from './core/date-calendar/date-calendar.component';
import { ApexChartCoreComponent } from './core/apex-chart-core/apex-chart-core.component';
@NgModule({
	imports: [
		TabViewModule,
		DropdownModule,
		CommonModule,
		ChartsDemo1RoutingModule,
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
		TabMenuModule,
        CardModule
	],
	declarations: [ChartsDemo1Component, ChartContentHolderComponent, FilterFormComponent, DateCalendarComponent, ApexChartCoreComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ChartsDemo1Module { }
