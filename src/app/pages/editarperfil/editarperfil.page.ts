import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  usuario: Usuarios | null = null;
  imagen: string | null = null;  
  private readonly defaultImageUrl: string = '../assets/icon/perfil.jpg'; 

  constructor(
    private serviceBD: ServicebdService,
    private router: Router,
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  async cargarPerfil() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.usuario = await this.serviceBD.obtenerUsuarioPorId(Number(userId));
      if (!this.usuario) {
        console.error('Usuario no encontrado.');
      } else {
        this.imagen = this.usuario.imagen || this.defaultImageUrl;
      }
    } else {
      console.error('No hay ID de usuario en el localStorage.');
    }
  }

  takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
  
      this.imagen = image.webPath || this.defaultImageUrl;
      
      if (this.usuario) {
        this.usuario.imagen = this.imagen;
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.presentAlert("Error", "Hubo un problema al tomar la foto.");
    }
  };

  // Método para manejar el botón "Guardar Cambios"
  async guardarCambios() {
    if (this.usuario) {
      // Validaciones
      if (!this.validarTelefono(this.usuario.telefono)) {
        this.presentAlert("Error", "El teléfono debe tener exactamente 9 dígitos y solo contener números.");
        return;
      }

      if (!this.validarCorreo(this.usuario.correo)) {
        this.presentAlert("Error", "El correo debe contener un @ y un .");
        return;
      }

      try {
        const correoExistente = await this.serviceBD.verificarCorreo(this.usuario.correo, this.usuario.id_usuario);
        if (correoExistente) {
          this.presentAlert("Error", "El correo ingresado ya existe.");
          return; 
        }

        const telefonoExistente = await this.serviceBD.verificarTelefono(this.usuario.telefono, this.usuario.id_usuario);
        if (telefonoExistente) {
          this.presentAlert("Error", "El teléfono ingresado ya existe.");
          return; 
        }

        // Asigna la imagen final (si no hay imagen seleccionada, usa la predeterminada)
        const imagenFinal = this.imagen || this.defaultImageUrl;

        // Actualiza el usuario con la imagen seleccionada
        await this.serviceBD.modificarUsuario(this.usuario.id_usuario, this.usuario.correo, this.usuario.telefono, imagenFinal);
        this.router.navigate(['/perfil']);
      } catch (error) {
        console.error('Error al modificar el usuario:', error);
      }
    }
  }

  // Método para validar el teléfono
  validarTelefono(telefono: string): boolean {
    const telefonoRegex = /^[0-9]{9}$/;
    return telefonoRegex.test(telefono);
  }

  // Método para validar el correo
  validarCorreo(email: string): boolean {
    const re = /@.*\./;
    return re.test(String(email).toLowerCase());
  }

  volver() {
    this.router.navigate(['/perfil']);
  }

  presentAlert(titulo: string, mensaje: string) {
    this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    }).then(alert => {
      alert.present();
    });
  }
}
