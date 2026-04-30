import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

  registerForm: FormGroup;
  

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
      console.log('Cuenta creada con éxito:', this.registerForm.value);

      this.router.navigate(['/admin/marcas']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}