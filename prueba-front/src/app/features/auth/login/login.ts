import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  hidePassword = true;

  constructor() {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      recordar: [false]
    });
  }


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const credentials = {
        email: this.loginForm.value.usuario,
        password: this.loginForm.value.contrasena
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/marcas']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Credenciales inválidas. Por favor, intente de nuevo.';
          console.error('Login error:', error);
        }
      });
    } else {

      this.loginForm.markAllAsTouched();
    }
  }
}