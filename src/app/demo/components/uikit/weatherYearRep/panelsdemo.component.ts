import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, FilterService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from 'src/app/demo/api/company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Device } from 'src/app/demo/api/deviceDetails';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { BooleanInput } from '@angular/cdk/coercion';
import { Router } from '@angular/router';
export interface WeatherData {
    weather_data_id: number;
    date: string;
    time: string;
    device_id: number;
    device: string;

    atm_pressure: number;
    avg_atm_pressure: number;
    min_atm_pressure: number;
    max_atm_pressure: number;

    humidity: number;
    avg_humidity: number;
    min_humidity: number;
    max_humidity: number;

    temperature: number;
    avg_temperature: number;
    min_temperature: number;
    max_temperature: number;

    solar_radiation: number;
    avg_solar_radiation: number;
    min_solar_radiation: number;
    max_solar_radiation: number;

    rainfall: number;
    avg_rainfall: number;
    min_rainfall: number;
    max_rainfall: number;
    rainfall_cumulative: number;
    avg_rainfall_cumulative: number;
    min_rainfall_cumulative: number;
    max_rainfall_cumulative: number;

    wind_speed: number;
    wind_direction: number;

    tw: number;
  }
@Component({
    templateUrl: './panelsdemo.component.html',
  styleUrls: ['./panelsdemo.component.css'],
  providers: [MessageService, ConfirmationService , DatePipe],
})

export class PanelsDemoComponent implements OnInit {
    @ViewChild('dt') primeTable:Table
    cities: any[] | undefined;
    sourceProducts!: any[]

    targetProducts!: any[];

    selectedDevice: any | undefined;

    productDialog: boolean = false;

    products: WeatherData[];

    product: Device=null;

    selectedProducts!: any[] | null;

    weatherDayData:WeatherData;

    submitted: boolean = false;
    client_id:number=(+localStorage.getItem('c_id'));
    statuses!: any[];
    data1:any=[]
    data2:any=[]
    fromDate:any='';
    toDate:any='';
    device:any='';
    reportData:FormGroup;
    spinner:boolean=false;
    showDragandDrop
    fastLoading:number=0
    user_type:any;
    DeviceUrl:any;
    cols:any[]=[];
    excelData:any[]=[];
    r: boolean = false;
      y: boolean = false;
      b: boolean = false;
      r_y: boolean = false;
      y_b: boolean = false;
      b_r: boolean = false;
      curr1: boolean = false;
      curr2: boolean = false;
      curr3: boolean = false;
      eng: boolean = false;
      pf: boolean = false;
      freq: boolean = false;
      runhr: boolean = false;
      totkw: boolean = false;
      totkva: boolean = false;
      totkvar: boolean = false;
      ORG:any=localStorage.getItem('ORG_NAME');

    constructor( private router: Router, private carService: ProductService, private cdr: ChangeDetectorRef,private authservice:AuthenticationService,private filterService: FilterService,private fb: FormBuilder,private http:HttpClient ,private productService: ProductService, private messageService: MessageService,private datePipe: DatePipe, private confirmationService: ConfirmationService,private api:ApiService) { }

    ngOnInit() {
      // this.openNew();
      this.showDragandDrop=false;
      this.cols = [
        {
            field: 'date',
            header: 'Date',
            width:'6rem'
        },
        {
            field: 'time',
            header: 'Time',
            // width:'5rem'

        },
        {
          field: 'device',
          header: 'Device Name'
        }
      ];
      this.sourceProducts=[
        {field: 'temperature', header:"Temparature", width:'5rem'},
        {field: 'rainfall', header:"Rainfall", width:'5rem'},
        {field: 'rainfall_cumulative', header:"Cummulative Rainfall", width:'5rem'},
        {field: 'atm_pressure', header:"Atm Pressure", width:'5rem'},
        {field: 'solar_radiation', header:"Solar Radiation", width:'5rem'},
        {field: 'humidity', header:"Humidity", width:'5rem'},
        {field: 'wind_speed',header:"Wind Speed", width:'5rem'},
        {field: 'wind_direction',header:"Wind Direction", width:'5rem'}
      ]

      this.targetProducts = [
        {
          field: 'date',
          header: 'Date',
          width:'6rem'
      },
      {
          field: 'time',
          header: 'Time'
      },
      {
        field: 'device',
        header: 'Device Name'
      }
      ];
      this.user_type=localStorage.getItem('u_type')

      this.reportData = this.fb.group({
        d_id: ['', Validators.required],
        fdate: ['', Validators.required],
        tdate: ['', [Validators.required]]
      });
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
      this.getDeviceDATA();
    // this.openNew();

    // setInterval(() => {
    //   this.device ? this.saveProduct() : console.log('No Data');
    // }, 10000);
    }
    convertToISTDateTime(utcDatetime: string) {
      const utcDateTime = new Date(utcDatetime);
      const istTime = this.datePipe.transform(utcDateTime, 'HH:mm:ss', '+0530');
      return istTime || '';
    }
    getDeviceDATA(){
  const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const credentials = {
      client_id:this.client_id
    };
    this.http.post(apiUrl+'/client/devices/list',credentials, { headers }).subscribe(
        (response) => {
          console.log(response);

          this.data2=response
          this.cities=this.data2.data

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

    openNew() {
      this.cols = [];
        this.showDragandDrop=false;
        this.cols = this.targetProducts;
        console.log(this.targetProducts);
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((product_id) => !this.selectedProducts?.includes(product_id));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Device) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Company) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.user_name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.DeleteCompany(product.user_id);

            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }


    saveProduct() {
      this.fromDate='';
      this.toDate='';
      this.device='';

        this.submitted = true;
        this.selectedDevice;
        this.device=this.reportData.controls['d_id'].value.device;
        this.fromDate=this.datePipe.transform(this.reportData.controls['fdate'].value,'YYYY-MM-dd');
        this.toDate=this.datePipe.transform(this.reportData.controls['tdate'].value,'YYYY-MM-dd');
        const credentials = {
          client_id:this.client_id,
          start_date:this.datePipe.transform(this.reportData.controls['fdate'].value,'YYYY-MM-dd'),
          end_date:this.datePipe.transform(this.reportData.controls['tdate'].value,'YYYY-MM-dd'),
          device:this.device,
          device_id:this.reportData.controls['d_id'].value.device_id
        };
        // if(this.device){
        //   this.fastLoading+=1
        //   this.fastLoading==1?this.spinner=true:this.spinner=false;
        // }
        this.spinner=true
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.productDialog = false;
        this.http.post(apiUrl+'/client/report/yearly_report', credentials,{ headers }).subscribe(
          (response) => {
            this.spinner=false;
            console.log(response);
            this.data1=response
            this.products=this.data1.data
            this.excelData=this.data1.data
            // this.products.forEach(e=>{
            //   e.time=this.convertToISTDateTime(e.created_at)
            // })
            this.products = [...this.products];

            this.product = {};
            this.showDragandDrop=true;
            // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Get All Data', life: 3000 });

          },
          (error) => {
            this.spinner=false;
          if(error.status=='401'){
            this.router.navigate(['/']);
            // debugger
           }
          console.log(error.status);
            if(error.status==401){
              // this.authservice.logout();
          }
            console.error(error);
          }
        );

    }

    filterGlobal_secondary = ($event) =>{
      let value = $event.target.value;
      this.primeTable.filterGlobal(value,'contains')
    }

    getColumns = () =>{
      return this.cols.map(el => el.field);
    }



    updateCompany(id,name){
        const credentials = {
            product_id:id,
            product_name:name
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.http.post(apiUrl+'/master/edit_product_name', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);

              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Updated', life: 3000 });
              this.getDeviceDATA();
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
    AddCompany(name){
        const credentials = {
            product_name:name
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.http.post(apiUrl+'/master/add_product_name', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);

              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Created', life: 3000 });
              this.getDeviceDATA();
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
    DeleteCompany(id){
        const credentials = {
            product_id:id
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.http.post(apiUrl+'/master/delete_product_name', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);

              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Deleted', life: 3000 });
              this.getDeviceDATA();
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
    exportToExcel() {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelData);
        const workbook: XLSX.WorkBook = {
          Sheets: { 'data': worksheet },
          SheetNames: ['data']
        };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'weather_data_Yearly');
      }

      private saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        const EXCEL_EXTENSION = '.xlsx';
        const downloadLink = document.createElement('a');
        const url = URL.createObjectURL(data);
        downloadLink.href = url;
        downloadLink.download = fileName + EXCEL_EXTENSION;
        downloadLink.click();
      }

  }
