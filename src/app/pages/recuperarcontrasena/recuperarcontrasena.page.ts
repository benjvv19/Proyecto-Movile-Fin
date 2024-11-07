import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  correo: string = "";
  codigo: string = "";

  constructor(
    private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService 
  ) {}

  ngOnInit() {}

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  async Ircontra() {
    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const existeCorreo = await this.bd.verificarCorreo(this.correo, 0); 
    if (!existeCorreo) {
      this.presentAlert('Correo no encontrado', 'No se encontró ningún usuario asociado a este correo.');
      return;
    }

    this.presentAlert('Verificación de correo', 'Por favor, verifique su correo para recuperar su contraseña.');

    this.router.navigate(['/cambiarcontra']);
    this.correo = "";
    this.codigo = "";
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}