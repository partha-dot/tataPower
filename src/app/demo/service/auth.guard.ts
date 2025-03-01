import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router,private api:ApiService) {}

  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.api.token) { return true; }

   else{ 
    // alert("hello")
    // const bankName = localStorage.getItem('__bName');
    localStorage.clear();
     this.router.navigate(['/']);
    return false;
   }
    
  }
} 