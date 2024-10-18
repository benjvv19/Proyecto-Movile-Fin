import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = "";
  apellido: string = "";
  id_rol: number = 2;
  correo: string = "";
  telefono: string = "";
  contrasena: string = "";
  imagen: any = ""; // Cambiar a tipo string

  private readonly defaultImageUrl: string = '../assets/icon/perfil.jpg'; // URL de la imagen por defecto

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

    // Verificar si el usuario ya existe
    const existeUsuario = await this.verificarUsuarioExistente();
    if (existeUsuario) {
      this.presentAlert('Usuario existente', 'El usuario ya está registrado con ese correo o teléfono.');
      return;
    }

    // Si pasa todas las validaciones y no existe, proceder con el registro
    await this.onSubmit();
  }

  async verificarUsuarioExistente(): Promise<boolean> {
    const usuarioExistente = await this.bd.verificarUsuario(this.correo, this.telefono);
    return usuarioExistente; 
  }

  async onSubmit() {
    try {
      await this.insertarUsuario();

      const toast = await this.toastController.create({
        message: 'Usuario registrado con éxito',
        color: 'success',
        duration: 2000
      });
      toast.present();

      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      this.presentAlert('Error', 'Hubo un problema al registrar el usuario. Inténtalo nuevamente.');
    }
  }

  // Modificar este método para incluir la imagen
  insertarUsuario() {
    // Usar la imagen por defecto si no se ha tomado una foto
    const imagenFinal = this.imagen || this.defaultImageUrl; // Asigna la imagen por defecto si no hay imagen
    return this.bd.insertarUsuarios(this.nombre, this.apellido, this.correo, this.telefono, this.id_rol, this.contrasena, imagenFinal); // Usar imagenFinal
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    this.imagen = image.webPath; // Asignar la URL de la imagen al campo imagen
  };
}
