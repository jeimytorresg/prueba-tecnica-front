import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('contrasena');
  const confirmPassword = control.get('confirmarContrasena');


  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null; 
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  

  hidePassword = true;
  hideConfirmPassword = true;

  constructor() {

    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', [Validators.required]],

      terminos: [false, [Validators.requiredTrue]] 
    }, { 

      validators: passwordMatchValidator 
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const userData = {
        fullName: this.registerForm.value.nombre,
        email: this.registerForm.value.correo,
        password: this.registerForm.value.contrasena
      };

      this.authService.register(userData).subscribe({
        next: () => {
          this.isLoading = false;
          // After registration, we could log them in or redirect to login
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 409) {
            this.errorMessage = 'El correo ya está en uso.';
          } else {
            this.errorMessage = 'Ocurrió un error al registrar. Intente de nuevo.';
          }
          console.error('Registration error:', error);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}