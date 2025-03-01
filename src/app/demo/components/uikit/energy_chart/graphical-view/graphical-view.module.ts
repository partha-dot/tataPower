import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GraphicalViewComponent } from './graphical-view.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChartContentHolderComponent } from '../core/chart-content-holder/chart-content-holder.component';
import { CalendarModule } from 'primeng/calendar';
import { DateCalendarComponent } from '../core/date-calendar/date-calendar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChartCoreComponent } from '../core/apex-chart-core/apex-chart-core.component';
import { ChartDTFormaterPipe } from '../core/chart-dtformater.pipe';
const routes:Routes = [
  {
    path:'',
    component:GraphicalViewComponent
  }
]

@NgModule({
  declarations: [
    ChartDTFormaterPipe,
    GraphicalViewComponent,ChartContentHolderComponent,DateCalendarComponent,ApexChartCoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    NgApexchartsModule,
  ],
  exports:[ChartContentHolderComponent],
  providers:[DatePipe]
})
export class GraphicalViewModule { }
