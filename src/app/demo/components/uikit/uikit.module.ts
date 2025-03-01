import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIkitRoutingModule } from './uikit-routing.module';
import { AuthenticationService } from '../../service/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { AgmCoreModule } from '@agm/core';
@NgModule({
	imports: [
		CommonModule,
		UIkitRoutingModule,
        // AgmCoreModule.forRoot({
        //   apiKey: 'AIzaSyAUnuPXweOavCoI5FlyO5z4UXf_6y74Zfg'
        // }),
	],
	declarations: [
	]
})
export class UIkitModule { }
