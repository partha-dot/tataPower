import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { DialogModule } from 'primeng/dialog';
import { InvalidStateDemo2RoutingModule } from './invalidstatedemo2-routing.module';
import { InvalidStateDemo2Component } from './invalidstatedemo2.component';
import { DividerModule } from 'primeng/divider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
	imports: [
        DividerModule,ToastModule,ProgressSpinnerModule,
        DialogModule,
		CommonModule,
		FormsModule,
		InvalidStateDemo2RoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		PasswordModule,
		InputTextareaModule,
		InputTextModule,
        ReactiveFormsModule
	],
	declarations: [InvalidStateDemo2Component],
	providers: [MessageService,ConfirmationService]
})
export class InvalidStateDemo2Module { }
