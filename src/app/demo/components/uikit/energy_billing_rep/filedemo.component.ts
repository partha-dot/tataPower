import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import * as XLSX from 'xlsx';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

export interface billingData {
  billing_price?:number;
  currency_symbol?:string;
}
@Component({
    templateUrl: './filedemo.component.html',
    styleUrls: ['./filedemo.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class FileDemoComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;

    // countries=[]
    countries1 = [
        {id: 'b1', name: 'Weather Usage and Billing', link:'/usr' },
        {id: 'b2', name: 'Billing & Income', link:'/usr' },
        {id: 'b3', name: 'Monthly bill forecast', link:'/usr'  },
        {id: 'b4', name: 'Multi months bill report', link:'/usr'  },
        // {id: 'b5', name: 'Battery Simulation and Billing Analysis', link:'/usr'  }
      ];
      countries2 = [{
        id: 1, name: 'Hourly Weather Consumption', link:'/usr' },
        {id: 2, name: 'Weather consumption during selected hours', link:'/usr' },
        {id: 3, name: 'Comparison Analysis for Different Meters', link:'/usr'  },
       { id: 4, name: 'Comparison Analysis on Time Basis', link:'/usr'  },
       { id: 5, name: 'Comprehensive Analysis', link:'/usr'  }
      ];
      countries3 = [{
        id: 1, name: 'Abnormal Data Analysis', link:'/usr' },
        {id: 2, name: 'Demand charges analysis', link:'/usr' },
        {id: 3, name: 'offline analysis', link:'/usr'  }
      ];
      selectedCountry1: any;
      selectedCountry2: any;
      selectedCountry3: any;
      selectedDevice:any;
      person:any=[];
      BillingList:any[]=[];
      BillingDtls:billingData;
      showBillingSubMenu1:boolean=false;
      showBillingSubMenu2:boolean=false;
      showBillingSubMenu3:boolean=false;
      client_id:number=(+localStorage.getItem('c_id'));
      spinner:boolean=false;
      month:any;
      year:any;
      rangeDates:any;
      selectedName:string;
      data1:any=[];
      deviceList:any=[];
      showMonth:boolean=true;
      showyear:boolean=false;
      showDateTime:boolean=false;
      showTable1:boolean=false;
      showTable2:boolean=false;
      showTable4:boolean=false;
      selectedID:any;
      datetype:any;
      lastRowData:any;
      // dateType: FormGroup;
      constructor(private router: Router,private fb: FormBuilder,private http:HttpClient ,

        private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService){
          // this.dateType = this.fb.group({
          //   org_id: ['', Validators.required],
          //   device_id: ['', [Validators.required]],
          //   device_name: ['', [Validators.required]],
          //   user_id: ['', [Validators.required]],
          //   manage_user_device_id:['']
          // });
          this.chartOptions = {
            series: [100,73],
            chart: {
              height: 350,
              type: "radialBar"
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: "22px"
                  },
                  value: {
                    fontSize: "16px"
                  },
                  total: {
                    show: true,
                    label: "Total",
                    formatter: function(w) {
                      return "249 kWh";
                    }
                  }
                }
              }
            },
            labels: ["Forecast", "Current"]
          }

          this.chartOptions2 = {
            series: [100,83],
            chart: {
              height: 350,
              type: "radialBar"
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: "22px"
                  },
                  value: {
                    fontSize: "16px"
                  },
                  total: {
                    show: true,
                    label: "Total",
                    formatter: function(w) {
                      return "255 ($)";
                    }
                  }
                }
              }
            },
            labels: ["Forecast", "Current"]
          }
      }
      ngOnInit(): void {
        this.selectedCountry1={id: 'b1', name: 'Weather Usage and Billing', link:'/usr' }
        this.selectedID='b1';
        this.selectedName='Weather Usage and Billing';
        this.datetype='M'
        this.getDevice();
      }
      logMockData(data:any){
        console.log(data)
      }
      showBilling1(){
        this.showBillingSubMenu1=!this.showBillingSubMenu1
        this.showBillingSubMenu2=false;
        this.showBillingSubMenu3=false;
        debugger
      }
      showBilling2(){
        this.showBillingSubMenu2=!this.showBillingSubMenu2
        this.showBillingSubMenu1=false;
        this.showBillingSubMenu3=false;
        debugger
      }
      showBilling3(){
        this.showBillingSubMenu3=!this.showBillingSubMenu3
        this.showBillingSubMenu2=false;
        this.showBillingSubMenu1=false;
        debugger
      }
      onChange(i:any){
        this.selectedName='';
        const name:any=i.value;
        this.selectedName=name.name;
        this.selectedID=name.id;
        console.log(i.value);
        debugger
      }

      navigate(location: any){
        debugger
        // this.router.navigate(['/billingreport']);
        // this.router.navigate(location.target.value);
       }
       convertDateString(dateString: string): string {
        // Parse the date string to a Date object
        const date = new Date(dateString);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        // Format the date as 'yyyy-mm-dd'
        return `${year}-${month}-${day}`;
      }

       ShowHideTable(){
        this.spinner=true;
        console.log(this.datetype, this.selectedDevice, this.rangeDates);
        debugger
        if(this.datetype=='C'){
          var firstFormattedDate: string;
          var secondFormattedDate: string;
          firstFormattedDate = this.convertDateString(this.rangeDates[0]);
          secondFormattedDate = this.convertDateString(this.rangeDates[1]);
        }
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        const credentials = {
          report_type: this.datetype,
          device_id: this.selectedDevice?.device_id,
          start_date_time: this.datetype=='M'?this.convertDateString(this.month):this.datetype=='Y'?this.convertDateString(this.year):firstFormattedDate,
          end_date_time: this.datetype=='C'?secondFormattedDate:null
        }
        debugger
        this.http.post(apiUrl+'/client/report_analysis/new_weather_usage_billing',credentials , { headers }).subscribe(
            (response) => {
              this.spinner=false
              console.log(response);
              const data:any=response;
              this.BillingList=data.data.data;
              this.lastRowData= data.data.end_date_last_row
              this.BillingDtls=data.data.master_bill;
              if(this.BillingList){
                this.processBillingData();
                // const totLastWeather=(this.lastRowData.e1+this.lastRowData.e2+this.lastRowData.e3).toFixed(2)
                // for(let i=0;i<this.BillingList.length; i++){
                //   if(i==0){
                //     this.BillingList[i].total_weather=
                //   }
                // }
                // this.BillingList.forEach(e=>{
                //   if(e.length==0){debugger
                //     e.total_weather=(((e.e1+e.e2+e.e3) - totLastWeather)).toFixed(2);
                //     e.price=(((e.e1+e.e2+e.e3) - totLastWeather) *(this.BillingDtls.billing_price)).toFixed(2);
                //   }
                //   else{
                //     e.total_weather=(e.e1+e.e2+e.e3).toFixed(2);
                //     e.price=((e.e1+e.e2+e.e3)*(this.BillingDtls.billing_price)).toFixed(2);
                //   }

                // })
              }
              debugger
              this.showTable1=true
              this.showTable2=false
              this.showTable4=false
            },
            (error) => {
        if(error.status=='401'){
          this.spinner=false
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
              console.error(error);
              this.spinner=false
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'From Server Side!!', life: 3000 });
            }

          );




       }
       processBillingData() {
        let previousTotalWeather = this.calculateTotalWeather(this.lastRowData);

        this.BillingList.forEach((item, index) => {
          const currentTotalWeather = this.calculateTotalWeather(item);

          if (index === 0) {
            item.total_weather = (currentTotalWeather - previousTotalWeather).toFixed(2);
          } else {
            item.total_weather = (currentTotalWeather - previousTotalWeather).toFixed(2);
          }

          item.price = item.total_weather * this.BillingDtls.billing_price;

          previousTotalWeather = currentTotalWeather;
        });
      }
       calculateTotalWeather(data) {
        return data.e1 + data.e2 + data.e3;
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
                this.deviceList=this.data1.data;
                this.selectedDevice=this.deviceList[0];

      },
      (error) => {
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
        this.spinner=false
        console.error(error);
      }
    )}
    dateTypeChange(val:any){
      console.log(this.datetype);

      if(val=="Y"){
        this.showyear=true;
        this.showMonth=false;
        this.showDateTime=false;
      }
      else if(val=="M"){
        this.showyear=false;
        this.showMonth=true;
        this.showDateTime=false;
      }
      else{
        this.showyear=false;
        this.showMonth=false;
        this.showDateTime=true;
      }
    }
    exportToExcel(): void {
      const element = document.getElementById('my-table');
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      XLSX.writeFile(workbook, 'billing-data.xlsx');
    }

}
