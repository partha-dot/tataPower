import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl = 'http://localhost:8000/api';
  // baseUrl = 'https://iot.wrongcode.in/backend/api';
  // baseUrl = 'http://51.20.92.59:8000/api';
  baseUrl = 'https://tatapw.iotblitz.com/api';
  token:any;
    baseURL: any;
  constructor(private http: HttpClient,@Inject('BASE_URL') private API_URL:string){ }

  login(data: any): Observable<any> {
    const url = `${this.API_URL}/auth/login`;
    return this.http.post(url, data);
  }
  showMsg(){

  }

  /**
   * ******************* SUMAN ************************************
   * @param flag : for detection of API Method (0 => GET, 1=> POST)
   * @param api_name :  Name of the api in which we are oing to hit for fetching / posting data
   * @param data : credentials which i have to send to API
   * @returns : retuns as Observable
   */
    call_api = (flag:number,api_name:string,data:any): Observable<any> => {
        const api_url = `${this.API_URL}/${api_name}`;
        const headers= localStorage.getItem('token') ? new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`) : null
        if(flag > 0){
            /*** For Posting data into API */
            return this.http.post(api_url,data,{headers:headers});
            /*** End */
        }
        else{
            /*** For getting data from API  */
            return this.http.get(api_url,{params:data ? data : '',headers:headers});
            /*** End */
        }
    }

 /*** End */

}
