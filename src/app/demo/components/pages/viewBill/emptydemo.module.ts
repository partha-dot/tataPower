import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {NgxPrintModule} from 'ngx-print';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule,
        TableModule,
        ButtonModule,
        NgxPrintModule,
        ProgressSpinnerModule,
        ConfirmDialogModule,
        

    ],
    declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }
