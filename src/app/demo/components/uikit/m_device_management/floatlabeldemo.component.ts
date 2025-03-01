import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { CrudComponent } from '../../pages/crud/crud.component';
import { Customer } from 'src/app/demo/api/customer';
import { TreeNode } from 'primeng/api';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { CountryService } from 'src/app/demo/service/country.service';
import { Router } from '@angular/router';
interface PageEvent {
    first: number;
    rows: number;
    page: number;
    last:number;
    pageCount: number;
  }
  interface Column {
    field: string;
    header: string;
}
@Component({
    templateUrl: './floatlabeldemo.component.html',
    providers: [DialogService, MessageService],
})
export class FloatLabelDemoComponent implements OnInit  {
  files!: TreeNode[];
  cols!: Column[];
  checked:boolean=true
  checked2:boolean=false
  productDialog: boolean = false;
  AddproductDialog:boolean = false;
  addDevice:FormGroup;
  products!: Product[];
  operationType:any;
  product!: Product;
  client_id:number=(+localStorage.getItem('c_id'));
  selectedProducts!: Product[] | null;
  spinner:boolean=false;
  submitted: boolean = false;
  ct:any;
  stockApi:any;
  stockList:any[]=[];
  statuses!: any[];
  loginType:string=localStorage.getItem('loginType');
  totOnline:number=0
  totOffilne:number=0

  DeviceModel = [
    { name: 'Weather', code: 'EN' },
    { name: 'Water', code: 'WA' },
    { name: 'Power', code: 'PO' },
    { name: 'Wind', code: 'WI' }
];
  DeviceType = [
    { name: 'Energy', code: 'EN' },
    // { name: 'Water', code: 'WA' },
    // { name: 'Power', code: 'PO' },
    // { name: 'Wind', code: 'WI' }
  ];
  meterType = [
    { name: 'Single Phase', code: 'ENSF' },
    { name: 'Three Phase', code: 'ENTF' }
  ];

  constructor(private router: Router,private authservice:AuthenticationService,private api:ApiService,private countryService: CountryService,private http:HttpClient,private productService: ProductService,private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.addDevice = this.fb.group({
      did: [''],
      deviceName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      deviceId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dmodel: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      long: ['', [Validators.required]],
      imeiNo: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      device_type: ['', [Validators.required]],
    //   meter_type: ['', [Validators.required]]
      // sl_no: this.fb.array([])
    });
  }

  ngOnInit() {
    this.getAllStock();
    this.ct=this.addDevice.controls;
      this.productService.getProducts().then((data) => (this.products = data));

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
    this.operationType="U"
      this.product = {};
      this.submitted = false;
      this.AddproductDialog = true;
  }
  openNew2() {
    this.addDevice.reset();
    this.addDevice.patchValue({
      device_type:0,
    //   meter_type:0
    })
    this.operationType="I"
    this.product = {};
    this.submitted = false;
    this.AddproductDialog = true;
}

  public getSeverity(status: string) {

    return 'success'
}
  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
              this.selectedProducts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  editProduct(product: Product) {
    this.operationType='U'
    debugger
      this.addDevice.patchValue({
        did:product.device_id,
        deviceName:product.device_name,
        device_type:product.device_type,
        // meter_type:product.meter_type,
        deviceId:product.device,
        dmodel:product.model,
        lat:product.lat,
        long:product.lon,
        imeiNo:product.imei_no
        })
      this.addDevice.controls['deviceId'].disable()
      this.addDevice.controls['imeiNo'].disable()
      this.AddproductDialog = true;
  }

  deleteProduct(did:any) {
    debugger
    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Deleted', life: 3000 });
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete this Device ?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => val.device_id !== did);
              this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.AddproductDialog = false;
      this.productDialog = false;
      this.submitted = false;
  }
  calculateDifference(date1Str: string): number {

    // const date1 = new Date("2024-05-31 15:15:21");
    const date1 = new Date(date1Str);
    const date2 = new Date();

    // Get the time difference in milliseconds
    const timeDifference = Math.abs(date2.getTime() - date1.getTime());

    // Convert the time difference to minutes
    const differenceInMinutes = Math.floor(timeDifference / (1000 * 60));
    console.log(differenceInMinutes);
    debugger
    return differenceInMinutes;
  }
  getAllStock(){
    this.spinner=true;
    const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const credentials = {
      client_id:this.client_id
    };
    this.http.post(apiUrl+'/client/manage/devices/list',credentials, { headers }).subscribe(
        (response) => {
          this.spinner=false;
          console.log(response);
          this.stockApi=response
          this.stockList=this.stockApi.data;
          // device_updated_atlog
          this.totOffilne=0;
          this.totOffilne=0;
          this.stockList.forEach(e=>{
            debugger
            if(this.calculateDifference(e.weather_data_created_at)<=60){
                e.status='Y';
                this.totOnline+=1
            }
            else{
              e.status='N'
              this.totOffilne+=1
            }
          })
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
    convDt(){
      var originalTimestamp = new Date();

    // Convert to Date object
    var date = new Date(originalTimestamp);

    // Extract year, month, and day
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-indexed month
    var day = ("0" + date.getDate()).slice(-2);

    // Form the desired format
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
    }
  saveProduct() {
      this.submitted = true;
      if(this.addDevice.invalid){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required field!!', life: 3000 });
      }
      else{
        if(this.operationType=="I"){
          debugger
          const apiUrl = this.api.baseUrl;
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const credentials = {
            client_id:this.client_id,
            device_name:this.ct.deviceName.value,
            device:this.ct.deviceId.value,
            model:this.ct.dmodel.value,
            lat:this.ct.lat.value,
            lon:this.ct.long.value,
            imei_no:this.ct.imeiNo.value,
            device_type:this.ct.device_type.value,
            // meter_type:this.ct.meter_type.value,
            do_channel:1,
            last_maintenance:this.convDt()


          };
          const credentials2=[credentials]
          debugger
          this.http.post(apiUrl+'/client/manage/devices/add', credentials2,{ headers }).subscribe(
              (response) => {
                console.log(response);
                      this.spinner=false;
                      debugger
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Created', life: 3000 });
                this.resetData();
                this.getAllStock();
                this.hideDialog();
              },
              (error) => {
          if(error.status=='401'){
            this.router.navigate(['/']);
            debugger
           }
          console.log(error.status);
                      this.spinner=false;
                      console.log(error);
                      this.hideDialog();
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: ':Unknown Error', life: 3000 });
              }
            );
        }
        else{
          debugger
          const apiUrl = this.api.baseUrl;
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const credentials = {
            device_id:this.ct.did.value,
            client_id:this.client_id,
            device_name:this.ct.deviceName.value,
            device:this.ct.deviceId.value,
            model:this.ct.dmodel.value,
            lat:this.ct.lat.value,
            lon:this.ct.long.value,
            imei_no:this.ct.imeiNo.value,
            device_type:this.ct.device_type.value,
            // meter_type:this.ct.meter_type.value,
            do_channel:1,
            // last_maintenance:this.convDt()


          };
          debugger
          this.http.post(apiUrl+'/client/manage/devices/edit', credentials,{ headers }).subscribe(
              (response) => {
                console.log(response);
                      this.spinner=false;
                      debugger
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Updated', life: 3000 });
                this.resetData();
                this.getAllStock();
                this.hideDialog();
              },
              (error) => {
          if(error.status=='401'){
            this.router.navigate(['/']);
            debugger
           }
          console.log(error.status);
                      this.spinner=false;
                      console.log(error);
                      this.hideDialog();
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: ':Unknown Error', life: 3000 });

              }
            );
        }
      }


  }
  resetData(){
    this.addDevice.reset();
      }
  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

}
