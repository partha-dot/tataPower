import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../service/authentication.service';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    providers:[JwtHelperService,AuthenticationService]
})
export class AuthModule { }
