import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.page.html',
  styleUrls: ['./cambiarcontra.page.scss'],
})
export class CambiarcontraPage implements OnInit {
  correo: string = "";
  password: string = "";
  repassword: string = "";

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private bd: ServicebdService // Inyección del servicio
  ) { }

  ngOnInit() { }

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  async CambiarContra() {
    if (!this.correo || !this.password || !this.repassword) {
      await this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      await this.presentAlert('Contraseña débil', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }

    if (this.password !== this.repassword) {
      await this.presentAlert('Contraseñas no coinciden', 'La contraseña y la confirmación de la contraseña deben coincidir.');
      return;
    }

    // Verificar si el correo existe
    const existeCorreo = await this.bd.verificarCorreo(this.correo, 0); // Asumiendo que el id_usuario es 0 si no se necesita en este caso
    if (!existeCorreo) {
      await this.presentAlert('Correo no encontrado', 'No se encontró un usuario con este correo.');
      return;
    }

    // Actualizar la contraseña
    const actualizacionExito = await this.bd.actualizarContrasena(this.correo, this.password);
    if (actualizacionExito) {
      await this.presentToast('top'); 
      this.router.navigate(['/login']);
    } else {
      await this.presentAlert('Error', 'No se pudo actualizar la contraseña. Inténtalo de nuevo más tarde.');
    }
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Contraseña cambiada con éxito',
      duration: 2500,
      position: position,
      color: 'success'
    });
    await toast.present();
  }
}
