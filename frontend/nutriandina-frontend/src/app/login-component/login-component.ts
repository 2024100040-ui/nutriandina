import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationToken } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  constructor(private authToken: AuthenticationToken, private router: Router) {}

  username: string = '';
  password: string = '';
  error: string = '';

  login() {
    this.error = '';
    this.authToken.login(this.username, this.password).subscribe({
      next: resp => {
        if (resp.token) {
          this.router.navigate(['inicio']);
        }
      },
      error: () => (this.error = 'Usuario o contraseña incorrectos'),
    });
  }
}


