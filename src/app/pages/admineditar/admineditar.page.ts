import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admineditar',
  templateUrl: './admineditar.page.html',
  styleUrls: ['./admineditar.page.scss'],
})
export class AdmineditarPage {

  zapatilla: any={}; 
  nombre_marca: string = ""; 
  nombre_categoria: string = ""; 

  showError = false;

  constructor(
    private router: Router, 
    private activedrouter: ActivatedRoute, 
    private bd: ServicebdService, 
    private toastController: ToastController
  ) {
    // Acceder a los datos pasados a través de state
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    
    if (navigationState && navigationState['zapatilla']) {
      this.zapatilla = navigationState['zapatilla'];
      this.nombre_marca = this.zapatilla.nombre_marca;
      this.nombre_categoria = this.zapatilla.nombre_categoria;
    } else {
      // Aquí podrías manejar el caso en que no haya 'zapatilla' en el state
      console.error('Zapatilla no encontrada en el state.');
    }
  }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    // Validaciones
    if (!this.zapatilla.descripcion || !this.zapatilla.precio || !this.nombre_categoria || !this.nombre_marca || !this.zapatilla.stock) {
      await this.presentToast('Debe completar todos los datos del producto a modificar', 'danger');
      this.showError = true;
      return;
    }

    if (this.zapatilla.precio < 0) {
      await this.presentToast('El precio no puede ser menor a 0', 'danger');
      return;
    }

    if (this.zapatilla.stock < 1) {
      await this.presentToast('El stock no puede ser menor a 1', 'danger');
      return;
    }


    if (form.valid) {
      this.modificar();
      this.router.navigate(['/adminproductos']);
    } else {
      this.showError = true;
      await this.presentToast('Debe completar todos los datos del producto a modificar', 'danger');
    }
  }

  modificar() {
    this.bd.modificarZapatillas(this.zapatilla.id_zapatilla, this.zapatilla.descripcion, this.zapatilla.imagen_url, this.zapatilla.precio, this.nombre_marca, this.nombre_categoria, this.zapatilla.stock);  
  }

  // Método reutilizable para mostrar mensajes tipo "toast"
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}