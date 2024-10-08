import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre: string = "";
  apellido: string = "";
  id_rol: number = 2; // Rol por defecto (usuario)
  correo: string = "";
  telefono: string = "";
  contrasena: string = "";

  showError = false;

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  // Validar correo electrónico
  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  // Validar formulario y mostrar alertas si es necesario
  async irLogin() {
    // Verificar que todos los campos estén completos
    if (!this.nombre || !this.apellido || !this.telefono || !this.correo || !this.contrasena) {
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
    const numeroStr = this.telefono.toString();
    if (isNaN(Number(this.telefono)) || numeroStr.length > 12 || numeroStr.length < 8) {
      this.presentAlert('Número inválido', 'El número de teléfono debe ser válido y tener entre 8 y 12 dígitos.');
      return;
    }

    // Validar correo electrónico
    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Validar contraseña
    if (this.contrasena.length < 8) {
      this.presentAlert('Contraseña corta', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Validar que la contraseña contenga al menos un número, una letra mayúscula, una letra minúscula y un carácter especial
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.contrasena)) {
      this.presentAlert('Contraseña débil', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }

    // Si pasa todas las validaciones, proceder con el registro
    await this.onSubmit();
  }

  // Método para registrar al usuario
  async onSubmit() {
    // Insertar usuario y datos del usuario en la base de datos
    try {
      await this.insertarUsuario();
      await this.insertarInfoUsuario();

      // Mostrar un toast de éxito
      const toast = await this.toastController.create({
        message: 'Usuario registrado con éxito',
        color: 'success',
        duration: 2000
      });
      toast.present();

      // Navegar al login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      this.presentAlert('Error', 'Hubo un problema al registrar el usuario. Inténtalo nuevamente.');
    }
  }

  // Método para insertar el usuario
  insertarUsuario() {
    return this.bd.insertarUsuarios(this.nombre, this.apellido, this.id_rol);
  }

  // Método para insertar la información del usuario
  insertarInfoUsuario() {
    return this.bd.insertarInformacionUsuarios(this.correo, this.telefono, this.contrasena);
  }

  // Método para mostrar alertas
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

/*
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
  */