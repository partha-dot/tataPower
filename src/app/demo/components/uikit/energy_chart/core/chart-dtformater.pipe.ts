import { Pipe, PipeTransform } from '@angular/core';
import { IMDRainfall, IMDTemparature } from '../graphical-view/graphical-view.component';

@Pipe({
  name: 'chartDTFormater'
})
export class ChartDTFormaterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): unknown {
    switch(args[0]){
        case 'rainfall':return this.getRainfallData(value);
        default: return this.getOthersData(value,args[0]);
    }
    
  }

  getOthersData = (value,arg) =>{
  const obj:any =  [{
    name: arg.replace('_',' ').toUpperCase(),
    data: value.reverse().map(el => [new Date(el.date_time).getTime(),el[arg]])
  }]
  return obj;
  }

  getRainfallData(arr:Partial<IMDRainfall>[]){
      const rainfall = arr.map(el => [new Date(el.date_time).getTime(),el.rainfall]);
      const rainfall_cumulative = arr.map(el => [new Date(el.date_time).getTime(),el.rainfall_cumulative])
      const obj_arr = [
        {
          name:'RAINFALL',
          data:rainfall
        },
        {
          name:'CUMMULATIVE RAINFALL',
          data:rainfall_cumulative
        }
      ];
      return obj_arr;
  }
}
