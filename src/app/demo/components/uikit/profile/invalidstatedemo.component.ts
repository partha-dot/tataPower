import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import * as bcrypt from 'bcryptjs';
import { MessageService } from 'primeng/api';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}
export interface UserData {
    user_id: number;
    user_name: string;
    user_email: string;
    user_info_id: number;
    user_active_status: string;
    user_type: string;
    otp_number: number;
    otp_active_status: string;
    o_password: string;
    n_password: string;
    cn_password: string;
    created_by: number;
    created_at: string;
    client_id: number;
    client_name: string;
    client_address: string;
    client_mobile: string;
    client_email: string;
  }
@Component({
    templateUrl: './invalidstatedemo.component.html',
    styleUrls:['./invalidstatedemo.component.scss'],
    providers: [MessageService]
})
export class InvalidStateDemoComponent implements OnInit {
    uploadedFiles: any[] = [];

    countries: any[] = [];

    userData:UserData;

    cities: any[];

    filteredCountries: any[] = [];

    email: any;

    userName: any;

    visible: boolean = false;
    visible2: boolean = false;

    constructor(private countryService: CountryService,private messageService: MessageService) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    ngOnInit() {
        this.email=localStorage.getItem('email');
        this.userName=localStorage.getItem('ORG_NAME');
        const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
        console.log(storedUserData);
        this.userData=storedUserData;
        const hashedPassword = '$2b$12$39Zwv2vx3IUEpQ7g/axHLeyI68c4BvQVUl.HM3NcZS/mllLmeR2dG';

        // The plain text password input by the user
        const plainTextPassword = 'user_input_password';

        // Function to verify password
        const isMatch = bcrypt.compareSync(plainTextPassword, hashedPassword);

        if (isMatch) {
        console.log('Password matches!');
        } else {
        console.log('Password does not match!');
        }

        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
    }
    onUpload(event:UploadEvent) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
    searchCountry(event: any) {
        // in a real application, make a request to a remote url with the query and return filtered results,
        // for demo we filter at client side
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
abc(){
   this.visible2=true

}
    editUser() {
        this.visible = true;
    }

}
