import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup;
  

  hidePassword = true;

  constructor() {

    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      recordar: [false]
    });
  }


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Datos del formulario:', this.loginForm.value);
      this.router.navigate(['/admin/marcas']);
    } else {

      this.loginForm.markAllAsTouched();
    }
  }
}