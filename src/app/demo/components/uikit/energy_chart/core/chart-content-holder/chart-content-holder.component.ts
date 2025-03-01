import { Component, Input } from '@angular/core';

@Component({
  selector: 'chart-content-holder',
  templateUrl: './chart-content-holder.component.html',
  styleUrls: ['./chart-content-holder.component.scss']
})
export class ChartContentHolderComponent{


    @Input() cardTitle:string | undefined = ''

    @Input() cardSubTitle:string | undefined = ''


}
