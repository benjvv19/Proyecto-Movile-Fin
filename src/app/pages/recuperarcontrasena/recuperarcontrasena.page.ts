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
  pregunta: string = "";
  respuesta: string = "";

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

  // Método para verificar correo
  async verificarCorreo() {
    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return false;
    }

    const existeCorreo = await this.bd.verificarCorreo(this.correo, 0); 
    if (!existeCorreo) {
      this.presentAlert('Correo no encontrado', 'No se encontró ningún usuario asociado a este correo.');
      return false;
    }

    return true;
  }

  // Método para verificar la pregunta
  async verificarPregunta() {
    if (!this.pregunta) {
      this.presentAlert('Pregunta vacía', 'Por favor, seleccione una pregunta de seguridad.');
      return false;
    }

    const esPreguntaValida = await this.bd.verificarPregunta(this.correo, this.pregunta, 0);
    if (!esPreguntaValida) {
      this.presentAlert('Pregunta incorrecta', 'La pregunta de seguridad no es válida para este correo.');
      return false;
    }

    return true;
  }

  // Método para verificar la respuesta
  async verificarRespuesta() {
    if (!this.respuesta) {
      this.presentAlert('Respuesta vacía', 'Por favor, ingrese la respuesta a la pregunta de seguridad.');
      return false;
    }

    const esRespuestaValida = await this.bd.verificarRespuesta(this.correo, this.respuesta, 0);
    if (!esRespuestaValida) {
      this.presentAlert('Respuesta incorrecta', 'La respuesta proporcionada no es válida.');
      return false;
    }

    return true;
  }

  // Método para gestionar la recuperación de contraseña
  async Ircontra() {
    const correoValido = await this.verificarCorreo();
    if (!correoValido) return;

    const preguntaValida = await this.verificarPregunta();
    if (!preguntaValida) return;

    const respuestaValida = await this.verificarRespuesta();
    if (!respuestaValida) return;

    // Si todas las verificaciones son exitosas
    this.presentAlert('Verificación exitosa', 'Por favor, verifique su correo para recuperar su contraseña.');

    // Navegar a la página de cambio de contraseña
    this.router.navigate(['/cambiarcontra']);
    this.correo = "";
    this.pregunta = "";
    this.respuesta = "";
  }

  // Función para mostrar alertas
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
