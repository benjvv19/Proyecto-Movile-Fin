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
  contrasena1: string = ""; 
  contrasena2: string = ""; 
  imagen: any = ""; 
  pregunta: string ="";
  respuesta: string ="";
  


  private readonly defaultImageUrl: string = '../assets/icon/perfil.jpg'; 

  constructor(
    private bd: ServicebdService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  async irLogin() {

    if (!this.nombre || !this.apellido || !this.telefono || !this.correo || !this.contrasena1 || !this.contrasena2 || !this.pregunta || !this.respuesta) {
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

    // Validar contraseñas
    if (this.contrasena1.length < 8) {
      this.presentAlert('Contraseña corta', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.contrasena1 !== this.contrasena2) {
      this.presentAlert('Contraseñas no coinciden', 'Las contraseñas ingresadas no coinciden.');
      return;
    }

    // Validar que la contraseña contenga al menos un número, una letra mayúscula, una letra minúscula y un carácter especial
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.contrasena1)) {
      this.presentAlert('Contraseña débil', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }

    // Verificar si el correo o teléfono ya existen
    const existeCorreo = await this.bd.verificarCorreo(this.correo, 0); // Usamos 0 ya que es un nuevo registro
    if (existeCorreo) {
      this.presentAlert('Correo existente', 'Ya existe un usuario registrado con ese correo.');
      return;
    }

    const existeTelefono = await this.bd.verificarTelefono(this.telefono, 0); // Usamos 0 ya que es un nuevo registro
    if (existeTelefono) {
      this.presentAlert('Teléfono existente', 'Ya existe un usuario registrado con ese número de teléfono.');
      return;
    }

    // Si pasa todas las validaciones, proceder con el registro
    await this.onSubmit();
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
    const imagenFinal = this.imagen || this.defaultImageUrl;
    return this.bd.insertarUsuarios(this.nombre, this.apellido, this.correo, this.telefono, this.id_rol, this.contrasena1, imagenFinal, this.pregunta, this.respuesta);
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
  
    this.imagen = image.webPath;
  };
}
