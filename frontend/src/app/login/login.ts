import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    console.log("Login button clicked");

    const loginData = {
      username: this.username,
      password: this.password
    };

    console.log(loginData);

    this.authService.login(loginData).subscribe({

      next: (response) => {
        console.log(response);

        localStorage.setItem('token', response.token);

        alert('Login Successful');

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {

        alert(error.error.message);

      }

    });

  }

}