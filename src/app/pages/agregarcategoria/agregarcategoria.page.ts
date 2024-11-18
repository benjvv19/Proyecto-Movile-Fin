import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.page.html',
  styleUrls: ['./agregarcategoria.page.scss'],
})
export class AgregarCategoriaPage {
  nombreCategoria: string = ''; 

  constructor(
    private router: Router,
    private alertController: AlertController,
    private servicebd: ServicebdService
  ) {}

  agregarCategoria() {
    if (this.nombreCategoria.trim().length < 3) {
      this.presentAlert('Error', 'El nombre de la categoría debe tener al menos 3 caracteres.');
      return;
    }

    this.servicebd.insertarCategoria(this.nombreCategoria.trim())
      .then(() => {
        this.router.navigate(['/categorias']); 
      })
      .catch((error) => {
        this.presentAlert('Error', `Error al agregar la categoría: ${JSON.stringify(error)}`);
      });
  }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
