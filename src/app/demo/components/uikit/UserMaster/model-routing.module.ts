import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelComponent } from './model.component';


@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ModelComponent }
	])],
	exports: [RouterModule]
})
export class ModelRoutingModule { }
