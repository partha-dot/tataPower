import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { CrudComponent } from '../../pages/crud/crud.component';
import { Customer } from 'src/app/demo/api/customer';
import { Seller } from 'src/app/demo/api/seller';
import { Router } from '@angular/router';
interface PageEvent {
    first: number;
    rows: number;
    page: number;
    last:number;
    pageCount: number;
  }
@Component({
    providers: [DialogService, MessageService],
    templateUrl: './mediademo.component.html'
})
export class MediaDemoComponent implements OnInit,OnDestroy {

   
    stockIn: FormGroup;
    modelList:any=[];
    product_n:string;
    company_n:string;
    lastAddedIndex: number = -1;
    warr_in_month:any;
    modelID:any
    models!: any[];
    ct:any;
    stockListAll:any;
    stockList:any[]=[]
    stockApi:any
    product_store_id:number;
    spinner:boolean=false;

    first: number = 0;
    rows: number = 2;
    totalPGNO:number;
    goingPage:number;
    productDialog: boolean = false;

    products!: Seller[];

    product!: Seller;

    selectedProducts!: Seller[] | null;

    submitted: boolean = false;

    statuses!: any[];
    data1:any=[]
    ref: DynamicDialogRef | undefined;
    @ViewChild('view', { static: true }) view: TemplateRef<any>;
    constructor(private router: Router,private api:ApiService,private productService: ProductService,private http:HttpClient,private billID:ProductService,
      public dialogService: DialogService, public messageService: MessageService) { }

    ngOnInit() {
       this.getAllseller();
    }
    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.goingPage=event.page+1;
        this.loadNewPage(this.goingPage);
        debugger
      }
      loadNewPage(pageNo:Number){
        // const url="https://billing-application.wrongcode.in/api/stock/stock_product?page=2"
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
              const token = localStorage.getItem('token');
              const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
            
              this.http.get(apiUrl+'/report/my_bill?page='+pageNo, { headers }).subscribe(
                  (response) => {
                  this.spinner=false;
                  this.stockApi=response;
                    this.stockList=this.stockApi.data;
                    // this.stockList=this.stockListAll.data;
                    // this.totalPGNO=this.stockListAll.last_page;
                    debugger
                  })
      }
      getAllseller(){
        this.totalPGNO=0;
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
            const token = localStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
          
            this.http.get(apiUrl+'/seller/list', { headers }).subscribe(
                (response) => {
                  this.spinner=false;
                  console.log(response);
                  this.stockApi=response
                  this.stockList=this.stockApi.data;
                    // this.stockList=this.stockListAll.data;
                  this.totalPGNO=this.stockApi.total
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
      searchAll(i:any){
      
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
              const token = localStorage.getItem('token');
              const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
            
              this.http.get(apiUrl+'/report/my_bill?page=1&search='+i.target.value.toString(), { headers }).subscribe(
                  (response) => {
                  this.spinner=false;
                  this.stockApi=response;
                    this.stockList=this.stockApi.data;
                    // this.stockList=this.stockListAll.data;
                    this.totalPGNO=this.stockApi.total;
                    // if(this.stockListAll.last_page>1){
                    //   this.first= 0;
                    //   this.rows= 20;
      
                    // }
                    debugger
                  })
      }
      hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    editProduct(products: Seller) {
      debugger
      this.product = { ...products };
      debugger
      this.productDialog = true;
  }
      openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }
      AddCompany(name,address,mobile){
        const credentials = {
            shop_name:name,
            adress:address,
            contact:mobile
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.http.post(apiUrl+'/seller/add', credentials,{ headers }).subscribe(
            (response) => {
              if(response){
                this.hideDialog();
                console.log(response);
                debugger
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Created', life: 3000 });
                this.getAllseller();
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
    DeleteCompany(id){
        const credentials = {
            company_id:id
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.http.post(apiUrl+'/master/delete_company_name', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Deleted', life: 3000 });
              this.getAllseller();
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
      show(i:any) {
        this.billID.cust_id=0;
        this.billID.cust_id=i.id;
        debugger
        this.ref = this.dialogService.open(CrudComponent, {
            header: 'Customer Full Details',
            data: {
              id: i.cust_id
          },
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe((product: Product) => {
            if (product) {
                this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
            }
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
        
    }
    saveProduct() {
      this.submitted = true;

      if (this.product.shop_name?.trim()) {
          if (this.product.id) {
              debugger
              this.updateCompany(this.product.id,this.product.shop_name,this.product.adress,this.product.contact)
              // this.products[this.findIndexById(this.product.company_id)] = this.product;
          } else {
              this.AddCompany(this.product.shop_name,this.product.adress,this.product.contact)
              
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }
  updateCompany(id,name,add,mob){
    const credentials = {
        id:id,
        shop_name:name,
        adress:add,
        contact:mob
      };
    const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    debugger
    this.http.post(apiUrl+'/seller/edit', credentials,{ headers }).subscribe(
        (response) => {
          this.hideDialog();
          console.log(response);
          debugger
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dealer Updated', life: 3000 });
          this.getAllseller();
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

      ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }}}
