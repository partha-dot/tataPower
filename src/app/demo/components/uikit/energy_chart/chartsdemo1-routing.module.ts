import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsDemo1Component } from './chartsdemo1.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ChartsDemo1Component }
	])],
	exports: [RouterModule]
})
export class ChartsDemo1RoutingModule { }
