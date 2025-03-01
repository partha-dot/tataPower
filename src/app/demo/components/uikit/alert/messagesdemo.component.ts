
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from 'src/app/demo/api/company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-messagesdemo',
    templateUrl: './messagesdemo.component.html',
    providers: [MessageService, ConfirmationService]
})
export class MessagesDemoComponent {
    productDialog: boolean = false;
    credentials5:any;
    credentials4:any;
    credentials3:any;
    credentials2:any;
    credentials1:any;
    credentials:any[]=[];
    products!: Company[];
    companys!: any[];
    models!: any[];
  
    product!: Company;
  
    selectedProducts!: Company[] | null;
  
    submitted: boolean = false;
  
    statuses!: any[];
    companyList:any=[]
    unitList:any=[]
    units:any;
    productList:any=[]
    modelList:any=[]
    countries: any[] | undefined;
    selectedCountry: any | undefined;
    unitForm: FormGroup;
  client_id:number=(+localStorage.getItem('c_id'))
  ct:any;
  value:any='';
  editMode:boolean=false;
  data1:any;
  low:boolean=false
  high:boolean=false
  c_low:boolean=false
  c_high:boolean=false

  low2:boolean=true
  high2:boolean=true
  c_low2:boolean=true
  c_high2:boolean=true
  value3:number=15.00
  cities:any=[];
  editedalert:any;
  spinner:boolean=false;
  cities2:any=[
  {
    "unit_name": "voltage",
    "unit": "volt"
  },
  {
    "unit_name": "current",
    "unit": "ampere"
  },
  {
    "unit_name": "resistance",
    "unit": "ohm"
  },
  {
    "unit_name": "power",
    "unit": "watt"
  },
  {
    "unit_name": "capacitance",
    "unit": "farad"
  },
  {
    "unit_name": "inductance",
    "unit": "henry"
  },
  {
    "unit_name": "frequency",
    "unit": "hertz"
  },
  {
    "unit_name": "impedance",
    "unit": "ohm"
  }];
  cities3:any=[{"name":"high"},
  {"name":"low"},
  {"name":"critical heigh"},
  {"name":"critical low"},
  {"name":"Emergency"}]

    constructor( private router: Router,private formBuilder: FormBuilder,private http:HttpClient ,private productService: ProductService,
       private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService) {
      this.unitForm = this.formBuilder.group({
        alert_id:[''],
        organization_id:['0', Validators.required],
        device_id: ['0', Validators.required],
        device: [''],
        unit_id: ['0', Validators.required],
        low_val:[''],
        high_val: [''],
        c_high_val: [''],
        c_low_val: [''],
        email: ['',  Validators.required],
      });
     }
   
    ngOnInit() {
      this.ct=this.unitForm.controls
    this.getOrganization();
    this.getDevice();
    this.getUnit();
    this.getAlertList();
    // this.getDeviceModel();
    this.unitForm.patchValue({organization_id:0,device_id:0,unit_id:0})
    // this.ct.organization_id.setValue(0)
    // this.unitForm.setValue({
    //   organization_id: 0, 
    // });
    };

    abc(){
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
              this.units=response
              this.unitList=this.units.data 
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
      getOrganization(){
        const apiUrl = this.api.baseUrl;
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
          const credentials = {
              client_id:this.client_id
            };
            this.spinner=true;
          this.http.post(apiUrl+'/client/manage_organization/list', credentials,{ headers }).subscribe(
              (response) => {
                this.spinner=false;
                console.log(response);
                debugger
                this.data1=response
                this.products=this.data1.data 
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
    getAlertList(){
    const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const credentials = {
      client_id:this.client_id
    };
    this.spinner=true;
    this.http.post(apiUrl+'/client/alert/list',credentials, { headers }).subscribe(
        (response) => {
          this.spinner=false;
          console.log(response);
          this.modelList=response
          this.models=this.modelList.data ;
          this.models.forEach(e=>{
            e.organization_id=this.products.filter(p=>p.organization_id==e.organization_id)[0].organization_name
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
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'From Server Side!!', life: 3000 });
        }
        
      );
  }
  getDeviceCompany(){
    const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      this.spinner=true;
      this.http.get(apiUrl+'/master/list-origination', { headers }).subscribe(
          (response) => {
            this.spinner=false;
            console.log(response);
            this.companyList=response
            this.companys=this.companyList.data 
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
  
    openNew() {
      this.editMode=false
      this.unitForm.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.low=false;
        this.c_low=false;
        this.high=false;
        this.c_high=false;
        this.unitForm.patchValue({organization_id:0,device_id:0,unit_id:0})

    }
  
    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((origination_id) => !this.selectedProducts?.includes(origination_id));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            }
        });
    }
    changePass(){
      this.editMode=false
      debugger
    }
  
    editAlert(alert: any) {
      this.editedalert=alert.alert_type
      this.editMode=true;
      debugger
      if(alert.alert_type=="1CL"){
        this.ct.c_low_val.setValue(alert.alert_value);
        this.ct.low_val.setValue(0);
        this.ct.high_val.setValue(0);
        this.ct.c_high_val.setValue(0);
        this.c_low=true;
        this.low=false; 
        this.high=false; 
        this.c_high=false;

        this.c_low2=false;
        this.low2=true; 
        this.high2=true; 
        this.c_high2=true;
      }
      if(alert.alert_type=="2L"){
        this.ct.low_val.setValue(alert.alert_value);
        this.ct.c_low_val.setValue(0);
        this.ct.high_val.setValue(0);
        this.ct.c_high_val.setValue(0);
        this.low=true;
        this.c_low=false;
        this.high=false; 
        this.c_high=false;

        this.low2=false;
        this.c_low2=true;
        this.high2=true; 
        this.c_high2=true;
      }
      if(alert.alert_type=="3H"){
        this.ct.high_val.setValue(alert.alert_value);
        this.ct.c_low_val.setValue(0);
        this.ct.low_val.setValue(0);
        this.ct.c_high_val.setValue(0);
        this.high=true;
        this.low=false;
        this.c_low=false;
        this.c_high=false;

        this.high2=false;
        this.low2=true;
        this.c_low2=true;
        this.c_high2=true;
      }
      if(alert.alert_type=="4CH"){
        this.ct.c_high_val.setValue(alert.alert_value);
        this.ct.c_low_val.setValue(0);
        this.ct.low_val.setValue(0);
        this.ct.high_val.setValue(0);
        this.c_high=true;
        this.low=false;
        this.c_low=false;
        this.high=false; 

        this.c_high2=false;
        this.low2=true;
        this.c_low2=true;
        this.high2=true; 
      }
        // this.product = { ...product };
        this.productDialog = true;
        this.unitForm.patchValue({
          alert_id:alert.alert_id,
          organization_id:alert.organization_id,
          device_id: alert.device_id,
          unit_id: alert.unit_id,
          email: alert.alert_email,
        })
        debugger
      //  this.saveProduct();
    }
  
    deleteAlert(product: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.device + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.DeleteAlert(product);
            
            }
        });
    }
  
    hideDialog() {
      this.credentials=[];
        this.productDialog = false;
        // this.submitted = false;
    }
  
    saveProduct() {
      this.spinner=true;
      debugger
          debugger
          if(this.low){
            this.credentials1 = {
              "alert_id":this.ct.alert_id.value,
              "client_id": this.client_id,
              "organization_id": this.ct.organization_id.value,
              "device_id": this.ct.device_id.value,
              "device": this.cities.filter(e=>e.device_id==this.ct.device_id.value)[0].device,
              "unit_id":this.ct.unit_id.value,
              "alert_type": "2L",
              "alert_status": "Y",
              "alert_value":this.ct.low_val.value,
              "alert_email": this.ct.email.value,
              "create_by": Number(localStorage.getItem('user_id')),
            };
            this.credentials.push(this.credentials1)
          }
          if(this.c_low){
            this.credentials2 = {
              "alert_id":this.ct.alert_id.value,
              "client_id": this.client_id,
              "organization_id": this.ct.organization_id.value,
              "device_id": this.ct.device_id.value,
              "device":  this.cities.filter(e=>e.device_id==this.ct.device_id.value)[0].device,
              "unit_id":this.ct.unit_id.value,
              "alert_type": "1CL",
              "alert_status": "Y",
              "alert_value":this.ct.c_low_val.value,
              "alert_email": this.ct.email.value,
              "create_by": Number(localStorage.getItem('user_id')),
            };
            this.credentials.push(this.credentials2)
          }
          if(this.high){
            this.credentials3 = {
              "alert_id":this.ct.alert_id.value,
              "client_id": this.client_id,
              "organization_id": this.ct.organization_id.value,
              "device_id": this.ct.device_id.value,
              "device":  this.cities.filter(e=>e.device_id==this.ct.device_id.value)[0].device,
              "unit_id":this.ct.unit_id.value,
              "alert_type": "3H",
              "alert_status": "Y",
              "alert_value":this.ct.high_val.value,
              "alert_email": this.ct.email.value,
              "create_by": Number(localStorage.getItem('user_id')),
            };
            this.credentials.push(this.credentials3)
          }
          if(this.c_high){
            this.credentials4 = {
              "alert_id":this.ct.alert_id.value,
              "client_id": this.client_id,
              "organization_id": this.ct.organization_id.value,
              "device_id": this.ct.device_id.value,
              "device":  this.cities.filter(e=>e.device_id==this.ct.device_id.value)[0].device,
              "unit_id":this.ct.unit_id.value,
              "alert_type": "4CH",
              "alert_status": "Y",
              "alert_value":this.ct.c_high_val.value,
              "alert_email": this.ct.email.value,
              "create_by": Number(localStorage.getItem('user_id')),
            };
            this.credentials.push(this.credentials4)
          }
          else{
            this.credentials5 = {
              "alert_id":this.ct.alert_id.value,
              "client_id": this.client_id,
              "organization_id": this.ct.organization_id.value,
              "device_id": this.ct.device_id.value,
              "device":  this.cities.filter(e=>e.device_id==this.ct.device_id.value)[0].device,
              "unit_id":this.ct.unit_id.value,
              "alert_type": this.editedalert,
              "alert_status": "N",
              "alert_value":0.00,
              "alert_email": this.ct.email.value,
              "create_by": Number(localStorage.getItem('user_id')),
            };
          }
          this.credentials
           debugger
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        if(!this.unitForm.invalid)
          {
            if(!this.ct.alert_id.value){
          this.http.post(apiUrl+'/client/alert/add', this.credentials,{ headers }).subscribe(
            (response) => {
              this.spinner=false;
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alert Created', life: 3000 });
              this.getAlertList();
              this.hideDialog();
            },
            (error) => { 
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
              this.spinner=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data Related Issue!!', life: 3000 });
              console.error(error);
            }
          );
        }
        else{
          this.http.post(apiUrl+'/client/alert/edit',this.low? this.credentials1:this.c_low?this.credentials2:this.high?this.credentials3:this.c_high?this.credentials4:this.credentials5,{ headers }).subscribe(
            (response) => {
              this.spinner=false;
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alert Updated', life: 3000 });
              this.getAlertList();
              this.hideDialog();
            },
            (error) => { 
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
              this.spinner=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data Related Issue!!', life: 3000 });
              console.error(error);
            }
          );
        }
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required field!', life: 3000 });
        
      }
        
        
    }
  
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].origination_id === id) {
                index = i;
                break;
            }
        }
  
        return index;
    }
  
  
    updateCompany(o_id,u_id,u_name,email,pass){
        const credentials = {
            origination_id:o_id,
            user_id:u_id,
            name:u_name,
            email:email,
            password:pass,
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.spinner=true;
        this.http.post(apiUrl+'/master/edit-user', credentials,{ headers }).subscribe(
            (response) => {
              this.spinner=false;
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
              this.getAlertList();
            },
            (error) => { 
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
              this.spinner=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data Related Issue!!', life: 3000 });
              console.error(error);
            }
          );
    } 
    AddCompany(o_id,name,email,pass){
        const credentials = {
            origination_id:o_id,
            name:name,
            email:email,
            password:pass
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.spinner=true;
        this.http.post(apiUrl+'/master/add-user', credentials,{ headers }).subscribe(
            (response) => {
              this.spinner=false;
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
              this.getAlertList();
            },
            (error) => { 
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
              this.spinner=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data Related Issue!!', life: 3000 });
              console.error(error);
            }
          );
    }   
    DeleteAlert(user){
        const credentials = {
          "alert_id": user.alert_id,
          "client_id": this.client_id,
          "organization_id": user.organization_id,
          "device_id": user.device_id
        };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.spinner=true;
        this.http.post(apiUrl+'/client/alert/delete', credentials,{ headers }).subscribe(
            (response) => {
              this.spinner=false;
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alert Deleted', life: 3000 });
              this.getAlertList();
              this.hideDialog();
            },
            (error) => { 
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
              this.spinner=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data Related Issue!!', life: 3000 });
              console.error(error);
            }
          );
    }
    getDevice(){

      const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const credentials = {
      client_id:this.client_id
    };
    this.spinner=true;
    this.http.post(apiUrl+'/client/devices/list',credentials, { headers }).subscribe(
        (response) => {
          this.spinner=false;
          console.log(response,"ppp");
          
          this.data1=response
          this.cities=this.data1.data 
          
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
  }
  