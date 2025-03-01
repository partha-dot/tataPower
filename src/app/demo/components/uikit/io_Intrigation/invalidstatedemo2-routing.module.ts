import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvalidStateDemo2Component } from './invalidstatedemo2.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InvalidStateDemo2Component }
	])],
	exports: [RouterModule]
})
export class InvalidStateDemo2RoutingModule { }
