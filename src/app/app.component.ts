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
    
    const excludedRoutes = ['/login', '/register', '/recover-password','/notfound','/notfound','/cambiarcontra']; 
    return !excludedRoutes.includes(this.router.url);
  }

  shouldShowToolbar2(): boolean {
    
    const excludedRoutes = ['/inicio','/login', '/recover-password', '/register','/notfound' ,'/adminproductos','/cambiarcontra']; 
    return !excludedRoutes.includes(this.router.url);
  }

  shouldShowToolbar3(): boolean {
    const includedRoutes = ['/admindetalles', '/admineditar', '/adminproductos', '/agregar', '/eliminar','/cambiarcontra']; 
    return includedRoutes.includes(this.router.url);
  }

  
}
