import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { }

  login() {
    const user = { username: this.username, password: this.password };

    this.http.post('http://localhost:5000/login', user)
      .subscribe((response: any) => {
        console.log('Response: ', response);
        this.message = 'Login successful';
        this.apiService.setUserName(this.username);
      localStorage.setItem('username', this.username);

        // navigate to the meeting schedule page after login
        console.log('Navigating to meeting schedule');
        this.router.navigate(['/schedule']);
      }, (error) => {
        console.error('An error occurred while logging in the user', error);
        this.message = 'Login failed. Please try again.';
      });
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
