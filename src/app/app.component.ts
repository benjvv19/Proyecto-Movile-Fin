import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router,private storage: NativeStorage) {}



  shouldShowToolbar(): boolean {
    const rolId = localStorage.getItem('rolId');
    const currentRoute = this.router.url;

    return rolId !== null && rolId !== '0' && !['/login', '/register', '/recuperarcontrasena','/cambiarcontra'].includes(currentRoute);
  }

  shouldShowAdminMenu(): boolean {
    const rolId = localStorage.getItem('rolId');
    return rolId === '1';
  }

  shouldShowUserMenu(): boolean {
    const rolId = localStorage.getItem('rolId');
    return rolId === '2';
  }

  cerrar() {

  
    this.router.navigate(['/login']);
  }
  
}