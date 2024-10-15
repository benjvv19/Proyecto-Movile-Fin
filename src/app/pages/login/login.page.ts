import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private serviceBD: ServicebdService // Inyecta tu servicio
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { correo, contraseña } = this.loginForm.value;
  
      // Validar el usuario
      const usuario: Usuarios | null = await this.serviceBD.validarUsuario(correo, contraseña);
  
      if (usuario) {
        localStorage.setItem('userId', usuario.id_usuario.toString()); 
  
        if (usuario.id_rol === 1) {
          this.router.navigate(['/adminproductos']);
        } else if (usuario.id_rol === 2) {
          this.router.navigate(['/inicio']);
        }
  
        this.loginForm.reset(); 
      } else {
        this.presentAlert('Login Fallido', 'Correo o contraseña incorrectos.');
      }
    } else {
      this.presentAlert('Formulario Incompleto', 'Por favor, completa todos los campos correctamente.');
    }
  }
}