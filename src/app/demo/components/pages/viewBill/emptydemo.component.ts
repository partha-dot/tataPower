import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';
import { ProductService } from 'src/app/demo/service/product.service';
@Component({
    templateUrl: './emptydemo.component.html',
    styleUrls: ['./empty.component.css']
})
export class EmptyDemoComponent implements OnInit { 
  // @ViewChild('barcodeValue') barcodeValueInput: ElementRef;

    constructor(private http:HttpClient ,private messageService: MessageService, private confirmationService: ConfirmationService,
        private api:ApiService, private bill:ProductService) { 
        this.id=this.bill.billing_id;
        }
        id:any;
        CustomerDtls:any;
        data:any;
        ListData:any[]=[];
        FinalData:any[]=[];
        spinner:boolean=false;
        tot_price:number = 0;
        Paid:boolean;
        Due:boolean=false;
        QTY:Number=0;
        totQTY:number=0
        barCode:any;
    ngOnInit(): void {
        // this.bill.billing_id;
        debugger
        this.getBill(this.id);
        
    }
    getBill(id){
      
    } 
    setWIM(date1, date2){
  
    debugger
    }
    ngAfterViewInit() {
     
    }
    callPrint(divName){
   
    }
    generateBarcode() {
      // const value = this.barcodeValueInput.nativeElement.value;
      
    }
   
}
