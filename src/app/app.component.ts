import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  shouldShowToolbar(): boolean {
    const rolId = localStorage.getItem('rolId');
    const currentRoute = this.router.url; // Obtener la ruta actual

    // Verificar si el rol es válido y que no esté en las rutas de login, registro o recuperar contraseña
    return rolId !== null && rolId !== '0' && !['/login', '/register', '/recuperarcontrasena'].includes(currentRoute);
  }

  shouldShowAdminMenu(): boolean {
    const rolId = localStorage.getItem('rolId');
    return rolId === '1';
  }

  shouldShowUserMenu(): boolean {
    const rolId = localStorage.getItem('rolId');
    return rolId === '2';
  }
}