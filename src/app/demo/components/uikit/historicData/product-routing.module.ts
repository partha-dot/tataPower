import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';


@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ProductComponent }
	])],
	exports: [RouterModule]
})
export class ProductRoutingModule { }
