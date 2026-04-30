import { Component, inject } from '@angular/core';
import { SidebarStateService } from '../sidebar-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html'
})
export class Header {
  private sidebarState = inject(SidebarStateService);

  usuarioActual = {
    nombre: 'Rubén Gómez',
    rol: 'Administrador',
    iniciales: 'RG'
  };

  empresaActual = 'Empresa 1';

  toggleSidebar() {
    this.sidebarState.toggle();
  }
}