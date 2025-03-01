import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit,AfterViewInit, ViewChild } from '@angular/core';
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
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexFill,
    ApexYAxis,
    ApexXAxis,
    ApexTooltip,
    ApexMarkers,
    ApexAnnotations,
    ApexStroke,
    ApexLegend,

  } from "ng-apexcharts";
import { MessagesDemoComponent } from '../alert/messagesdemo.component';
import { Router } from '@angular/router';

  export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
  };
  export type ChartOptions2 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    annotations: ApexAnnotations;
    colors: any;
    toolbar: any;
  };
  export type ChartOptions3 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    fill: ApexFill;
    stroke: ApexStroke;
    markers: ApexMarkers;
    colors: string[];
  };
  export type ChartOptions5 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    colors: string[];
    legend: ApexLegend;
    fill: ApexFill;
  };



@Component({
    selector:"app-chartsdemo2",
    templateUrl: './chartsdemo2.component.html',
    styleUrls:['./chartsdemo2.component.css'],

  providers: [MessageService, ConfirmationService, DatePipe]
})
export class ChartsDemo2Component implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild(MessagesDemoComponent) msg!: MessagesDemoComponent;
    @ViewChild("chart") chart: ChartComponent;
    @ViewChild("chart2", { static: false }) chart2: ChartComponent
    public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions2>;
  public chartOptions3: Partial<ChartOptions3>;
  public chartOptions33: Partial<ChartOptions3>;
  public chartOptions4: Partial<ChartOptions3>;
  public chartOptions5: Partial<ChartOptions5>;
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
    data2:any;
    selectedAlert:any
    alert_type:string=''
    client_id:number=(+localStorage.getItem('c_id'))
    cities2:any=[];
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    l_val:number=0
    cl_val:number=0
    h_val:number=0
    ch_val:number=0
    locations:any[]=[]
    loc:any={}
    spinner:boolean=false;

    loginType:string=localStorage.getItem('loginType')
    constructor(private router: Router,private datePipe: DatePipe,public layoutService: LayoutService, private authservice:AuthenticationService,
        private fb: FormBuilder,private http:HttpClient ,private productService: ProductService,
        private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            // this.initCharts();
        });

    }

   ngAfterViewInit(): void {
    this.initMap()
   }
    ngOnInit() {
      this.items = [
        { label: 'Live', icon: 'pi pi-fw pi-home',routerLink: ['/app/outlet/alert']  },
        { label: 'device Info', icon: 'pi pi-fw pi-calendar',routerLink: ['/app/outlet/alert']  },
        { label: 'Graphical View', icon: 'pi pi-fw pi-pencil',routerLink: ['/app/outlet/alert']  },
        { label: 'Create Alert', icon: 'pi pi-fw pi-file',routerLink: ['/app/outlet/alert']  },
        { label: 'Historic Data', icon: 'pi pi-fw pi-cog',routerLink: ['/app/outlet/alert']  }
      ];
      this.activeItem = this.items[0];
        debugger
        // this.initCharts();
        this.getDevice();
        this.getUnit();

        // setInterval(()=>{
        //     this.currTm= ' '+ '| '+ new Date().toString().substring(16,24)+ ' '
        //     this.currDt= new Date().toString().substring(0,15)
        //   ,1000})

        //   setInterval(() => {
        //     this.selectedDealer?.device_name ? this.getDeviceLiveData(this.selectedDealer?.device_name) : console.log('hii');
        //     this.getDevice();
        //   }, 20000);



    }
    initMap() {
        // Create a map centered at a specific location
        var map = new google.maps.Map(document.getElementById('map'));

        // Create a LatLngBounds object to encompass all markers
        var bounds = new google.maps.LatLngBounds();

        // Loop through each location and add a marker to the map
        this.locations.forEach(function(location) {
            var marker = new google.maps.Marker({
                position: {lat: location.lat, lng: location.lng},
                map: map,
                title: location.name,
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF5733" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="8"/></svg>'),
                    scaledSize: new google.maps.Size(24, 24) // Size of the marker
                },
            });

            // Extend the bounds to include this marker's position
            bounds.extend(marker.getPosition());
        });

        // Fit the map to the bounds
        map.fitBounds(bounds);

      }
    convertToISTDateTime(utcDatetime: string) {
      const utcDateTime = new Date(utcDatetime);
      const istTime = this.datePipe.transform(utcDateTime, 'dd-MM-yyyy HH:mm:ss', '+0530');
      return istTime || '';
    }
    ggg(){
      debugger
    }
    getUnit(){
      const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        this.spinner=true;
        this.http.post(apiUrl+'/client/unit/list', { headers }).subscribe(
            (response) => {
              this.spinner=false;
              console.log(response);
              const units:any=response;
              this.cities2=units.data;
              debugger
            },
            (error) => {
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
              this.spinner=false;
              console.error(error);
            }
          );
      }
    abc(){
        // this.alert_type=''
        // console.log(this.selectedAlert);
        // this.alert_type=this.selectedAlert?.unit_name
        // this.alert_type=' '+this.alert_type;
        debugger
        if(this.data2){
          this.l_val=0
          this.cl_val=0
          this.h_val=0
          this.ch_val=0
          this.data2.forEach(element => {
            if(element.alert_type=="4CH" && element.unit_id==this.selectedAlert?.unit_id)
              {
                this.ch_val=element.alert
              }
              if(element.alert_type=="3H" && element.unit_id==this.selectedAlert?.unit_id)
                {
                  this.h_val=element.alert
                }
                if(element.alert_type=="2L" && element.unit_id==this.selectedAlert?.unit_id)
                  {
                    this.l_val=element.alert
                  }
                  if(element.alert_type=="1CL" && element.unit_id==this.selectedAlert?.unit_id)
                    {
                      this.cl_val=element.alert
                    }
          });
        }
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
        this.spinner=false;
        console.log(response);

        this.data1=response
        this.cities=this.data1.data
        this.selectedDealer=this.cities[0]
        this.getDeviceLiveData(this.selectedDealer.device,this.selectedDealer.device_id);

      },
      (error) => {
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
        this.spinner=false;
        console.error(error);
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
getDeviceLiveData(name:any,id:any){
    // const apiUrl = this.api.baseUrl;
//   baseUrl = 'https://iot.wrongcode.in/backend/api';

  debugger
         if(name){
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

            this.liveData=[];
            this.liveData2=null;

            const credentials = {
              client_id:this.client_id,
                device_id:id,
                device:name
            };
            this.data1=[];
            this.spinner=true;
            this.http.post(this.api.baseUrl+'/client/devices/device_info', credentials, { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                    console.log(response);
                    const res:any=response
                    const res2=res.data
                    this.data1=res2.data
                    this.data2=res2.data2
                    if(this.data1){
                      this.loc={lat:0, lng:0, name:""}
                      this.loc.lat=(+this.data1.lat);
                      this.loc.lng=(+this.data1.lon);
                      this.loc.name="Kolkata"
                      console.log(this.loc);
                      this.locations.push(this.loc)
                      if(this.locations.length>0){
                        this.initMap();
                        console.log(this.locations);
                        debugger
                      }


                      debugger
                    }

                    // if(this.data1) {
                    //     this.flowDate=[]
                    //     this.flowData=[]
                    //     this.rpmDate=[]
                    //     this.rpmData=[]
                    //     this.liveData=this.data1.chart_data_list
                    //     this.liveData2=this.data1.device_data_list
                    //     this.liveData.forEach(e => {

                    //         this.flowDate.push(this.dateConvt(e.created_at))
                    //         this.flowData.push(e.flow)
                    //         this.rpmDate.push(this.dateConvt(e.created_at))
                    //         this.rpmData.push(e.rpm.toString())


                    //         console.log(this.flowDate);
                    //         console.log(this.flowData);
                    //         console.log(this.rpmDate);
                    //         console.log(this.rpmData);

                    //     });

                    //     if(this.flowDate && this.flowData && this.rpmDate && this.rpmData){
                    //         this.lastUpdateTime=''
                    //         this.lastUpdateTime=this.convertToISTDateTime(this.liveData2.created_at)
                    //         console.log(this.lastUpdateTime);
                    //         var currentdate = new Date();
                    //         var datetime = currentdate.getDate() + "-"
                    //             + (currentdate.getMonth()+1)  + "-"
                    //             + currentdate.getFullYear() + " "
                    //             + currentdate.getHours() + ":"
                    //             + currentdate.getMinutes() + ":"
                    //             + currentdate.getSeconds();
                    //             console.log(datetime);


                    //         // this.flowDate = this.flowDate.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                    //         // this.flowData = this.flowData.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                    //         // this.rpmDate = this.rpmDate.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                    //         // this.rpmData = this.rpmData.map(value => JSON.stringify(value).replace(/[{}]/g, ''));

                    //         this.initCharts();

                    //     }

                    // }


                },
                (error) => {
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
                    console.error(error);
                }
                );
         }

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
      this.l_val=0
      this.cl_val=0
      this.h_val=0
      this.ch_val=0
      this.cities2=[];
      this.data2=[];
      this.data1=[];
      this.locations=[];
        console.log(this.selectedDealer);
        debugger
        this.getDeviceLiveData(this.selectedDealer.device,this.selectedDealer.device_id);
        this.getUnit();

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



    public updateOptions(option: any): void {
        this.activeOptionButton = option;
        this.chart2.updateOptions(this.updateOptionsData[option], false, true, true);
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
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
