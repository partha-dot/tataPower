import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/demo/service/api.service';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',

    styleUrls: ['./login.component.css'],
    // styles: [`
    //     :host ::ng-deep .pi-eye,
    //     :host ::ng-deep .pi-eye-slash {
    //         transform:scale(1.6);
    //         margin-right: 1rem;
    //         color: var(--primary-color) !important;
    //     }
    // `],
    providers: [MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];
    userForm: FormGroup;
    spinner:boolean=false;
    password!: string;
    ct:any
    project = {value: 0};

    constructor( private messageService: MessageService, public layoutService: LayoutService,private apiService: ApiService,private fb: FormBuilder,private router: Router) {
        this.userForm = this.fb.group({
            // Define your form controls here
            mail: ['', Validators.required],
            pass: ['', Validators.required]
            // Add more controls as needed
          });
    }
    ngOnInit(): void {
        localStorage.clear();
        this.ct=this.userForm.controls
    }

    loginCall() {
      // localStorage.setItem('loginType',this.project.value==1?"demo":"pro");

      this.project.value
      debugger
        const requestData = {
          email:this.ct.mail.value,
          password:this.ct.pass.value,
        };
        this.spinner=true;
        this.apiService.login(requestData).subscribe(
          (response) => {
            if(response.status=='success'){
              this.spinner=false;
              const data=response.data;
              const userdata=data.user_data;
              console.log(userdata);
                if(userdata.user_type=='U'){
                    localStorage.setItem('ORG_NAME',userdata.organization_name);
                }
                else if(userdata.user_type=='C'){
                    localStorage.setItem('ORG_NAME',userdata.client_name);
                }
              this.apiService.token=data.token;
              localStorage.setItem('token',data.token);
              localStorage.setItem('user',userdata.user_name);
              localStorage.setItem('user_id',userdata.user_id);
              localStorage.setItem('email',userdata.user_email);
              localStorage.setItem('u_type',userdata.user_type);
              localStorage.setItem('c_id',userdata.client_id);
              localStorage.setItem('userData', JSON.stringify(userdata));
              this.router.navigate(['/app/outlet/weather']);
            }
            // q1e3
            else{
                  this.spinner=false;
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong username or password !!', life: 3000 });

            }
            console.log('Response:', response);
            // Handle response here
          },
          (error) => {
        if(error.status=='401'){
          this.router.navigate(['/']);
          debugger
         }
        console.log(error.status);
            console.error('Error:', error);
            this.spinner=false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong username or password !!', life: 3000 });

          }
        );
      }
}
