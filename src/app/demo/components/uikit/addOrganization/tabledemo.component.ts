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
import { Router } from '@angular/router';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {
    productDialog: boolean = false;

    products!: Company[];

    product!: Company;

    selectedProducts!: Company[] | null;

    submitted: boolean = false;

    statuses!: any[];
    data1:any=[]

    constructor(private router: Router,private http:HttpClient ,private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService,private api:ApiService) { }

    ngOnInit() {
    this.getDeviceDATA();
    }
    getDeviceDATA(){
	const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
	debugger
    this.http.get(apiUrl+'/admin/manage_organization/list', { headers }).subscribe(
        (response) => {
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
          console.error(error);
        }
      );
	}
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((origination_id) => !this.selectedProducts?.includes(origination_id));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Company) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Company) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.origination_name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.DeleteCompany(product.origination_id);
            
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.origination_name?.trim()) {
            if (this.product.origination_id) {
                debugger
                this.updateCompany(this.product.origination_id,this.product.origination_name)
                // this.products[this.findIndexById(this.product.origination_id)] = this.product;
            } else {
                this.AddCompany(this.product.origination_name)
                
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
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


    updateCompany(id,name){
        const credentials = {
            origination_id:id,
            origination_name:name
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.http.post(apiUrl+'/master/edit-origination', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organization Updated', life: 3000 });
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
            origination_name:name
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger 
        this.http.post(apiUrl+'/admin/manage_organization/add', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organization Created', life: 3000 });
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
            origination_id:id
          };
        const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        debugger
        this.http.post(apiUrl+'/master/delete-origination', credentials,{ headers }).subscribe(
            (response) => {
              console.log(response);
              debugger
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organization Deleted', life: 3000 });
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
}