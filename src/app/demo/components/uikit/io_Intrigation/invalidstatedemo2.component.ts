import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Renderer2,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer ,SafeResourceUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from 'src/app/demo/api/company';
import { ApiService } from 'src/app/demo/service/api.service';
export interface UserData {
    user_id: number;
    user_name: string;
    user_email: string;
    user_info_id: number;
    user_active_status: string;
    user_type: string;
    otp_number: number;
    otp_active_status: string;
    password: string;
    created_by: number;
    created_at: string;
    client_id: number;
    client_name: string;
    client_address: string;
    client_mobile: string;
    client_email: string;
  }
@Component({
    templateUrl: './invalidstatedemo2.component.html',
    styleUrls:['./invalidstatedemo2.component.scss'],
    providers:[MessageService,ConfirmationService]
})
export class InvalidStateDemo2Component implements OnInit {
    selectedCountryAdvanced:any
    selectedDealer:any
    filteredCountries: any[] = [];
    filteredDealer: any[] = [];
    countries: any[] = [];
    selectedState: any = null;
    stockIn: FormGroup;
    spinner:boolean=false;

    states: any[] = [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
    ];

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;
    ct:any
    city2: any = null;
    models!: any[];
    modelList:any=[];
    product_n:string;
    dealer!: any[];
    dealerList:any=[];
    company_n:string;
    lastAddedIndex: number = -1;
    warr_in_month:any;
    modelID:any;
    client_id:number=(+localStorage.getItem('c_id'));
    cities:any=[];
    data1:any=[];
    MQTTvalue:any;
    showPdfDialog: boolean = false;
    pdfSrc: SafeResourceUrl | undefined;
    deviceId:string;
    deviceName:string;
    @ViewChild('itemInput') itemInput: ElementRef;

    constructor(private sanitizer: DomSanitizer,private router: Router,private renderer:Renderer2,private fb: FormBuilder,private http:HttpClient ,private messageService: MessageService,
        private confirmationService: ConfirmationService,private api:ApiService){
            this.stockIn = this.fb.group({
                model_id: ['', Validators.required],
                purchase_rate: ['', [Validators.required]],
                purchase_by: ['', [Validators.required]],
                purchase_date: ['', [Validators.required]],
                warranty_expired: ['', [Validators.required]],
                cgst_p: ['', [Validators.required]],
                sgst_p: ['', [Validators.required]],
                sales_rate: ['', [Validators.required]],
                sels_warranty: ['', [Validators.required]],
                sl_no: this.fb.array([])
              });
        }
    ngOnInit(): void {
        this.ct=this.stockIn.controls;
        this.getDevice();
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/demo/data/Weather Station API Documentation.pdf');
        }
    resetData(){
      this.stockIn.reset();
      this.selectedCountryAdvanced=[];
      this.company_n=null;
      this.product_n=null;
      this.warr_in_month=0;
      for (let i = 0; i <= this.skillsFormArray.length; i++) {
        this.skillsFormArray.removeAt(i);
          }
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
            this.cities=this.data1.data
            // this.selectedDealer=this.cities[0]

            console.log(this.selectedDealer);


          },
          (error) => {
            if(error.status=='401'){
              this.router.navigate(['/']);
              debugger
             }
            console.log(error.status);
            this.spinner=false
            if(error.status=='401'){
              this.router.navigate(['/']);
              debugger
             }
            console.log(error.status);
          }
        );
    }
    setDevice(){

            this.deviceId=this.selectedDealer.device_id;
            this.deviceName=this.selectedDealer.device;

    }
    getMQTT(){
        if(this.selectedDealer){
            this.MQTTvalue='';
            this.MQTTvalue=`WMS/${this.client_id}/${this.deviceId}/${this.deviceName}`
        }
        else{
            this.MQTTvalue='';
            this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Please Select a Device', life: 3000 });
        }
    }

     // Function to open the PDF in a new tab
  openPdf() {
    const url = 'assets/demo/data/Weather Station API Documentation.pdf'; // Path to the PDF in the assets folder
    window.open(url, '_blank'); // Opens in a new browser tab
  }

  // Function to trigger the download of the PDF
  downloadPdf() {
    const link = document.createElement('a');
    link.href = 'assets/demo/data/Weather Station API Documentation.pdf'; // Path to the PDF in the assets folder
    link.download = 'Weather Station API Documentation.pdf'; // File name for the downloaded PDF
    link.click();
  }
    getDeviceModel(){
        const apiUrl = this.api.baseUrl;
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

          this.http.get(apiUrl+'/master/model_name', { headers }).subscribe(
              (response) => {
                console.log(response);
                this.modelList=response
                this.models=this.modelList.data
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
    getDealer(){
      const apiUrl = this.api.baseUrl;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

        this.http.get(apiUrl+'/seller/list', { headers }).subscribe(
            (response) => {
              console.log(response);
              this.dealerList=response
              this.dealer=this.dealerList.data
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
    insertStockData(){
      this.spinner=true;
      debugger
      const credentials = {
        model_id: this.modelID,
        purchase_rate:this.ct.purchase_rate.value,
        purchase_by:this.ct.purchase_by.value,
        purchase_date:this.formatedDate(this.ct.purchase_date.value),
        warranty_expired:this.formatedDate(this.ct.warranty_expired.value),
        cgst_p:this.ct.cgst_p.value,
        sgst_p:this.ct.sgst_p.value,
        serial_number:this.ct.sl_no.value,
        sales_rate:this.ct.sales_rate.value,
        // sels_warranty:this.formatedDate(this.ct.sels_warranty.value)
      };
      debugger
    const apiUrl = this.api.baseUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    debugger
    this.http.post(apiUrl+'/stock/in', credentials,{ headers }).subscribe(
        (response) => {
          console.log(response);
          const res:any=response
          debugger
          if(res.status){
            this.spinner=false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'New Stock Added', life: 3000 });
          this.resetData();
          }
          else{
            this.spinner=false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data Related Issue!!', life: 3000 });
          }
        },
        (error) => {
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
          console.error(error);
            this.spinner=false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'From Server Side !!', life: 3000 });
        }
      );
    }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.models.length; i++) {
            const country = this.models[i];
            if (country.model_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
                debugger
            }
        }

        this.filteredCountries = filtered;

    }
    filterDealer(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.cities.length; i++) {
            const dealer = this.cities[i];
            if (dealer.device.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(dealer);

            }
        }

        this.filteredDealer = filtered;

    }
    setWarranty(){
        this.warr_in_month=this.warr_in_month?this.warr_in_month:0;
        const inputDateObject = new Date(this.ct.purchase_date.value);
        if (!isNaN(inputDateObject.getTime())) {
          inputDateObject.setMonth(inputDateObject.getMonth() + Number(this.warr_in_month));

          this.stockIn.get('warranty_expired').setValue(inputDateObject);
        } else {
          console.error('Invalid date input');
        }
        debugger
    }
    calculateOutputDate() {

      }
      selected(){
        console.log(this.selectedCountryAdvanced);
        this.modelID=this.selectedCountryAdvanced.model_id;
        this.product_n=this.selectedCountryAdvanced.product_name;
        this.company_n=this.selectedCountryAdvanced.company_name;
        debugger
    }
    setDealer(){
      console.log(this.selectedDealer);
      this.ct.purchase_by.setValue(this.selectedDealer.id);
      debugger
  }
    get skillsFormArray() {
      return this.stockIn.get('sl_no') as FormArray;
    }
    addSkill() {
      this.skillsFormArray.push(this.fb.control(''));
    }

    removeSkill(index: number) {
      this.skillsFormArray.removeAt(index);
    }
    addItem(i:any){
      if (i.keyCode === 13) {
        this.addSkill();

       this.lastAddedIndex=this.skillsFormArray.length;
        const ln = this.skillsFormArray.length;
        this.lastAddedIndex=ln-1
        // this.removeSkill(ln-1);
        debugger
      }
    }
    formatedDate(dt:any){
      const originalDateStr = dt;
      const originalDate = new Date(originalDateStr);

      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with 0 if needed
      const day = String(originalDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      console.log(formattedDate);
      return formattedDate;
    }


}
