import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
    imports: [
        ConfirmDialogModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        ToastModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [LoginComponent],
    providers:[ApiService],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
      ],
})
export class LoginModule { }
