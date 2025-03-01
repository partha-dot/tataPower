import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { FileDemoRoutingModule } from './filedemo-routing.module';
import { FileDemoComponent } from './filedemo.component';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { NgApexchartsModule } from "ng-apexcharts";
import { TableModule } from 'primeng/table';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FileDemoRoutingModule,
		FileUploadModule,
		DropdownModule,
		ConfirmDialogModule,
		CalendarModule,
		NgApexchartsModule,
		TableModule
	],
	declarations: [FileDemoComponent],
})
export class FileDemoModule { }
