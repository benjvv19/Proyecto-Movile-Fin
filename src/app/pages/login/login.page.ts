import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  hide = true;  

  arregloPersona: any[] = [
    {
      correo: 'usuario@gmail.com',
      contraseña: 'usuario',
      numero: 922031334
    }
  ];

  arregloAdministradores: any[] = [
    {
      correo: 'admin@gmail.com',
      contraseña: 'admin',
      numero: 922031334
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]], 
      contraseña: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const { correo, contraseña } = this.loginForm.value;

      const usuario = this.arregloPersona.find(u => u.correo === correo && u.contraseña === contraseña);
      const administrador = this.arregloAdministradores.find(u => u.correo === correo && u.contraseña === contraseña);

      if (usuario) {
        this.presentAlert('Login exitoso', 'Bienvenido, usuario');
        this.router.navigate(['/inicio']);
      } else if (administrador) {
        this.presentAlert('Login exitoso', 'Bienvenido, administrador');
        this.router.navigate(['/adminproductos']);
      } else {
        this.presentAlert('Error', 'Credenciales incorrectas');
      }
    } else {
      this.presentAlert('Error', 'Por favor, complete todos los campos correctamente.');
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

  // Method to toggle password visibility
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
