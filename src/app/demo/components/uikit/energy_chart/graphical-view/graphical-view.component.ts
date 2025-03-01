import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map} from 'rxjs/operators';
import { ApiService } from 'src/app/demo/service/api.service';

@Component({
  selector: 'app-graphical-view',
  templateUrl: './graphical-view.component.html',
  styleUrls: ['./graphical-view.component.scss']
})
export class GraphicalViewComponent implements OnInit {

  constructor(private api: ApiService,private datePipe:DatePipe) { }
  device: IDeviceList[] = [];
  filtered_device: IDeviceList[] = [];

  md_temparature:Partial<IMDTemparature>[] = [];
  md_solar_radiation:Partial<IMDSolarRadiation>[] = [];
  md_atm_pressure:Partial<IMDAtmPressure>[] = [];
  md_humidity:Partial<IHumidity>[] = [];
  md_wind_speed:Partial<IMDWindspeed>[] = [];
  md_wind_direction:Partial<IMDWindDirection>[] = [];
  md_rainfall:Partial<IMDRainfall>[] = [];

  ngOnInit(): void {
    this.getDeviceList();
  }

  device_form: FormGroup = new FormGroup({
    device: new FormControl<Object | null>(null)
  })

  graph_date_form: FormGroup = new FormGroup({
    temparature: new FormGroup({
      start_date: new FormControl(new Date())
    }),
    rainfall: new FormGroup({
      start_date: new FormControl(new Date())
    }), atm_pressure: new FormGroup({
      start_date: new FormControl(new Date())
    }), solar_radiation: new FormGroup({
      start_date: new FormControl(new Date())
    }), humidity: new FormGroup({
      start_date: new FormControl(new Date())
    }), wind_speed: new FormGroup({
      start_date: new FormControl(new Date())
    }), wind_dir: new FormGroup({
      start_date: new FormControl(new Date())
    })
  })

  getDeviceList = () => {
    const c_id = Number(localStorage.getItem('c_id'));
    this.api.call_api(1, 'client/devices/list', { client_id: c_id })
      .pipe(map(x => x.data)).subscribe((res: IDeviceList[]) => {
        this.device = res;
        this.device_form.get('device').setValue(res[0]);
        setTimeout(() => {
          this.call_api_for_fillup_data_in_chart();
        }, 1000);
      })
  }
  filterDevice(event: any) {
    this.filtered_device = [];
    const query = event.query;
    this.filtered_device = this.device.filter((el: IDeviceList) => el.device.toLowerCase().indexOf(query.toLowerCase()) == 0);
  }

  call_api_for_fillup_data_in_chart = () =>{
    this.get_temparature_data(this.graph_date_form.get(['temparature','start_date']).value);
    this.get_solar_radiation_data(this.graph_date_form.get(['solar_radiation','start_date']).value)
    this.get_rainfall_data(this.graph_date_form.get(['rainfall','start_date']).value)
    this.get_atm_pressure_data(this.graph_date_form.get(['atm_pressure','start_date']).value)
    this.get_humidity_data(this.graph_date_form.get(['humidity','start_date']).value)
    this.get_wind_speed_data(this.graph_date_form.get(['wind_speed','start_date']).value);
    this.get_wind_direction_data(this.graph_date_form.get(['wind_dir','start_date']).value);
  }

  ngAfterViewInit(){
    this.graph_date_form.get(['temparature','start_date']).valueChanges.subscribe(res =>{
      this.get_temparature_data(res);
    })
    this.graph_date_form.get(['rainfall','start_date']).valueChanges.subscribe(res =>{
      this.get_rainfall_data(res);
    })
    this.graph_date_form.get(['atm_pressure','start_date']).valueChanges.subscribe(res =>{
      this.get_atm_pressure_data(res);
    })
    this.graph_date_form.get(['solar_radiation','start_date']).valueChanges.subscribe(res =>{
      this.get_solar_radiation_data(res);
    })
    this.graph_date_form.get(['humidity','start_date']).valueChanges.subscribe(res =>{
      this.get_humidity_data(res);
    })
    this.graph_date_form.get(['wind_speed','start_date']).valueChanges.subscribe(res =>{
      this.get_wind_speed_data(res);
    })

    this.graph_date_form.get(['wind_dir','start_date']).valueChanges.subscribe(res =>{
      this.get_wind_direction_data(res);
    })


  }



  get_payload(date:Date):Promise<IPayload | null>{
    return new Promise((resolve,reject)=>{
      if(this.device_form.value.device){
        const dt:IPayload = {
          ...this.device_form.value.device,
           start_date: this.datePipe.transform(date,'YYYY-MM-dd')
         }
         try{
           resolve(dt)
         }
         catch(err){
              //console.log(err);
             reject(null)
         }
      }
      else{
        reject(null)
      }
       
    })
  }

  setDevice(){
    console.log('sss')
      this.call_api_for_fillup_data_in_chart();
  }

  /*** Get Temparature Data For Chart */
  get_temparature_data(date:Date){
      this.get_payload(date).then((res) =>{
         this.api.call_api(1,'client/devices/graphical_view/temperature',res)
         .pipe(map(x => x.data))
         .subscribe((result:Partial<IMDTemparature>[]) =>{
          this.md_temparature = result;
         })
      },
    err =>{
      // //console.log(err)
    }
    )
  }
  /*** End */

  
  /*** Get Solar Radiation Data For Chart */
  get_solar_radiation_data(date:Date){
    this.get_payload(date).then(res =>{
       this.api.call_api(1,'client/devices/graphical_view/solar_radiation',res)
       .pipe(map(x => x.data)).subscribe((result:Partial<IMDSolarRadiation>[]) =>{
        this.md_solar_radiation = result;
       })
    },
    err =>{
      //console.log(err)
    }
    )
  }
  /*** End */

  /*** Get Rainfall Data For Chart */
  get_rainfall_data(date:Date){
    this.get_payload(date).then(res =>{
        this.api.call_api(1,'client/devices/graphical_view/rainfall',res)
        .pipe(map(x => x.data))
        .subscribe((result:Partial<IMDRainfall>[]) =>{
          this.md_rainfall = result;
        })
    },
    err =>{
      //console.log(err)
    }
  )
  }
  /*** End */

  /*** Get Atm Pressure Data For Chart */
  get_atm_pressure_data(date:Date){
      this.get_payload(date).then(res =>{
        this.api.call_api(1,'client/devices/graphical_view/atm_pressure',res)
        .pipe(map(x => x.data)).subscribe((result:Partial<IMDAtmPressure>[]) =>{
          this.md_atm_pressure = result
        })
      },
    err =>{
      //console.log(err)
    }
    )
  }
  /*** End */

  /*** Get Humidity Data For Chart */
  get_humidity_data(date:Date){
    this.get_payload(date).then(res =>{
        this.api.call_api(1,'client/devices/graphical_view/humidity',res)
        .pipe(map(x => x.data)).subscribe((result:Partial<IHumidity>[]) =>{
          // console.log(result)
          this.md_humidity = result
        })
    },
    err =>{
      //console.log(err)
    }
  )
  }
  /*** End */

  /*** Get Wind Direction Data For Chart */
  get_wind_direction_data(date:Date){
    this.get_payload(date).then(res =>{
        this.api.call_api(1,'client/devices/graphical_view/wind_direction',res)
        .pipe(map(x => x.data))
        .subscribe((result:Partial<IMDWindDirection>[]) =>{
          this.md_wind_direction = result;
        })
    },
    err =>{
      //console.log(err)
    }
  )
  }
  /*** End */

  /*** Get Wind Speed Data For Chart */
  get_wind_speed_data(date:Date){
    this.get_payload(date).then(res =>{
        this.api.call_api(1,'client/devices/graphical_view/wind_speed',res)
        .pipe(map(x => x.data))
        .subscribe((result:Partial<IMDWindspeed>[]) =>{
          this.md_wind_speed = result
        })
    },
    err =>{
      //console.log(err)
    }
  )
  }
  /*** End */
}

export interface IDeviceList {
  device_id: number;
  device: string;
}


export interface IPayload{
      device_id:number,
      device:string,
      start_date:Date
}

export interface IMDTemparature{
  date:Date;
  temperature:number
  time:string
  date_time:string
}

export interface IMDSolarRadiation {
  date_time: string
  date: string
  time: string
  solar_radiation: number
}

export interface IMDAtmPressure {
  date_time: string
  date: string
  time: string
  atm_pressure: number
}

export interface IHumidity {
  date_time: string
  date: string
  time: string
  humidity: number
}

export interface IMDWindspeed {
  date_time: string
  date: string
  time: string
  wind_speed: number
}

export interface IMDWindDirection{
  date_time: string
  date: string
  time: string
  wind_direction: number
}

export interface IMDRainfall{
  date_time: string;
  date: string;
  time: string;
  rainfall: number;
  rainfall_cumulative: number;
}