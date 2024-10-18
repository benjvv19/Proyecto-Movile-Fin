import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importar Router y NavigationEnd
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';
import { filter } from 'rxjs/operators'; // Importar filter

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Usuarios | null = null;

  constructor(private serviceBD: ServicebdService, private router: Router) {}

  ngOnInit() {
    this.cargarPerfil();

    // Suscribirse a los eventos de navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)) // Filtrar eventos NavigationEnd
      .subscribe(() => {
        this.cargarPerfil(); // Cargar perfil cada vez que se termina una navegación
      });
  }

  async cargarPerfil() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.usuario = await this.serviceBD.obtenerUsuarioPorId(Number(userId));
      if (!this.usuario) {
        console.error('Usuario no encontrado.');
      }
    } else {
      console.error('No hay ID de usuario en el localStorage.');
    }
  }

  // Método para manejar el botón "Volver"
  volver() {
    if (this.usuario) {
      if (this.usuario.id_rol === 1) {
        this.router.navigate(['/adminproductos']); 
      } else if (this.usuario.id_rol === 2) {
        this.router.navigate(['/inicio']); 
      }
    } else {
      console.error('Usuario no encontrado o ID de rol no disponible.');
    }
  }
}
