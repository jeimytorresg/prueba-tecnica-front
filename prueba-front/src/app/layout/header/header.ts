import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html'
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  usuarioActual = {
    nombre: 'Rubén Gómez',
    rol: 'Administrador',
    iniciales: 'RG'
  };

  empresaActual = 'Empresa 1';
}