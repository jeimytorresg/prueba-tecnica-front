import { Component, inject } from '@angular/core';
import { SidebarStateService } from '../sidebar-state.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html'
})
export class Header {
  private sidebarState = inject(SidebarStateService);
  private authService = inject(AuthService);
  private router = inject(Router);

  usuarioActual = {
    nombre: 'Rubén Gómez',
    rol: 'Administrador',
    iniciales: 'RG'
  };

  empresaActual = 'Empresa 1';

  toggleSidebar() {
    this.sidebarState.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}