import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsDemo2Component } from './chartsdemo2.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ChartsDemo2Component }
	])],
	exports: [RouterModule]
})
export class ChartsDemo2RoutingModule { }
