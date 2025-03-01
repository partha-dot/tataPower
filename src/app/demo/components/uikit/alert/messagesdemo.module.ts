import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesDemoComponent } from './messagesdemo.component';
import { MessagesDemoRoutingModule } from './messagesdemo-routing.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { NgFor } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { BadgeModule } from 'primeng/badge';
@NgModule({
	imports: [
		InputNumberModule,
		TooltipModule,
		InputSwitchModule,
		CommonModule,
		MessagesDemoRoutingModule,
		MessagesModule,
		MessageModule,
		ButtonModule,
		InputTextModule,
		PasswordModule,
		FormsModule,
		TableModule,
		RatingModule,
		SliderModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
		DialogModule,
		ToolbarModule,
		ConfirmDialogModule,
		BadgeModule,
	ReactiveFormsModule,
	NgFor
	],
	declarations: [MessagesDemoComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MessagesDemoModule { }
