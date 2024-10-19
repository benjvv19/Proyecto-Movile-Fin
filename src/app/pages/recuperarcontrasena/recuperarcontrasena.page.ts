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
    private bd: ServicebdService // Inyectar el servicio
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

    // Verificar si el correo existe en la base de datos
    const existeCorreo = await this.bd.verificarCorreo(this.correo, 0); // Se pasa 0 ya que no se necesita id_usuario aquí
    if (!existeCorreo) {
      this.presentAlert('Correo no encontrado', 'No se encontró ningún usuario asociado a este correo.');
      return;
    }

    // Mostrar mensaje de verificación de correo
    this.presentAlert('Verificación de correo', 'Por favor, verifique su correo para recuperar su contraseña.');

    // Redirigir a otra página si es necesario
    this.router.navigate(['/cambiarcontra']);
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