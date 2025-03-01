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
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService, ConfirmationService , DatePipe]
})
export class ProductComponent implements OnInit{

  @ViewChild('dt') primeTable:Table
  cities: any[] | undefined;
  sourceProducts!: any[]

  targetProducts!: any[];

  selectedDevice: any | undefined;

  productDialog: boolean = false;

  products: Device[];

  product: Device=null;

  selectedProducts!: any[] | null;

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

formatDate(dt){
  const date = new Date(dt);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(date.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate); // Output: 2024-12-29

return formattedDate

}
  saveProduct() {
    this.fromDate='';
    this.toDate='';
    this.device='';

      this.submitted = true;
      this.selectedDevice;
      this.device=this.reportData.controls['d_id'].value.device;

      this.toDate=this.formatDate(this.reportData.controls['tdate'].value);
      this.fromDate=this.formatDate(this.reportData.controls['fdate'].value);
      console.log(this.reportData.controls['fdate'].value);
      console.log(this.fromDate);
      console.log(this.reportData.controls['tdate'].value);
      console.log(this.toDate);

      const credentials = {
        client_id:this.client_id,
        start_date:this.formatDate(this.reportData.controls['fdate'].value),
        end_date:this.formatDate(this.reportData.controls['tdate'].value),
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
      this.http.post(apiUrl+'/client/report/weather_data', credentials,{ headers }).subscribe(
        (response) => {
          this.spinner=false;
          console.log(response);
          this.data1=response
          this.products=this.data1.data
          this.excelData=this.data1.data
          this.products.forEach(e=>{
            e.time=this.convertToISTDateTime(e.created_at)
          })
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
    const data: any[] = []; // Your table data array
    const hdd=[]
    this.cols.forEach(e=>{
      hdd.push(e.col)})
    // Add header row
    const header = ['Sl No.', 'DATE', 'TIME','Voltage R (V)','Voltage Y (V)','Voltage B (V)','Voltage R_Y','Voltage Y_B',
    'Voltage B_R', 'Current R (A)','Current Y (A)', 'Current B (A)','Total Weather', 'Average PF (HZ)', 'Frequency', 'Runhr','TotkW','TotkVA','TotkVAr'];
    data.push(header);

    // Add data rows
    for (let i = 0; i < this.excelData.length; i++) {
        const rowData = [
          i+1,
          this.excelData[i].date,
          this.excelData[i].time,
          this.excelData[i].r,
          this.excelData[i].y,
          this.excelData[i].b,
          this.excelData[i].r_y,
          this.excelData[i].y_b,
          this.excelData[i].b_r,
          this.excelData[i].curr1,
          this.excelData[i].curr2,
          this.excelData[i].curr3,
          (this.excelData[i].e1+this.excelData[i].e2+this.excelData[i].e3).toFixed(2),
          (this.excelData[i].pf1+this.excelData[i].pf2+this.excelData[i].pf3).toFixed(2),
          this.excelData[i].freq,
          this.excelData[i].runhr,
          this.excelData[i].totkw,
          this.excelData[i].totkva,
          this.excelData[i].totkvar
        ];
        data.push(rowData);


    }

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'Report_data.xlsx');
  }

}
