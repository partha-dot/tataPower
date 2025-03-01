import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChartsDemoComponent } from '../uikit/energy/chartsdemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ChartsDemoComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
