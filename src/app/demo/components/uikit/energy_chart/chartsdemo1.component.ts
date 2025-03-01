import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, pipe, pluck, Subscription, switchMap, timer } from 'rxjs';
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
    ApexPlotOptions,

  } from "ng-apexcharts";
import { MessagesDemoComponent } from '../alert/messagesdemo.component';
import { api_name } from 'src/app/demo/constants/apiName';
import { IWeatherUsed } from './energy_chart.model';
import GraphicalViewFilter from '../../../../../assets/demo/data/graphicalViewFilter.json';
import { DropdownFilterOptions } from 'primeng/dropdown';

  export enum RANGE_TYPE{
      MAX="E", // end date
      MIN="S", // start date
  }



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
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
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
  export type ChartOptionsX = {
    series: ApexAxisChartSeries;
    chart: any; //ApexChart;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    grid: any; //ApexGrid;
    colors: any;
    toolbar: any;
  };
  export type ChartOptions6 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    stroke: ApexStroke;
    markers: ApexMarkers;
    fill: ApexFill;
    tooltip: ApexTooltip;
  };
  export type ChartOptions7 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    stroke: ApexStroke;
    markers: ApexMarkers;
    fill: ApexFill;
    tooltip: ApexTooltip;
  };
  export type ChartOptions8 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    stroke: ApexStroke;
    markers: ApexMarkers;
    fill: ApexFill;
    tooltip: ApexTooltip;
  };
  export const data2 = [
    [1327359600000, 30.95],
    [1327446000000, 31.34],
    [1327532400000, 31.18],
    [1327618800000, 31.05],
    [1327878000000, 31.0],
    [1327964400000, 30.95],
    [1328050800000, 31.24],
    [1328137200000, 31.29],
    [1328223600000, 31.85],
    [1328482800000, 31.86],
    [1328569200000, 32.28],
    [1328655600000, 32.1],
    [1328742000000, 32.65],
    [1328828400000, 32.21],
    [1329087600000, 32.35],
    [1329174000000, 32.44],
    [1329260400000, 32.46],
    [1329346800000, 32.86],
    [1329433200000, 32.75],
    [1329778800000, 32.54],
    [1329865200000, 32.33],
    [1329951600000, 32.97],
    [1330038000000, 33.41],
    [1330297200000, 33.27],
    [1330383600000, 33.27],
    [1330470000000, 32.89],
    [1330556400000, 33.1],
    [1330642800000, 33.73],
    [1330902000000, 33.22],
    [1330988400000, 31.99],
    [1331074800000, 32.41],
    [1331161200000, 33.05],
    [1331247600000, 33.64],
    [1331506800000, 33.56],
    [1331593200000, 34.22],
    [1331679600000, 33.77],
    [1331766000000, 34.17],
    [1331852400000, 33.82],
    [1332111600000, 34.51],
    [1332198000000, 33.16],
    [1332284400000, 33.56],
    [1332370800000, 33.71],
    [1332457200000, 33.81],
    [1332712800000, 34.4],
    [1332799200000, 34.63],
    [1332885600000, 34.46],
    [1332972000000, 34.48],
    [1333058400000, 34.31],
    [1333317600000, 34.7],
    [1333404000000, 34.31],
    [1333490400000, 33.46],
    [1333576800000, 33.59],
    [1333922400000, 33.22],
    [1334008800000, 32.61],
    [1334095200000, 33.01],
    [1334181600000, 33.55],
    [1334268000000, 33.18],
    [1334527200000, 32.84],
    [1334613600000, 33.84],
    [1334700000000, 33.39],
    [1334786400000, 32.91],
    [1334872800000, 33.06],
    [1335132000000, 32.62],
    [1335218400000, 32.4],
    [1335304800000, 33.13],
    [1335391200000, 33.26],
    [1335477600000, 33.58],
    [1335736800000, 33.55],
    [1335823200000, 33.77],
    [1335909600000, 33.76],
    [1335996000000, 33.32],
    [1336082400000, 32.61],
    [1336341600000, 32.52],
    [1336428000000, 32.67],
    [1336514400000, 32.52],
    [1336600800000, 31.92],
    [1336687200000, 32.2],
    [1336946400000, 32.23],
    [1337032800000, 32.33],
    [1337119200000, 32.36],
    [1337205600000, 32.01],
    [1337292000000, 31.31],
    [1337551200000, 32.01],
    [1337637600000, 32.01],
    [1337724000000, 32.18],
    [1337810400000, 31.54],
    [1337896800000, 31.6],
    [1338242400000, 32.05],
    [1338328800000, 31.29],
    [1338415200000, 31.05],
    [1338501600000, 29.82],
    [1338760800000, 30.31],
    [1338847200000, 30.7],
    [1338933600000, 31.69],
    [1339020000000, 31.32],
    [1339106400000, 31.65],
    [1339365600000, 31.13],
    [1339452000000, 31.77],
    [1339538400000, 31.79],
    [1339624800000, 31.67],
    [1339711200000, 32.39],
    [1339970400000, 32.63],
    [1340056800000, 32.89],
    [1340143200000, 31.99],
    [1340229600000, 31.23],
    [1340316000000, 31.57],
    [1340575200000, 30.84],
    [1340661600000, 31.07],
    [1340748000000, 31.41],
    [1340834400000, 31.17],
    [1340920800000, 32.37],
    [1341180000000, 32.19],
    [1341266400000, 32.51],
    [1341439200000, 32.53],
    [1341525600000, 31.37],
    [1341784800000, 30.43],
    [1341871200000, 30.44],
    [1341957600000, 30.2],
    [1342044000000, 30.14],
    [1342130400000, 30.65],
    [1342389600000, 30.4],
    [1342476000000, 30.65],
    [1342562400000, 31.43],
    [1342648800000, 31.89],
    [1342735200000, 31.38],
    [1342994400000, 30.64],
    [1343080800000, 30.02],
    [1343167200000, 30.33],
    [1343253600000, 30.95],
    [1343340000000, 31.89],
    [1343599200000, 31.01],
    [1343685600000, 30.88],
    [1343772000000, 30.69],
    [1343858400000, 30.58],
    [1343944800000, 32.02],
    [1344204000000, 32.14],
    [1344290400000, 32.37],
    [1344376800000, 32.51],
    [1344463200000, 32.65],
    [1344549600000, 32.64],
    [1344808800000, 32.27],
    [1344895200000, 32.1],
    [1344981600000, 32.91],
    [1345068000000, 33.65],
    [1345154400000, 33.8],
    [1345413600000, 33.92],
    [1345500000000, 33.75],
    [1345586400000, 33.84],
    [1345672800000, 33.5],
    [1345759200000, 32.26],
    [1346018400000, 32.32],
    [1346104800000, 32.06],
    [1346191200000, 31.96],
    [1346277600000, 31.46],
    [1346364000000, 31.27],
    [1346709600000, 31.43],
    [1346796000000, 32.26],
    [1346882400000, 32.79],
    [1346968800000, 32.46],
    [1347228000000, 32.13],
    [1347314400000, 32.43],
    [1347400800000, 32.42],
    [1347487200000, 32.81],
    [1347573600000, 33.34],
    [1347832800000, 33.41],
    [1347919200000, 32.57],
    [1348005600000, 33.12],
    [1348092000000, 34.53],
    [1348178400000, 33.83],
    [1348437600000, 33.41],
    [1348524000000, 32.9],
    [1348610400000, 32.53],
    [1348696800000, 32.8],
    [1348783200000, 32.44],
    [1349042400000, 32.62],
    [1349128800000, 32.57],
    [1349215200000, 32.6],
    [1349301600000, 32.68],
    [1349388000000, 32.47],
    [1349647200000, 32.23],
    [1349733600000, 31.68],
    [1349820000000, 31.51],
    [1349906400000, 31.78],
    [1349992800000, 31.94],
    [1350252000000, 32.33],
    [1350338400000, 33.24],
    [1350424800000, 33.44],
    [1350511200000, 33.48],
    [1350597600000, 33.24],
    [1350856800000, 33.49],
    [1350943200000, 33.31],
    [1351029600000, 33.36],
    [1351116000000, 33.4],
    [1351202400000, 34.01],
    [1351638000000, 34.02],
    [1351724400000, 34.36],
    [1351810800000, 34.39],
    [1352070000000, 34.24],
    [1352156400000, 34.39],
    [1352242800000, 33.47],
    [1352329200000, 32.98],
    [1352415600000, 32.9],
    [1352674800000, 32.7],
    [1352761200000, 32.54],
    [1352847600000, 32.23],
    [1352934000000, 32.64],
    [1353020400000, 32.65],
    [1353279600000, 32.92],
    [1353366000000, 32.64],
    [1353452400000, 32.84],
    [1353625200000, 33.4],
    [1353884400000, 33.3],
    [1353970800000, 33.18],
    [1354057200000, 33.88],
    [1354143600000, 34.09],
    [1354230000000, 34.61],
    [1354489200000, 34.7],
    [1354575600000, 35.3],
    [1354662000000, 35.4],
    [1354748400000, 35.14],
    [1354834800000, 35.48],
    [1355094000000, 35.75],
    [1355180400000, 35.54],
    [1355266800000, 35.96],
    [1355353200000, 35.53],
    [1355439600000, 37.56],
    [1355698800000, 37.42],
    [1355785200000, 37.49],
    [1355871600000, 38.09],
    [1355958000000, 37.87],
    [1356044400000, 37.71],
    [1356303600000, 37.53],
    [1356476400000, 37.55],
    [1356562800000, 37.3],
    [1356649200000, 36.9],
    [1356908400000, 37.68],
    [1357081200000, 38.34],
    [1357167600000, 37.75],
    [1357254000000, 38.13],
    [1357513200000, 37.94],
    [1357599600000, 38.14],
    [1357686000000, 38.66],
    [1357772400000, 38.62],
    [1357858800000, 38.09],
    [1358118000000, 38.16],
    [1358204400000, 38.15],
    [1358290800000, 37.88],
    [1358377200000, 37.73],
    [1358463600000, 37.98],
    [1358809200000, 37.95],
    [1358895600000, 38.25],
    [1358982000000, 38.1],
    [1359068400000, 38.32],
    [1359327600000, 38.24],
    [1359414000000, 38.52],
    [1359500400000, 37.94],
    [1359586800000, 37.83],
    [1359673200000, 38.34],
    [1359932400000, 38.1],
    [1360018800000, 38.51],
    [1360105200000, 38.4],
    [1360191600000, 38.07],
    [1360278000000, 39.12],
    [1360537200000, 38.64],
    [1360623600000, 38.89],
    [1360710000000, 38.81],
    [1360796400000, 38.61],
    [1360882800000, 38.63],
    [1361228400000, 38.99],
    [1361314800000, 38.77],
    [1361401200000, 38.34],
    [1361487600000, 38.55],
    [1361746800000, 38.11],
    [1361833200000, 38.59],
    [1361919600000, 39.6]
  ];


@Component({
    selector:"app-chartsdemo1",
    templateUrl: './chartsdemo1.component.html',
    styleUrls:['./chartsdemo1.component.scss'],

  providers: [MessageService, ConfirmationService, DatePipe]
})
export class ChartsDemo1Component implements OnInit, OnDestroy {


    /**** Graphical View Form belongs to filter */
    graphical_view = new FormGroup({
            weather_used: new FormControl(GraphicalViewFilter[0]),
            voltage:new FormControl(GraphicalViewFilter[0]),
            current: new FormControl(GraphicalViewFilter[0]),
            power: new FormControl(GraphicalViewFilter[0]),
            kvar_kw_kva: new FormControl(GraphicalViewFilter[0])
    })
    /*** End */

    /**** Holding  Graphical View Filter Menus*/
    graphical_view_filter_menu:Required<{name:string,code:string}>[] = GraphicalViewFilter;
    /**** End */

    weatherUsed:Partial<IWeatherUsed>[]=[];




  @ViewChild(MessagesDemoComponent) msg!: MessagesDemoComponent;
    @ViewChild("chart") chart: ChartComponent;
    @ViewChild("chart2", { static: false }) chart2: ChartComponent
    public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions2>;
  public chartOptions3: Partial<ChartOptions3>;
  public chartOptions33: Partial<ChartOptions3>;
  public chartOptions4: Partial<ChartOptions3>;
  public chartOptions5: Partial<ChartOptions5>;

  public chartOptions6: Partial<ChartOptions6>;
  public chartOptions7: Partial<ChartOptions7>;
  public chartOptions8: Partial<ChartOptions8>;
  public chart1options: Partial<ChartOptionsX>;
  public chart2options: Partial<ChartOptionsX>;
  public chart3options: Partial<ChartOptionsX>;
  public commonOptions: Partial<ChartOptionsX> = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    toolbar: {
      tools: {
        selection: false
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: "dark",
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return "";
          }
        }
      }
    },
    grid: {
      clipMarkers: false
    },
    xaxis: {
      type: "datetime"
    }
  };
  public activeOptionButton = "1yd";
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

  weather_filter = new FormGroup({
      voltage_date_time:new FormControl([new Date(),new Date()]),
      current_date_time:new FormControl([new Date(),new Date()]),
      power_date_time:new FormControl([new Date(),new Date()]),

  })

  defaultDate:Date;
    title = 'My first AGM project';
    lat = 51.678418;
    lng = 7.809007;

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
    selectedAlert:any
    alert_type:string=''
    client_id:number=(+localStorage.getItem('c_id'))
    cities2:any=[
    {
      "unit_name": "Voltage",
      "unit": "volt"
    },
    {
      "unit_name": "Current",
      "unit": "ampere"
    },
    {
      "unit_name": "Power",
      "unit": "watt"
    },
    {
      "unit_name": "Frequency",
      "unit": "hertz"
    }];
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;


    loginType:string=localStorage.getItem('loginType')
    constructor(private datePipe: DatePipe,public layoutService: LayoutService, private authservice:AuthenticationService,
        private fb: FormBuilder,private http:HttpClient ,private productService: ProductService,
        private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            // this.initCharts();
        });
        this.defaultDate = new Date();
    }
    convertToISTDateTime(utcDatetime: string) {
        const utcDateTime = new Date(utcDatetime);
        const istTime = this.datePipe.transform(utcDateTime, 'dd-MM-yyyy HH:mm:ss', '+0530');
        return istTime || '';
      }
   ggg(){
    // debugger
   }
    ngOnInit() {

    // console.log(new Date("28 Jan 2013").getTime());

      this.items = [
        { label: 'Live', icon: 'pi pi-fw pi-home',routerLink: ['/app/outlet/alert']  },
        { label: 'device Info', icon: 'pi pi-fw pi-calendar',routerLink: ['/app/outlet/alert']  },
        { label: 'Graphical View', icon: 'pi pi-fw pi-pencil',routerLink: ['/app/outlet/alert']  },
        { label: 'Create Alert', icon: 'pi pi-fw pi-file',routerLink: ['/app/outlet/alert']  },
        { label: 'Historic Data', icon: 'pi pi-fw pi-cog',routerLink: ['/app/outlet/alert']  }
      ];
      this.activeItem = this.items[0];
        // debugger
        this.initCharts();
        this.getDevice();

        // setTimeout(() => {
        //     // this.getWeatherUsedByFilter('1yd');
        //     // this.getVoltagechartDataByFilterDate(this.weather_filter.value.voltage_date_time);
        //     // this.getCurrentchartDataByFilterDate(this.weather_filter.value.current_date_time)
        //     // this.getPowerchartDataByFilterDate(this.weather_filter.value.current_date_time)
        // },1000);


        // setInterval(()=>{
        //     this.currTm= ' '+ '| '+ new Date().toString().substring(16,24)+ ' '
        //     this.currDt= new Date().toString().substring(0,15)
        //   ,1000})

        //   setInterval(() => {
        //     this.selectedDealer?.device_name ? this.getDeviceLiveData(this.selectedDealer?.device_name) : console.log('hii');
        //     this.getDevice();
        //   }, 20000);



    }



    /** Get Voltage Data by filtered Date
     * @param data: array of search Date
    */
    getVoltagechartDataByFilterDate = (data:Date[] | null = [new Date(), new Date()]) =>{
    const dt:Partial<IWeatherVoltagePowerUsedPayLoad> ={
            "client_id": this.client_id,
            "device_id": this.selectedDealer.device_id,
            "device": this.selectedDealer.device,
            "start_date_time": data[0],
            "end_date_time":data[1]
        }

        this.api.call_api(1,api_name.VOLTAGE_USED,dt)
        .pipe(map((x:any) => x.data))
        .subscribe(res =>{
            if(res.length > 0){
            let arr :Required<{name:string,type:string,data:number[]}>[] =
            [
                    {name: "R",type: "line",data: []},
                    {name: "Y",type: "line",data: []},
                    {name: "B",type: "line",data: []},
                    {name: "R-Y",type: "line",data: []},
                    {name: "Y-B",type: "line",data: []},
                    {name: "B-Y",type: "line",data: []}
                ]
                let date = [];
                res.forEach(el =>{
                    date.push(this.datePipe.transform(el.created_at,'hh:mm'));
                    Object.keys(el).forEach(item =>{
                        arr = arr.filter(element =>{
                            if(element.name.toLowerCase().replace('-','_') === item.toLowerCase()){
                                element.data.push(el[item])
                            }
                            return arr
                        })
                    })
                    })
                    this.chartOptions6 = {
                        series:arr,
                        chart: {
                        height: 350,
                        type: "line"
                        },
                        stroke: {
                        curve: "smooth"
                        },
                        fill: {
                        type: "solid",
                        opacity: [0.35, 1]
                        },
                        labels: date,
                        markers: {
                        size: 0
                        },
                        xaxis: {
                        labels: {
                            formatter: function(y) {
                            if (typeof y !== "undefined") {
                                return y + " ";
                            }
                            return y;
                            }
                        }
                        },
                        tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: function(y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(2) + " ";
                            }
                            return y;
                            }
                        }
                        }
                    };
                }
        })
    }
    /** End */



     /** Get Voltage Data by filtered Date
     * @param data: array of search Date
    */
      getCurrentchartDataByFilterDate = (data:Date[] | null = [new Date(), new Date()]) =>{
        const dt:Partial<IWeatherVoltagePowerUsedPayLoad> ={
                "client_id": this.client_id,
                "device_id": this.selectedDealer.device_id,
                "device": this.selectedDealer.device,
                "start_date_time": data[0],
                "end_date_time":data[1]
            }

            this.api.call_api(1,api_name.CURRENT_USED,dt)
            .pipe(map((x:any) => x.data))
            .subscribe((res) =>{
                if(res.length > 0){
                let arr :Required<{name:string,type:string,data:number[],filteredBy:string}>[] =
                [
                        {name: "Current Phase-1",type: "line",data: [],filteredBy:'curr1'},
                        {name: "Current Phase-2",type: "line",data: [],filteredBy:'curr2'},
                        {name: "Current Phase-3",type: "line",data: [],filteredBy:'curr3'}
                    ]
                    let date = [];
                    res.forEach(el =>{
                        date.push(this.datePipe.transform(el.created_at,'hh:mm'));
                        Object.keys(el).forEach(item =>{
                            arr = arr.filter(element =>{
                                if(element.filteredBy.toLowerCase().replace('-','_') === item.toLowerCase()){
                                    element.data.push(el[item])
                                }
                                return arr
                            })
                        })
                        })
                        this.chartOptions7 = {
                            series: arr,
                            chart: {
                              height: 350,
                              type: "line"
                            },
                            stroke: {
                              curve: "smooth"
                            },
                            fill: {
                              type: "solid",
                              opacity: [0.35, 1]
                            },
                            labels: date,
                            markers: {
                              size: 0
                            },
                            xaxis: {
                              labels: {
                                trim: false
                              }
                            },
                            tooltip: {
                              shared: true,
                              intersect: false,
                              y: {
                                formatter: function(y) {
                                  if (typeof y !== "undefined") {
                                    return y.toFixed(2) + " ";
                                  }
                                  return y;
                                }
                              }
                            }
                        }
                    }
            })
        }
        /** End */


        /** Get Voltage Data by filtered Date
     * @param data: array of search Date
    */
        getPowerchartDataByFilterDate = (data:Date[] | null = [new Date(), new Date()]) =>{
            const dt:Partial<IWeatherVoltagePowerUsedPayLoad> ={
                    "client_id": this.client_id,
                    "device_id": this.selectedDealer.device_id,
                    "device": this.selectedDealer.device,
                    "start_date_time": data[0],
                    "end_date_time":data[1]
                }

                this.api.call_api(1,api_name.POWER_USED,dt)
                .pipe(map((x:any) => x.data))
                .subscribe(res =>{
                    if(res.length > 0){
                    let arr :Required<{name:string,type:string,data:number[],filtered:string}>[] =
                    [
                            {name: "Active Power-1",type: "line",data: [],filtered:'activep1'},
                            {name: "Active Power-2",type: "line",data: [],filtered:'activep2'},
                            {name: "Active Power-3",type: "line",data: [],filtered:'activep3'},
                            {name: "Apparent-1",type: "line",data: [],filtered:'apparentp1'},
                            {name: "Apparent-2",type: "line",data: [],filtered:'apparentp2'},
                            {name: "Apparent-3",type: "line",data: [],filtered:'apparentp3'},
                            {name: "Power Factor-1",type: "line",data: [],filtered:'pf1'},
                            {name: "Power Factor-2",type: "line",data: [],filtered:'pf2'},
                            {name: "Power Factor-3",type: "line",data: [],filtered:'pf3'}
                        ]
                        let date = [];
                        res.forEach(el =>{
                            date.push(this.datePipe.transform(el.created_at,'hh:mm'));
                            Object.keys(el).forEach(item =>{
                                arr = arr.filter(element =>{
                                    if(element.filtered.toLowerCase().replace('-','_') === item.toLowerCase()){
                                        element.data.push(el[item])
                                    }
                                    return arr
                                })
                            })
                            })
                            this.chartOptions8 = {
                                series: arr,
                                chart: {
                                  height: 350,
                                  type: "line"
                                },
                                stroke: {
                                  curve: "smooth"
                                },
                                fill: {
                                  type: "solid",
                                  opacity: [0.35, 1]
                                },
                                labels: date,
                                markers: {
                                  size: 0
                                },
                                xaxis: {
                                  labels: {
                                    trim: false
                                  }
                                },
                                yaxis:[
                                    {
                                        title: {
                                          text: "Active Power-1"
                                        }
                                    },
                                    {
                                        opposite: true,
                                        title: {
                                          text: "Power Factor"
                                        }
                                      }
                                ],
                                tooltip: {
                                  shared: true,
                                  intersect: false,
                                  y: {
                                    formatter: function(y) {
                                      if (typeof y !== "undefined") {
                                        return y.toFixed(2) + " ";
                                      }
                                      return y;
                                    }
                                  }
                                }

                              };
                        }
                })
            }
            /** End */

    ngAfterViewInit(){

        /** Event Fired when Voltage Date change event occured */
        this.weather_filter.get('voltage_date_time')
        .valueChanges.subscribe(res =>{
                if(res && res.filter(el => el== null).length == 0){
                        console.log(res);
                        this.getVoltagechartDataByFilterDate(res);
                }
        })
        /* End*/

        /** Event Fired when Cuurrent Date change event occured */
        this.weather_filter.get('current_date_time')
        .valueChanges.subscribe(res =>{
            if(res && res.filter(el => el== null).length == 0){
                this.getCurrentchartDataByFilterDate(res);
         }
        })
        /*End*/

        this.weather_filter.get('power_date_time')
        .valueChanges.subscribe(res =>{
                console.log(res)
                if(res && res.filter(el => el== null).length == 0){
                    this.getPowerchartDataByFilterDate(res);
                }
        })
    }

    /***
     * Changes effected when kVA,kW,kVAR dropdown value changes
     */
    get_kVA_kW_kVAR_ChartDataByFilter = (ev:Required<IFilterMenus>) =>{
        this.chartOptions5 = null;
        const payload = this.getPayload(ev);
        this.api.call_api(1,api_name.KVAR_KVA_KW,payload)
        .pipe(map((x: any) => x.data))
        .subscribe((res:Required<IKwKvaKvar>[]) =>{
            console.log(res);
            if(res.length > 0){
                let arr :Required<{name:string,data:number[],filteredBy:string}>[] =
                [
                        {name: "kW",data: [],filteredBy:'totkw'},
                        {name: "kVAR",data: [],filteredBy:'totkvar'},
                        {name: "kVA",data: [],filteredBy:'totkva'}
                ]
                let date = [];
                res.forEach(el =>{
                    date.push(el.time);
                    Object.keys(el).forEach(item =>{
                        arr = arr.filter(element =>{
                            if(element.filteredBy.toLowerCase().replace('-','_') === item.toLowerCase()){
                                element.data.push(el[item])
                            }
                            return arr
                        })
                    })
                })

                this.chartOptions5 = {
                series: arr,
                chart: {
                  type: "area",
                  height: 350,
                  stacked: true,
                  events: {
                    selection: function(chart, e) {
                      console.log(new Date(e.xaxis.min));
                    }
                  }
                },
                colors: ["#008FFB", "#00E396", "#CED4DC"],
                dataLabels: {
                  enabled: false
                },

                fill: {
                  type: "gradient",
                  gradient: {
                    opacityFrom: 0.6,
                    opacityTo: 0.8
                  }
                },
                legend: {
                  position: "top",
                  horizontalAlign: "left"
                },
                xaxis: {
                  type: "category",
                  categories:date
                },
              };
            }
        })
    }

    /***Changes effected when Power dropdown value changes */
    getPowerChartDataByFilter = (ev:Required<IFilterMenus>) =>{
        this.chartOptions8 = null;
        const payload = this.getPayload(ev);
        this.api.call_api(1,api_name.POWER_USED,payload)
        .pipe(map((x: any) => x.data))
        .subscribe((res:Required<IPower>[]) =>{
            // if(res.length > 0){
                let arr :Required<{name:string,type:string,data:number[],filtered:string}>[] =
                [
                        {name: "Active Power-1",type: "line",data: [],filtered:'activep1'},
                        {name: "Active Power-2",type: "line",data: [],filtered:'activep2'},
                        {name: "Active Power-3",type: "line",data: [],filtered:'activep3'},
                        {name: "Apparent-1",type: "line",data: [],filtered:'apparentp1'},
                        {name: "Apparent-2",type: "line",data: [],filtered:'apparentp2'},
                        {name: "Apparent-3",type: "line",data: [],filtered:'apparentp3'},
                        {name: "Power Factor-1",type: "line",data: [],filtered:'pf1'},
                        {name: "Power Factor-2",type: "line",data: [],filtered:'pf2'},
                        {name: "Power Factor-3",type: "line",data: [],filtered:'pf3'}
                    ]
                    let date = [];
                    res.forEach(el =>{
                        // date.push(this.datePipe.transform(el.created_at,'hh:mm'));
                        date.push(el.time);

                        Object.keys(el).forEach(item =>{
                            arr = arr.filter(element =>{
                                if(element.filtered.toLowerCase().replace('-','_') === item.toLowerCase()){
                                    element.data.push(el[item])
                                }
                                return arr
                            })
                        })
                        })
                        this.chartOptions8 = {
                            series: arr,
                            chart: {
                              height: 350,
                              type: "line"
                            },
                            stroke: {
                              curve: "smooth"
                            },
                            fill: {
                              type: "solid",
                              opacity: [0.35, 1]
                            },
                            labels: date,
                            markers: {
                              size: 0
                            },
                            xaxis: {
                              labels: {
                                trim: false
                              }
                            },
                            yaxis:[
                                {
                                    title: {
                                      text: "Active Power-1"
                                    }
                                },
                                {
                                    opposite: true,
                                    title: {
                                      text: "Power Factor"
                                    }
                                  }
                            ],
                            tooltip: {
                              shared: true,
                              intersect: false,
                              y: {
                                formatter: function(y) {
                                  if (typeof y !== "undefined") {
                                    return y.toFixed(2) + " ";
                                  }
                                  return y;
                                }
                              }
                            }

                          };
                    // }
        })
    }

    /***Changes effected when Current dropdown value changes */
    getCurrentChartDataByFilter = (ev:Required<IFilterMenus>) =>{
        this.chartOptions7 = null;
        const payload = this.getPayload(ev);
        this.api.call_api(1,api_name.CURRENT_USED,payload)
        .pipe(map((x: any) => x.data))
        .subscribe((res:Required<ICurrent>[]) =>{
            // if(res.length > 0){
                let arr :Required<{name:string,type:string,data:number[],filteredBy:string}>[] =
                [
                        {name: "Current Phase-1",type: "line",data: [],filteredBy:'curr1'},
                        {name: "Current Phase-2",type: "line",data: [],filteredBy:'curr2'},
                        {name: "Current Phase-3",type: "line",data: [],filteredBy:'curr3'}
                    ]
                    let date = [];
                    res.forEach(el =>{
                        // date.push(this.datePipe.transform(el.created_at,'hh:mm'));
                        date.push(el.time);
                        Object.keys(el).forEach(item =>{
                            arr = arr.filter(element =>{
                                if(element.filteredBy.toLowerCase().replace('-','_') === item.toLowerCase()){
                                    element.data.push(el[item])
                                }
                                return arr
                            })
                        })
                        })
                        this.chartOptions7 = {
                            series: arr,
                            chart: {
                              height: 350,
                              type: "line"
                            },
                            stroke: {
                              curve: "smooth"
                            },
                            fill: {
                              type: "solid",
                              opacity: [0.35, 1]
                            },
                            labels: date,
                            markers: {
                              size: 0
                            },
                            xaxis: {
                              labels: {
                                trim: false
                              }
                            },
                            tooltip: {
                              shared: true,
                              intersect: false,
                              y: {
                                formatter: function(y) {
                                  if (typeof y !== "undefined") {
                                    return y.toFixed(2) + " ";
                                  }
                                  return y;
                                }
                              }
                            }
                        }
                    // }
        })
    }

    /** Changes effected when Voltage dropdown value changes */
    getVoltageChartDataByFilter = (ev:Required<IFilterMenus>) =>{
        this.chartOptions6 = null;
        const payload = this.getPayload(ev);
        this.api.call_api(1,api_name.VOLTAGE_USED,payload)
        .pipe(map((x: any) => x.data))
        .subscribe((res:Required<IVoltage>[]) =>{
            // if(res.length > 0){
                let arr :Required<{name:string,type:string,data:number[]}>[] =
                [
                        {name: "R",type: "line",data: []},
                        {name: "Y",type: "line",data: []},
                        {name: "B",type: "line",data: []},
                        {name: "R-Y",type: "line",data: []},
                        {name: "Y-B",type: "line",data: []},
                        {name: "B-Y",type: "line",data: []}
                    ]
                    let date = [];
                    res.forEach(el =>{
                        date.push(el.time);
                        Object.keys(el).forEach(item =>{
                            arr = arr.filter(element =>{
                                if(element.name.toLowerCase().replace('-','_') === item.toLowerCase()){
                                    element.data.push(el[item])
                                }
                                return arr
                            })
                        })
                        })
                        this.chartOptions6 = {
                            series:arr,
                            chart: {
                            height: 350,
                            type: "line"
                            },
                            stroke: {
                            curve: "smooth"
                            },
                            fill: {
                            type: "solid",
                            opacity: [0.35, 1]
                            },
                            labels: date,
                            markers: {
                            size: 0
                            },
                            xaxis: {
                            labels: {
                                formatter: function(y) {
                                if (typeof y !== "undefined") {
                                    return y + " ";
                                }
                                return y;
                                }
                            }
                            },
                            tooltip: {
                            shared: true,
                            intersect: false,
                            y: {
                                formatter: function(y) {
                                if (typeof y !== "undefined") {
                                    return y.toFixed(2) + " ";
                                }
                                return y;
                                }
                            }
                            }
                        };
            // }
        })
    }
    /** End */

    /** Changes effected when Weather used dropdown value changes */
    getWeatherUsedChartDataByFilter = (ev:Required<IFilterMenus>) =>{
            this.chartOptions2 = null;
            const payload = this.getPayload(ev);
            this.api.call_api(1,api_name.ENERGY_USED,payload)
            .pipe(map((x: any) => x.data))
            .subscribe((res:Required<IWeatherUsed>[]) =>{
                // this.weatherUsed = res;
                // if(res.length > 0){
                    let date = [];
                    let arr:Required<{name:string,data:number[],filtered:string}>[] =
                    [
                        {name:'Phase-1',data:[],filtered:'e1'},
                        {name:'Phase-2',data:[],filtered:'e2'},
                        {name:'Phase-3',data:[],filtered:'e3'}
                    ]
                    res.forEach(el =>{
                        date.push(el.date);
                        Object.keys(el).forEach(item =>{
                            arr = arr.filter(element =>{
                                if(element.filtered === item){
                                    element.data.push(el[item])
                                }
                                return arr
                            })
                        })
                    })
                    // this.chartOptions2.series = [];
                    this.chartOptions2 = {
                    series: arr,
                    chart: {
                        type: "bar",
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                        horizontal: false,
                        columnWidth: "70%",
                        borderRadius: 0,
                        borderRadiusApplication: 'around',
                        borderRadiusWhenStacked: 'last',
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        show: true,
                        width: 1,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: date,
                        labels:{
                            style:{
                                fontSize:'10px',
                                fontWeight:'500'
                            }
                        }

                    },
                    yaxis: {
                        labels: {
                        formatter: (val) => {
                            return val / 100 + "kWh";
                        }
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                        formatter: function(val) {
                            return "" + val/100 + " kWh";
                        }
                        }
                    }
                    };
                    // }
            })
    }
    /** End */

    /**
     *
     * @param ev get Selected Filter by which data can be filtered
     * @returns a payload which are to be sent in the api
     */
    getPayload (ev:Required<IFilterMenus>): Partial<IWeatherVoltagePowerUsedPayLoad>{
        return {
            // client_id:this.client_id,
            device_id:this.selectedDealer.device_id,
            device: this.selectedDealer.device,
            type:ev.code,
            start_date_time: this.getDatesAccordingToMode('1Yd','S')
        }
    }

    abc(){
        this.alert_type=''
        console.log(this.selectedAlert);
        this.alert_type=this.selectedAlert?.unit_name
        this.alert_type=' '+this.alert_type;
        // debugger
      }
    getDevice(){
        const credentials = {
            client_id:this.client_id
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

  this.http.post(apiUrl+'/client/devices/list', credentials,{ headers }).subscribe(
      (response) => {
        console.log(response);
        if(response){
            this.data1=response
            this.cities=this.data1.data;
            this.selectedDealer=this.cities[0];
            this.setDevice()
        }

      },
      (error) => {

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
getDeviceLiveData(name:any){
    // const apiUrl = this.api.baseUrl;
//   baseUrl = 'https://iot.wrongcode.in/backend/api';


         if(name){
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

            this.liveData=[];
            this.liveData2=null;

            const credentials = {
                device_id:name
            };

            this.http.post(this.api.baseUrl+'/device-data/last', credentials, { headers }).subscribe(
                (response) => {

                    console.log(response);

                    this.data1=response
                    this.data1=this.data1.data
                    if(this.data1) {
                        this.flowDate=[]
                        this.flowData=[]
                        this.rpmDate=[]
                        this.rpmData=[]
                        this.liveData=this.data1.chart_data_list
                        this.liveData2=this.data1.device_data_list
                        this.liveData.forEach(e => {

                            this.flowDate.push(this.dateConvt(e.created_at))
                            this.flowData.push(e.flow)
                            this.rpmDate.push(this.dateConvt(e.created_at))
                            this.rpmData.push(e.rpm.toString())


                            console.log(this.flowDate);
                            console.log(this.flowData);
                            console.log(this.rpmDate);
                            console.log(this.rpmData);

                        });

                        if(this.flowDate && this.flowData && this.rpmDate && this.rpmData){
                            this.lastUpdateTime=''
                            this.lastUpdateTime=this.convertToISTDateTime(this.liveData2.created_at)
                            console.log(this.lastUpdateTime);
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "-"
                                + (currentdate.getMonth()+1)  + "-"
                                + currentdate.getFullYear() + " "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                                console.log(datetime);


                            // this.flowDate = this.flowDate.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                            // this.flowData = this.flowData.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                            // this.rpmDate = this.rpmDate.map(value => JSON.stringify(value).replace(/[{}]/g, ''));
                            // this.rpmData = this.rpmData.map(value => JSON.stringify(value).replace(/[{}]/g, ''));

                            this.initCharts();

                        }

                    }


                },
                (error) => {
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
        this.getWeatherUsedChartDataByFilter(this.graphical_view.value.weather_used);
        this.getVoltageChartDataByFilter(this.graphical_view.value.voltage);
        this.getCurrentChartDataByFilter(this.graphical_view.value.current);
        this.getPowerChartDataByFilter(this.graphical_view.value.power);
        this.get_kVA_kW_kVAR_ChartDataByFilter(this.graphical_view.value.kvar_kw_kva)
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

    /**
     * For Getting chart data of `Weather Used`
     * @param mode : For detecting whether it is `Today`,`Monthly`,`Yearly` or `Total`
     */
    getWeatherUsedByFilter = (mode:string) =>{
        try{
            this.activeOptionButton = mode
            const dt:Partial<IWeatherVoltagePowerUsedPayLoad> ={
              "client_id": this.client_id,
              "device_id": this.selectedDealer.device_id,
              "device": this.selectedDealer.device,
             "start_date_time": this.getDatesAccordingToMode(mode,'E')
            }
            this.api.call_api(1,api_name.ENERGY_USED,dt).pipe(map((x: any) => x.data))
            .subscribe((res:Required<IWeatherUsed>[]) =>{
                if(res.length > 0){
                let date = [];
                let arr:Required<{name:string,data:number[],filtered:string}>[] =
                [
                    {name:'Phase-1',data:[],filtered:'e1'},
                    {name:'Phase-2',data:[],filtered:'e2'},
                    {name:'Phase-3',data:[],filtered:'e3'}
                ]
                res.forEach(el =>{
                    date.push(el.date);
                    Object.keys(el).forEach(item =>{
                        arr = arr.filter(element =>{
                            if(element.filtered === item){
                                element.data.push(el[item])
                            }
                            return arr
                        })
                    })
                })
                    this.chartOptions2 = {
                    series: arr,
                    chart: {
                        type: "bar",
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                        horizontal: false,
                        columnWidth: "55%"
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        show: true,
                        width: 1,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: date.map(el => this.datePipe.transform(el,'shortDate'))
                    },
                    yaxis: {
                        labels: {
                        formatter: (val) => {
                            return val / 100 + "kWh";
                        }
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                        formatter: function(val) {
                            return "" + val/100 + " kWh";
                        }
                        }
                    }
                    };
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    /** For Getting End Date After click on Weather used
     *
     * @param mode: detecting which button is clicked
     * @param range_type: Either MAX/MIN is accepted
    */
      getDatesAccordingToMode = (mode:string,range_type:string,__date:Date = new Date()) =>{
        if(range_type == RANGE_TYPE.MIN || range_type == RANGE_TYPE.MAX){
            const date = __date;
            switch(mode){
                case '1yd': date.setDate(date.getDate() - 1);break;
                case '1m': date.setMonth(date.getMonth() - 1);break;
                case '1y': date.setFullYear(date.getFullYear() - 1);break;
                case 'all': date.setFullYear(date.getFullYear() - 2);break;break;
            }
            // return this.datePipe.transform(date,'YYYY-MM-ddhh:mm:ss');
            return date
        }
        console.log('Ivalid argument passed')
        return null;
    }
    /** End */

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'line',
                    label: 'Phase-1',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Phase-2',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 65, 34],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Phase-3',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };

        this.options2 = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        this.options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };


        this.flow = {
            labels: ['01', '02', '03', '04', '05', '06', '07'],
            datasets: [
                {
                    label: 'Last 6 Days',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'Last Week',
                    data: [28, 48, 60, 70, 66, 69, 60],
                    fill: false,
                    backgroundColor:'yellow',
                    borderColor: 'yellow',
                    tension: .4
                }
            ]

        };
        this.flow2 = {
            labels: ['01', '02', '03', '04', '05', '06', '07'],
            datasets: [
                {
                    label: 'Last 6 Days',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'Last Week',
                    data: [55, 66, 70, 90, 48, 69, 30],
                    fill: false,
                    backgroundColor:'yellow',
                    borderColor: 'yellow',
                    tension: .4
                }
            ]

        };
        this.barData = {
            labels: ['01', '02', '03', '04', '05', '06', '07'],
            datasets: [
                {
                    label: 'Last 6 Days',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Last Week',
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    data: [28, 48, 40, 19, 86, 27, 80]
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };


        this.rpm = {

            labels: this.rpmDate,
            datasets: [

                {
                    label: 'RPM',
                    data: this.rpmData,
                    fill: false,
                    backgroundColor:'yellow',
                    borderColor: 'yellow',
                    tension: .4
                }
            ]
        };
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
         this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        }
        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };
         this.pieData = {
            labels: ['Sun', 'Mon', 'Tue','Wed','Thu','Fri','Sat'],
            datasets: [
                {
                    data: [540, 325, 702,540, 325, 702,300],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--blue-500')

                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ]
                }]
        };

        this.polarData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    35
                ],
                backgroundColor: [
                    documentStyle.getPropertyValue('--indigo-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--teal-500'),
                    documentStyle.getPropertyValue('--orange-500')
                ],
                label: 'This week'
            }],
            labels: [
                'Today',
                'Yesterday',
                'Day befor tomorrow ',
                'Last Week'
            ]
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
        this.donatoptions = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
        this.donatdata = {
            labels: ['Sun', 'Mon', 'Tue','Wed','Thu','Fri','Sat'],
            datasets: [
                {
                    data: [540, 325, 702,540, 325, 702,300],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--blue-500')

                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ]
                    }
            ]
        };

        // this.chartOptions = {
        //     series: [44, 55, 13, 43, 22, 34, 65],
        //     chart: {
        //       width: 480,
        //       type: "pie"
        //     },
        //     labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

        //   };

        //     this.chartOptions3 = {
        //         series: [
        //           {
        //             name: "power",
        //             data: this.generateDayWiseTimeSeries(
        //               new Date("11 Feb 2017").getTime(),
        //               185,
        //               {
        //                 min: 30,
        //                 max: 90
        //               }
        //             )
        //           }
        //         ],
        //         chart: {
        //           id: "chart2",
        //           type: "line",
        //           height: 230,
        //           toolbar: {
        //             autoSelected: "pan",
        //             show: false
        //           }
        //         },
        //         colors: ["#546E7A"],
        //         stroke: {
        //           width: 3
        //         },
        //         dataLabels: {
        //           enabled: false
        //         },
        //         fill: {
        //           opacity: 1
        //         },
        //         markers: {
        //           size: 0
        //         },
        //         xaxis: {
        //           type: "datetime"
        //         }
        //       };
        //       this.chartOptions33 = {
        //         series: [
        //           {
        //             name: "Power",
        //             data: this.generateDayWiseTimeSeries(
        //               new Date("11 Feb 2017").getTime(),
        //               185,
        //               {
        //                 min: 30,
        //                 max: 90
        //               }
        //             )
        //           }
        //         ],
        //         chart: {
        //           id: "chart2",
        //           type: "line",
        //           height: 230,
        //           toolbar: {
        //             autoSelected: "pan",
        //             show: false
        //           }
        //         },
        //         colors: ["#A32409"],
        //         stroke: {
        //           width: 3
        //         },
        //         dataLabels: {
        //           enabled: false
        //         },
        //         fill: {
        //           opacity: 1
        //         },
        //         markers: {
        //           size: 0
        //         },
        //         xaxis: {
        //           type: "datetime"
        //         }
        //       };
        //       this.chartOptions4 = {
        //         series: [
        //           {
        //             name: "series1",
        //             data: this.generateDayWiseTimeSeries(
        //               new Date("11 Feb 2017").getTime(),
        //               185,
        //               {
        //                 min: 30,
        //                 max: 90
        //               }
        //             )
        //           }
        //         ],
        //         chart: {
        //           id: "chart1",
        //           height: 130,
        //           type: "area",
        //           brush: {
        //             target: "chart2",
        //             enabled: true
        //           },
        //           selection: {
        //             enabled: true,
        //             xaxis: {
        //               min: new Date("19 feb 2017").getTime(),
        //               max: new Date("14 Jun 2017").getTime()
        //             }
        //           }
        //         },
        //         colors: ["#008FKW"],
        //         fill: {
        //           type: "gradient",
        //           gradient: {
        //             opacityFrom: 0.91,
        //             opacityTo: 0.1
        //           }
        //         },
        //         xaxis: {
        //           type: "datetime",
        //           tooltip: {
        //             enabled: false
        //           }
        //         },
        //         yaxis: {
        //           tickAmount: 2
        //         }
        //       }

            //   this.chartOptions5 = {
            //     series: [
            //       {
            //         name: "Voltage",
            //         data: this.generateDayWiseTimeSeries(
            //           new Date("11 Feb 2017 GMT").getTime(),
            //           20,
            //           {
            //             min: 10,
            //             max: 60
            //           }
            //         )
            //       },
            //       {
            //         name: "Power",
            //         data: this.generateDayWiseTimeSeries(
            //           new Date("11 Feb 2017 GMT").getTime(),
            //           20,
            //           {
            //             min: 10,
            //             max: 20
            //           }
            //         )
            //       },
            //       {
            //         name: "Current",
            //         data: this.generateDayWiseTimeSeries(
            //           new Date("11 Feb 2017 GMT").getTime(),
            //           20,
            //           {
            //             min: 10,
            //             max: 15
            //           }
            //         )
            //       }
            //     ],
            //     chart: {
            //       type: "area",
            //       height: 350,
            //       stacked: true,
            //       events: {
            //         selection: function(chart, e) {
            //           console.log(new Date(e.xaxis.min));
            //         }
            //       }
            //     },
            //     colors: ["#008FFB", "#00E396", "#CED4DC"],
            //     dataLabels: {
            //       enabled: false
            //     },
            //     fill: {
            //       type: "gradient",
            //       gradient: {
            //         opacityFrom: 0.6,
            //         opacityTo: 0.8
            //       }
            //     },
            //     legend: {
            //       position: "top",
            //       horizontalAlign: "left"
            //     },
            //     xaxis: {
            //       type: "datetime"
            //     }
            //   };
            //   this.chart1options = {
            //     series: [
            //       {
            //         name: "R",
            //         data: this.generateDayWiseTimeSeries2(
            //           new Date("11 Feb 2017").getTime(),
            //           20,
            //           {
            //             min: 10,
            //             max: 60
            //           }
            //         )
            //       }
            //     ],
            //     chart: {
            //       id: "fb",
            //       group: "social",
            //       type: "line",
            //       height: 160
            //     },
            //     colors: ["#F81C11"],
            //     yaxis: {
            //       tickAmount: 2,
            //       labels: {
            //         minWidth: 40
            //       }
            //     }
            //   };

            //   this.chart2options = {
            //     series: [
            //       {
            //         name: "Y",
            //         data: this.generateDayWiseTimeSeries2(
            //           new Date("11 Feb 2017").getTime(),
            //           20,
            //           {
            //             min: 10,
            //             max: 30
            //           }
            //         )
            //       }
            //     ],
            //     chart: {
            //       id: "tw",
            //       group: "social",
            //       type: "line",
            //       height: 160
            //     },
            //     colors: ["#EAEA06"],
            //     yaxis: {
            //       tickAmount: 2,
            //       labels: {
            //         minWidth: 40
            //       }
            //     }
            //   };

            //   this.chart3options = {
            //     series: [
            //       {
            //         name: "B",
            //         data: this.generateDayWiseTimeSeries2(
            //           new Date("11 Feb 2017").getTime(),
            //           20,
            //           {
            //             min: 10,
            //             max: 60
            //           }
            //         )
            //       }
            //     ],
            //     chart: {
            //       id: "yt",
            //       group: "social",
            //       type: "area",
            //       height: 160
            //     },
            //     colors: ["#062FEA"],
            //     yaxis: {
            //       tickAmount: 2,
            //       labels: {
            //         minWidth: 40
            //       }
            //     }
            //   }
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
      public generateDayWiseTimeSeries2(baseval, count, yrange): any[] {
        let i = 0;
        let series = [];
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


export interface IWeatherVoltagePowerUsedPayLoad{
    client_id: number,
    device_id: number,
    device: number,
    end_date_time:Partial<Date>,
    start_date_time: Date,
    type:Partial<string>
}

export interface IFilterMenus{
        name:Required<string>,
        code:Required<string>,
}

export interface  IVoltage {
    weather_data_id: number
    device_id: number
    do_channel: number
    r: number
    y: number
    b: number
    r_y: number
    y_b: number
    b_r: number
    date: string
    time: string
  }

  export interface ICurrent {
    weather_data_id: number
    device_id: number
    do_channel: number
    curr1: number
    curr2: number
    curr3: number
    date: string
    time: string
  }


  export interface IPower {
    weather_data_id: number
    device_id: number
    do_channel: number
    activep1: number
    activep2: number
    activep3: number
    apparentp1: number
    apparentp2: number
    apparentp3: number
    pf1: number
    pf2: number
    pf3: number
    date: string
    time: string
  }

  export interface IKwKvaKvar{
        weather_data_id: number
        device_id: number
        do_channel: number
        totkw: number
        totkva: number
        totkvar: number
        runhr: number
        date: string
        time: string
  }
