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
    return rolId !== null && rolId !== '0';
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