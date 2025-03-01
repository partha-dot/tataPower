import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileDemo2Component } from './filedemo2.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FileDemo2Component }
	])],
	exports: [RouterModule]
})
export class FileDemoRoutingModule { }
