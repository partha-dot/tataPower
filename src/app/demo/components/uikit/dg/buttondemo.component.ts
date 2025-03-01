import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { CountryService } from 'src/app/demo/service/country.service';
import { EmptyDemoComponent } from '../../pages/viewBill/emptydemo.component';
import { ProductService } from 'src/app/demo/service/product.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './buttondemo.component.html',
    styleUrls:['./buttondemo.component.css'],
    
  providers: [MessageService, ConfirmationService, DatePipe]
})
export class ButtonDemoComponent implements OnInit {

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
  donatoptions:any;
  donatdata:any;
  user_type:any='';
  lastUpdateTime:any='';
  DeviceUrl:any='';
  checked:boolean=true;
  options: any;
  options2: any;
  data: any;
  selectedAlert:any
  alert_type:string=''
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
  loginType:string=localStorage.getItem('loginType')
  constructor(private router: Router,private datePipe: DatePipe,public layoutService: LayoutService, private authservice:AuthenticationService,
      private fb: FormBuilder,private http:HttpClient ,private productService: ProductService, 
      private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService) {
      this.subscription = this.layoutService.configUpdate$.subscribe(config => {
          this.initCharts();
      });
  }
  convertToISTDateTime(utcDatetime: string) {
      const utcDateTime = new Date(utcDatetime);
      const istTime = this.datePipe.transform(utcDateTime, 'dd-MM-yyyy HH:mm:ss', '+0530');
      return istTime || '';
    }
 
  ngOnInit() {
      this.user_type=localStorage.getItem('u_type')
      if(this.user_type=='0'){
          this.DeviceUrl='/'
      }
      else{
          this.DeviceUrl='/origination/'
      }
      
      debugger
      this.initCharts();
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
  abc(){
    this.alert_type=''
    console.log(this.selectedAlert);
    this.alert_type=this.selectedAlert?.unit_name
    this.alert_type=' '+this.alert_type;
    debugger
  }
  getDevice(){

  const apiUrl = this.api.baseUrl;
const token = localStorage.getItem('token');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

this.http.get(apiUrl+this.DeviceUrl+'device/list', { headers }).subscribe(
    (response) => {
      console.log(response);
      
      this.data1=response
      this.cities=this.data1.data 
      
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
          
          this.http.post(this.api.baseUrl+ this.DeviceUrl+'device-data/last', credentials, { headers }).subscribe(
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
      console.log(this.selectedDealer);
      
      this.getDeviceLiveData(this.selectedDealer.device_name);


  }
  filterDealer(event: any) {
      const filtered: any[] = [];
      const query = event.query;
      for (let i = 0; i < this.cities.length; i++) {
          const dealer = this.cities[i];
          if (dealer.device_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(dealer);
              
          }
      }

      this.filteredDealer = filtered;
      
  }

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
          labels: ['01', '02', '03', '04', '05', '06', '07','08','09','10', '11','12','13','14','15'],
          datasets: [
              {
                  label: 'Last 6 Days',
                  backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                  borderColor: documentStyle.getPropertyValue('--primary-500'),
                  data: [65, 59, 80, 81, 56, 55, 40, 70,30,100, 40,80,54,97,67]
              },
              {
                  label: 'Last Week',
                  backgroundColor: 'orange',
                  borderColor: 'orange',
                  data: [28, 48, 40, 19, 86, 27, 80,56, 55, 40, 70,30,100, 40,98]
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
    //   this.pieData = {
    //       labels: ['A', 'B', 'C'],
    //       datasets: [
    //           {
    //               data: [540, 325, 702],
    //               backgroundColor: [
    //                   documentStyle.getPropertyValue('--indigo-500'),
    //                   documentStyle.getPropertyValue('--purple-500'),
    //                   documentStyle.getPropertyValue('--teal-500')
    //               ],
    //               hoverBackgroundColor: [
    //                   documentStyle.getPropertyValue('--indigo-400'),
    //                   documentStyle.getPropertyValue('--purple-400'),
    //                   documentStyle.getPropertyValue('--teal-400')
    //               ]
    //           }]
    //   };
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


      
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
  
}
