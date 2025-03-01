import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string | null = null;
  constructor(private router: Router,private api:ApiService) { }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
  logout(): void {
    this.token = null;
    // localStorage.removeItem('token');
    this.router.navigate(['/']);
    localStorage.clear();

  }
}
