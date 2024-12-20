import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent {
  username: string = '';
  email: string = ''; 
  address: string = ''; 
  password: string = ''; 
  repeatPassword: string = '';
  message: string = '';
  showMessage: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    if (this.password !== this.repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = { 
      username: this.username, 
      email: this.email,
      address: this.address, 
      password: this.password 
    };

    this.http.post('http://localhost:5000/register', user)
      .subscribe((response: any) => {
        this.message = response.message;
        this.showMessage = true;
        this.resetForm();

        // Navigate to the login page after registration
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000); // Adjust the delay as needed
      }, (error) => {
        console.error('An error occurred while registering the user', error);
      });
  }

  resetForm() {
    this.username = '';
    this.email = '';
    this.address = '';
    this.password = '';
    this.repeatPassword = '';
    setTimeout(() => {
      this.showMessage = false;
    }, 5000); // Hide the success message after 5 seconds
  }
}
