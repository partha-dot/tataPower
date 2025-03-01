import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription, switchMap, timer } from 'rxjs';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexMarkers,
    ApexYAxis,
    ApexGrid,
    ApexTitleSubtitle,
    ApexLegend
  } from "ng-apexcharts";

  export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    tooltip: any; // ApexTooltip;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
  };


import { MessagesDemoComponent } from '../alert/messagesdemo.component';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket';
import { WebsocketService } from 'src/app/demo/service/web-socket.service';
import { Router } from '@angular/router';



  export interface WeatherData {
    atm_pressure: number;
    client_id: number;
    created_at: string;
    date: string;
    device: string;
    device_id: number;
    humidity: number;
    rainfall: number;
    rainfall_cumulative: number;
    runhr: number;
    solar_radiation: number;
    temperature: number;
    time: string;
    tw: number;
    updated_at: string | null;
    weather_data_id: number;
    wind_direction: number;
    wind_speed: number;
  }
@Component({
    selector:"app-chartsdemo",
    templateUrl: './chartsdemo.component.html',
    styleUrls:['./chartsdemo.component.scss'],

  providers: [MessageService, ConfirmationService, DatePipe]
})
export class ChartsDemoComponent implements OnInit, OnDestroy {
  @ViewChild(MessagesDemoComponent) msg!: MessagesDemoComponent;
    @ViewChild("chart") chart: ChartComponent;
    @ViewChild("chart2", { static: false }) chart2: ChartComponent
    public chartOptions: Partial<ChartOptions>;


  public activeOptionButton = "all";
  public updateOptionsData = {
    "1m": {
      xaxis: {
        min: new Date("28 Jan 2013").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    "6m": {
      xaxis: {
        min: new Date("27 Sep 2012").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    "1y": {
      xaxis: {
        min: new Date("27 Feb 2012").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    "1yd": {
      xaxis: {
        min: new Date("01 Jan 2013").getTime(),
        max: new Date("01 Jan 2013").getTime()
      }
    },
    all: {
      xaxis: {
        min: undefined,
        max: undefined
      }
    }
  };



    private websocketSubscription: Subscription;


    rpm: any;
    flow: any;
    flow2: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    donatoptions:any;

    donatdata:any;

    radarOptions: any;

    subscription: Subscription;
    spinner:boolean=false;
    selectedCountryAdvanced:any
    selectedDealer:any
    filteredCountries: any[] = [];
    filteredDealer: any[] = [];
    countries: any[] = [];
    selectedState: any = null;
    dealer!: any[];
    data1:any=[];
    cities:any=[];
    liveData:any=[];
    liveData2:any;
    currTm:any;
    currDt:any;
    flowData:any[]=[];
    flowDate:any[]=[];
    rpmData:any[]=[];
    rpmDate:any[]=[];
    user_type:any='';
    lastUpdateTime:any='';
    checked:boolean=true;
    options: any;
    options2: any;
    data: any;
    selectedAlert:any
    alert_type:string=''
    client_id:number=(+localStorage.getItem('c_id'));

    cities2:any=[
    {
      "unit_name": "Single Phase",
      "unit": "single"
    },
    {
      "unit_name": "Two Phase",
      "unit": "two"
    },
    {
      "unit_name": "Three Phase",
      "unit": "three"
    }];
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    ws: WebSocketSubject<any>;
    messages: string[] = [];
    currentDateTime: Date;
    private intervalId: any;

    selectedPhase:any={
    "unit_name": "Single Phase",
    "unit": "single"}
    selectedDevice:any;
    loginType:string=localStorage.getItem('loginType');
    WeatherData:any=[]

    atm_pressure:number=0;
    humidity:number=0;
    rainfall:number=0;
    rainfall_cumulative:number=0;
    solar_radiation:number=0;
    temperature:number=0;
    wind_direction:number=0;
    wind_speed:number=0;

    wsData:any;
    livechart:any[]=[];
    livechartForGraph:any[]=[];
    weekdayName: any[]=[];

    humidity1: any[]=[];
    rainfall1: any[]=[];
    rainfall_cum: any[]=[];
    solar_radiation1: any[]=[];
    temperature1: any[]=[];
    wind_direction1: any[]=[];
    atm_pressure1: any[]=[];
    wind_speed1: any[]=[];
    sig_st:any
    constructor(private router: Router,private datePipe: DatePipe,public layoutService: LayoutService, private authservice:AuthenticationService,


        private fb: FormBuilder,private http:HttpClient ,private productService: ProductService, private websocketService: WebsocketService,

        private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
        });

    }
    convertToISTDateTime(utcDatetime: string) {
        const utcDateTime = new Date(utcDatetime);
        const istTime = this.datePipe.transform(utcDateTime, 'dd-MM-yyyy HH:mm:ss', '+0530');
        return istTime || '';
      }
   ggg(){
    // //debugger
   }
    ngOnInit() {

        this.updateDateTime();
        this.intervalId = setInterval(() => this.updateDateTime(), 1000);

      this.items = [
        { label: 'Live', icon: 'pi pi-fw pi-home',routerLink: ['/app/outlet/alert']  },
        { label: 'device Info', icon: 'pi pi-fw pi-calendar',routerLink: ['/app/outlet/alert']  },
        { label: 'Graphical View', icon: 'pi pi-fw pi-pencil',routerLink: ['/app/outlet/alert']  },
        { label: 'Create Alert', icon: 'pi pi-fw pi-file',routerLink: ['/app/outlet/alert']  },
        { label: 'Historic Data', icon: 'pi pi-fw pi-cog',routerLink: ['/app/outlet/alert']  }
      ];
      this.activeItem = this.items[0];
        // //debugger
        this.getDevice();

        // setInterval(()=>{
        //     this.currTm= ' '+ '| '+ new Date().toString().substring(16,24)+ ' '
        //     this.currDt= new Date().toString().substring(0,15)
        //   ,1000})

        //   setInterval(() => {
        //     this.selectedDealer?.device_name ? this.getDeviceLiveData(this.selectedDealer?.device_name) : console.log('hii');
        //     this.getDevice();
        //   }, 20000);
    }

      private updateDateTime(): void {
        this.currentDateTime = new Date();
      }
     getWindDirection(degrees) {
        const directions = [
            "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
        ];

        // Normalize the degrees to a value between 0 and 360
        const normalizedDegrees = degrees % 360;

        // Calculate the index for the directions array
        const index = Math.round(normalizedDegrees / 22.5) % 16;

        return directions[index];
    }

    // Example usage
    //let wind_direction_val = 22.3;
//let wind_direction = getWindDirection(wind_direction_val);
   // console.log(wind_direction);  // Output: "NE"

    connectToWebSocket(c_id,d_id,d_name) {
      this.spinner=true;
      this.websocketSubscription = this.websocketService.connect(c_id,d_id,d_name)
        .subscribe(
          (message) => {
            this.spinner=false;
            console.log('Received message:', message);
            const jsonString = message
            const AllData: any = JSON.parse(jsonString);
            console.log(AllData);
            this.wsData=AllData.lastdata;
            this.WeatherData = AllData.lastdata;
            this.livechart = AllData.last10row;
            this.livechartForGraph = AllData.last10row;
            if(this.WeatherData){
                this.lastUpdateTime=''
                this.lastUpdateTime=this.convertToISTDateTime(this.WeatherData.created_at)
                console.log(this.lastUpdateTime);
            }
            if(this.livechart?.length>0){
            this.livechartForGraph.sort((a, b) => {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                  });
            this.initCharts();
            }
            else{
            this.initCharts();
            }
            // if(this.WeatherData){
            //     this.sig_st=this.convertToPercentage(this.WeatherData.tw).toFixed(0-2)
            // }
            this.atm_pressure=parseFloat(this.wsData?.atm_pressure?this.wsData?.atm_pressure.toFixed(2):0);
            this.humidity=parseFloat(this.wsData?.humidity?this.wsData?.humidity.toFixed(2):0);
            this.rainfall=parseFloat(this.wsData?.rainfall?this.wsData?.rainfall.toFixed(2):0);
            this.rainfall_cumulative=parseFloat(this.wsData?.rainfall_cumulative?this.wsData?.rainfall_cumulative.toFixed(2):0);
            this.solar_radiation=parseFloat(this.wsData?.solar_radiation?this.wsData?.solar_radiation.toFixed(2):0);
            this.temperature=parseFloat(this.wsData?.temperature?this.wsData?.temperature.toFixed(2):0);
            this.wind_direction=parseFloat(this.wsData?.wind_direction?this.wsData?.wind_direction.toFixed(2):0);
            this.wind_speed=parseFloat(this.wsData?.wind_speed?this.wsData?.wind_speed.toFixed(2):0);
            this.wind_speed=this.wind_speed/60;
            this.spinner=false;
            // Handle received message here
          },
          (error) => {
                if(error.status=='401'){
                this.router.navigate(['/']);
                debugger
                }
                console.log(error.status);
                this.spinner=false;
                console.error('WebSocket error:', error);
          },
          () => {
            this.spinner=false;
            console.log('WebSocket connection closed');
          }
        );

    }
    convertToPercentage(value: number): number {
        if (value < 0) {
          return 0;
        } else if (value > 30) {
          return 100;
        } else {
          return (value / 30) * 100;
        }
      }
    // ngOnDestroy() {
    //   this.websocketSubscription.unsubscribe();
    //   if (this.subscription) {
    //     this.subscription.unsubscribe();
    // }
    // }
    setPhase(i:any){
        debugger
        console.log(i,this.selectedPhase)
    }

    abc(){
        this.alert_type=''
        console.log(this.selectedAlert);
        this.alert_type=this.selectedAlert?.unit_name
        this.alert_type=' '+this.alert_type;
        //debugger
      }
    getDevice(){
        const credentials = {
            client_id:this.client_id
          };
    const apiUrl = this.api.baseUrl;
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.spinner=true;
  this.http.post(apiUrl+'/client/devices/list', credentials,{ headers }).subscribe(
      (response) => {
        console.log(response);
        this.spinner=false
        this.data1=response
        this.cities=this.data1.data
        this.selectedDealer=this.cities[0]
        this.getDeviceLiveData(this.selectedDealer.device,this.selectedDealer.device_id);

        console.log(this.selectedDealer);


      },
      (error) => {
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
        this.spinner=false
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
      }
    );
}

      dateConvt(timestamp:any){
      const dateObject = new Date(timestamp);

      // Extract month and day
      const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
      const day = String(dateObject.getDate()).padStart(2, '0');

      // Create the desired format
      const result = `${month}/${day}`;

      console.log(result);
      return result
      }
      getDeviceLiveData(name:any,id:number){

      this.connectToWebSocket(this.client_id,id,name);
      console.log(this.websocketService.socketStatus);
      this.spinner=true
      if(this.websocketService.resData){
        console.log(this.websocketService.resData);

      }
      debugger
        //  if(name){
        //     const token = localStorage.getItem('token');
        //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        //     this.liveData=[];
        //     this.liveData2=null;

        //     const credentials = {
        //         device_id:name
        //     };

        //     this.http.post(this.api.baseUrl+'/device-data/last', credentials, { headers }).subscribe(
        //         (response) => {

        //             console.log(response);

        //             this.data1=response
        //             this.data1=this.data1.data
        //             if(this.data1) {
        //                 this.flowDate=[]
        //                 this.flowData=[]
        //                 this.rpmDate=[]
        //                 this.rpmData=[]
        //                 this.liveData=this.data1.chart_data_list
        //                 this.liveData2=this.data1.device_data_list
        //                 this.liveData.forEach(e => {

        //                     this.flowDate.push(this.dateConvt(e.created_at))
        //                     this.flowData.push(e.flow)
        //                     this.rpmDate.push(this.dateConvt(e.created_at))
        //                     this.rpmData.push(e.rpm.toString())


        //                     console.log(this.flowDate);
        //                     console.log(this.flowData);
        //                     console.log(this.rpmDate);
        //                     console.log(this.rpmData);

        //                 });

        //                 if(this.flowDate && this.flowData && this.rpmDate && this.rpmData){
        //                     this.lastUpdateTime=''
        //                     this.lastUpdateTime=this.convertToISTDateTime(this.liveData2.created_at)
        //                     console.log(this.lastUpdateTime);
        //                     var currentdate = new Date();
        //                     var datetime = currentdate.getDate() + "-"
        //                         + (currentdate.getMonth()+1)  + "-"
        //                         + currentdate.getFullYear() + " "
        //                         + currentdate.getHours() + ":"
        //                         + currentdate.getMinutes() + ":"
        //                         + currentdate.getSeconds();
        //                         console.log(datetime);


        //                     this.initCharts();

        //                 }

        //             }


        //         },
        //         (error) => {
        // if(error.status=='401'){
        //   this.router.navigate(['/']);
        //   debugger
        //  }
        // console.log(error.status);
        //             console.error(error);
        //         }
        //         );
        //  }

}
        dateChange(i:any){
            const utcTimestamp = i;

            // Convert UTC timestamp to Date object
            const date = new Date(this.liveData2.created_at);

            // Set the desired timezone (in this case, +05:30)
            const timeZone = "Asia/Kolkata"; // Time zone identifier for Indian Standard Time

            // Options for formatting
            const options:any = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false, // 24-hour format
            timeZone: timeZone,
            };

            // Format the date
            const formattedDate = date.toLocaleString('en-US', options);

            console.log(formattedDate);
            return formattedDate
        }
    setDevice(){
        console.log(this.selectedDealer);

        this.getDeviceLiveData(this.selectedDealer.device,this.selectedDealer.device_id);


    }
    filterDealer(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.cities.length; i++) {
            const dealer = this.cities[i];
            if (dealer.device.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(dealer);

            }
        }

        this.filteredDealer = filtered;

    }
    getWeekdayName(dateString: string): string {
      const date = new Date(dateString);
      const options:any = { weekday: 'long' };
      return date.toLocaleDateString('en-US', options);
    }

    initCharts() {
      this.weekdayName=[];
      this.humidity1=[];
      this.humidity1=[];
      this.rainfall1=[];
      this.rainfall_cum=[];
      this.solar_radiation1=[];
      this.temperature1=[];
      this.wind_direction1=[];
      this.wind_speed1=[];
      this.atm_pressure1=[];
      this.livechartForGraph?.forEach(e=>{
        // e.day=this.getWeekdayName(e.date);
        this.weekdayName?.push(e.time);
        this.humidity1?.push(Number(e.humidity));
        this.rainfall1?.push(Number(e.rainfall));
        this.rainfall_cum?.push(Number(e.rainfall_cumulative));
        this.solar_radiation1?.push(Number(e.solar_radiation));
        this.temperature1?.push(Number(e.temperature));
        this.wind_direction1?.push(Number(e.wind_direction));
        this.atm_pressure1?.push(Number(e.atm_pressure));
        this.wind_speed1?.push(Number(e.wind_speed));
      })

        console.log(this.weekdayName);
        console.log(this.temperature1,);
        console.log(this.humidity1);
        console.log(this.wind_direction1);
        console.log(this.atm_pressure1);
        console.log(this.wind_speed1);
        console.log(this.rainfall1);
        console.log(this.solar_radiation1);


        this.chartOptions = {
            series: [
              {
                name: "DC(Phase-1)",
                data: this.temperature1
              },
              {
                name: "DC(Phase-2)",
                data: this.humidity1
              },
              {
                name: "DC(Phase-3)",
                data: this.atm_pressure1
              },
              {
                name: "AC(Phase-1)",
                data: this.wind_speed1
              }
              ,
              {
                name: "AC(Phase-2)",
                data: this.wind_direction1
              }
              ,
              {
                name: "AC(Phase-3) ",
                data: this.solar_radiation1
              }
            //   ,
            //   {
            //     name: "Rainfall",
            //     data: this.rainfall1
            //   },
            //   {
            //     name: "Rainfall Cumultive",
            //     data: this.rainfall_cum
            //   }
            ],
            chart: {
              height: 350,
              type: "line"
            },
            dataLabels: {
              enabled: false
            },
            // stroke: {
            //   width: 5,
            //   curve: "straight",
            //   dashArray: [0, 8, 5]
            // },
            title: {
              text: "Live Chart",
              align: "left"
            },
            // legend: {
            //   tooltipHoverFormatter: function(val, opts) {
            //     return (
            //       val +
            //       " - <strong>" +
            //       opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            //       "</strong>"
            //     );
            //   }
            // },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 6
              }
            },
            xaxis: {
              labels: {
                trim: false
              },
              categories: this.weekdayName
            //   [
            //     "01 Jan",
            //     "02 Jan",
            //     "03 Jan",
            //     "04 Jan",
            //     "05 Jan",
            //     "06 Jan",
            //     "07 Jan",
            //     "08 Jan",
            //     "09 Jan",
            //     "10 Jan",
            //     "11 Jan",
            //     "12 Jan"
            //   ]
            },
            tooltip: {
              y: [
                {
                  title: {
                    // formatter: function(val) {
                    //   return val + " (mins)";
                    // }
                  }
                },
                {
                  title: {
                    // formatter: function(val) {
                    //   return val + " per session";
                    // }
                  }
                },
                {
                  title: {
                    // formatter: function(val) {
                    //   return val;
                    // }
                  }
                }
              ]
            },
            grid: {
              borderColor: "#f1f1f1"
            }
          };




    }



    public generateDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
          var x = baseval;
          var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

          series.push([x, y]);
          baseval += 86400000;
          i++;
        }
        return series;
      }

    ngOnDestroy() {
      // this.websocketSubscription.unsubscribe();
        if (this.subscription) {
          this.subscription.unsubscribe();
      }
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

    }


}
