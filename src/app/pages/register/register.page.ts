import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = "usuario";
  apellido: string = "usuario";
  numero: number = 922031334;
  email: string = "usuario@gmail.com";
  contra: string = "Usuario@1234";


  constructor(private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }
  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }


  irLogin() {
    // Verificar que todos los campos estén completos
    if (!this.nombre || !this.apellido || !this.numero || !this.email || !this.contra) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    // Verificar que el nombre y el apellido solo contengan letras
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.nombre)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }

    if (!nombreRegex.test(this.apellido)) {
      this.presentAlert('Apellido inválido', 'El apellido solo debe contener letras, espacios y guiones.');
      return;
    }

    // Validar número de teléfono
    const numeroStr = this.numero.toString();
    if (isNaN(Number(this.numero)) || numeroStr.length > 12 || numeroStr.length < 8) {
      this.presentAlert('Número inválido', 'El número de teléfono debe ser válido y tener 8 y 12 dígitos.');
      return;
    }

    // Validar correo electrónico
    if (!this.validarEmail(this.email)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Validar contraseña
    if (this.contra.length < 8) {
      this.presentAlert('Contraseña corta', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Validar que la contraseña contenga al menos un número, una letra mayúscula, una letra minúscula y un carácter especial
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.contra)) {
      this.presentAlert('Contraseña débil', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }

    let navigationextras: NavigationExtras = {
      state: {
        nom: this.nombre,
        ape: this.apellido,
        num: this.numero,
        corre: this.email,
        con: this.contra

      }

    };

    this.presentToast('top');
    this.router.navigate(['/login'], navigationextras);

  }


  //PresentAlert
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  //Alerta Toast
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Usuario registrado con exito',
      duration: 2500,
      position: position,
      color: 'success'

    });

    await toast.present();
  }
}