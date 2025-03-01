import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    templateUrl: './timelinedemo.component.html',
    styleUrls: ['./timelinedemo.scss'],
    providers:[MessageService]
})
export class TimelineDemoComponent implements OnInit {

    constructor(private router: Router,private http:HttpClient ,private messageService: MessageService, private confirmationService: ConfirmationService,
        private api:ApiService, private bill:ProductService) { 
        this.id=this.bill.billing_id;
        }
        id:any;
        newProduct:any;
        replaceProduct:any;
        CustomerDtls:any;
        data:any;
        ListData:any[]=[];
        spinner:boolean=false;
        tot_price:number = 0;
        Paid:boolean;
        Due:boolean=false;
        productDialog: boolean = false;
        submitted: boolean = false;
        stockListAll:any;
        stockList:any[]=[];
        stockApi:any;
    ngOnInit(): void {
        // this.bill.billing_id;
        debugger
        this.getBill(this.id);
        
    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    getBill(id){
      this.spinner=true;
        const credentials = {
            billing_id:id
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.http.post(apiUrl+'/billing/data', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);
              if(response){
                this.spinner=false;
                this.data=response
                this.CustomerDtls=this.data.customer;
                this.ListData=this.data.list;
                if(this.ListData[0].payment_flag=="P"){
                  this.Paid=true;
                  this.Due=false;
                }
                else{
                  this.Due=true;
                  this.Paid=false;
                }
                if(this.ListData.length>0){
                  this.ListData.forEach(e=>{
                    this.tot_price+=Number(e.price)
                  })
                }
              }
              debugger
            //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Updated', life: 3000 });
             
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
    searchProduct(i:any){
        if (i.keyCode === 13) {
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          debugger
            this.http.get(apiUrl+'/stock/stock_product?page=1&search='+i.target.value.toString(), { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                  this.stockApi=response;
                  this.stockListAll=this.stockApi.data;
                  this.stockList=this.stockListAll.data;
                  debugger
                  if(this.stockList.length>0){
                    return
                    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product dose not match with Stock item', life: 3000 });                
                  }
                  else{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product dose not match with Stock item', life: 3000 });
                    return
                  }
                  
                })
                debugger

                
          }
        
    }
    saveProduct() {
        this.submitted = true;
        const credentials = {
        cust_id:this.replaceProduct.cust_id,
        bill_id: this.replaceProduct.billing_id,
        product_barcode:this.replaceProduct.serial_number,
        new_barcode:this.stockList[0].serial_number
        };
        debugger
      this.spinner=true;
      const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      debugger
      this.http.post(apiUrl+'/billing/add_werent_product', credentials,{ headers }).subscribe(
          (response) => {
            debugger
            console.log(response);
            this.spinner=false;
            debugger
            this.messageService.add({ severity: 'success', summary: 'Successfully', detail: 'Changed Product', life: 3000 });
            this.hideDialog();
          },
          (error) => { 
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
                  this.spinner=false;
                  console.error(error);
                  this.hideDialog();
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'While Changing Product', life: 3000 });

          }
        );
    }

    editBill(i:any){
        this.replaceProduct=null;
        this.replaceProduct=i;
        this.productDialog = true;
        debugger
    }
    callPrint(divName){
      const printContents = document.getElementById(divName).innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
   
}
