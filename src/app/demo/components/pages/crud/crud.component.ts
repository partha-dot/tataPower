import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/demo/service/api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmptyDemoComponent } from '../viewBill/emptydemo.component';
import { Router } from '@angular/router';
@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService],
    styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    payment_Dt:any;
    dueP_flg:boolean=false
    // addMoney: FormGroup;
    rowsPerPageOptions = [5, 10, 20];
    spinner:boolean=false;
    PaidtransDtls:any[]=[];
    DuetransDtls:any[]=[];
    custDtls:any;
    custData:any;
    ref: DynamicDialogRef | undefined;
    depositAmount:Number;
    f:any
    showPaidBill:boolean=false;
    showDueBill:boolean=false;
    BalanceAmount:Number=0
    dueAmt:any;
    advAmt:any;
    dueAfterPayment:Number=0;
    constructor(private router: Router,public dialogService: DialogService,private http:HttpClient,private api:ApiService,private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        const Dt=new Date;
        const day = Dt.getDate();
        const month = Dt.getMonth() + 1; // Months are zero-based
        const year = Dt.getFullYear();
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        this.payment_Dt = `${formattedDay}/${formattedMonth}/${year}`;

        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'billing_id', header: 'billing_id' },
            // { field: 'transaction_id', header: 'transaction_id' },
            { field: 'payment_flag', header: 'payment_flag' },
            { field: 'transaction_date', header: 'transaction_date' },
            { field: 'amount', header: 'amount' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
        this.getCustomerTrans();
     
    }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(cust: any) {
        // this.transDtls = { ...cust };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        debugger
        const custID=this.custDtls.id
        debugger
        const credentials = {
        //  id: custID,
        customer_id:custID,
         amount:this.depositAmount
        };
        debugger
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      debugger
      this.http.post(apiUrl+'/customer/customer_deposit', credentials,{ headers }).subscribe(
          (response) => {
            debugger
            console.log(response);
            // this.custData=response
            // this.custDtls=this.custData.data.personal_details
            // this.transDtls=this.custData.data.trans_details
            this.spinner=false;
            debugger
            this.messageService.add({ severity: 'success', summary: 'Successfully', detail: 'Amount Deposit', life: 3000 });
            this.hideDialog();
            this.dueAfterPayment=((+this.BalanceAmount)-(+this.depositAmount));
            this.dueP_flg=true;
            // this.BalanceAmount=this.dueAfterPayment;
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
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'While Amount Deposit', life: 3000 });

          }
        );
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
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    getCustomerTrans(){
        this.dueAmt=0;
        this.advAmt=0;
        const custID=this.productService.cust_id
        debugger
        const credentials = {
         id: custID
        };
        debugger
                  this.spinner=true;
                  const apiUrl = this.api.baseUrl;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      debugger
      this.http.post(apiUrl+'/customer/customer_trans', credentials,{ headers }).subscribe(
          (response) => {
            console.log(response);
            this.custData=response
            this.custDtls=this.custData.data.personal_details
            this.spinner=false;
            for(let i=0;i<this.custData.data.trans_details.length;i++){
                if(this.custData.data.trans_details[i].payment_flag=="P"){
                    this.PaidtransDtls.push(this.custData.data.trans_details[i])
                }
                else{
                    this.DuetransDtls.push(this.custData.data.trans_details[i])
                    if(this.custData.data.trans_details[i].payment_flag=="D"){
                        this.dueAmt+= Number(this.custData.data.trans_details[i].amount);
                    }
                    else{this.advAmt+= Number(this.custData.data.trans_details[i].amount)}
                }
            }
            this.BalanceAmount=Number(Number(this.dueAmt)-Number(this.advAmt))
            debugger
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Get Customer', life: 3000 });
            
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
    ShowPaid(){
        this.showPaidBill=true;
        this.showDueBill=false;
    }
    ShowDue(){
        this.showPaidBill=false;
        this.showDueBill=true;
    }
    showBill(i:any) {
        this.productService.billing_id=0;
        this.productService.billing_id=i.billing_id;
        debugger
        this.ref = this.dialogService.open(EmptyDemoComponent, {
            header: 'Full Billing Details',
            data: {
              id: i.billing_id
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
  
}
