import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

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