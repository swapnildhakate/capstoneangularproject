import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private username: string = '';

  constructor(private router: Router) { }

  setUserName(username: string): void {
    this.username = username;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('username', username);
    }
  }

  getUserName(): string {
    return this.username || (typeof localStorage !== 'undefined' ? localStorage.getItem('username') : '') || '';
  }

  logout(): void {
    this.username = '';
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('username');
    }
    this.router.navigate(['/login']); 
  }
}
