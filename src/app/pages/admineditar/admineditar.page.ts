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

  zapatilla: any; 
  nombre_marca: string = ""; 

  showError = false;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService, private toastController: ToastController) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.zapatilla = this.router.getCurrentNavigation()?.extras?.state?.['zapatilla']; 
        this.nombre_marca = this.zapatilla.nombre_marca; 
      }
    });
  }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    // Validaciones
    if (!this.zapatilla.descripcion || !this.zapatilla.precio || !this.zapatilla.id_categoria || !this.nombre_marca || !this.zapatilla.stock) {
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

    if (this.zapatilla.id_categoria < 1 || this.zapatilla.id_categoria > 4) {
      await this.presentToast('La categoría debe estar entre 1 y 4', 'danger');
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
    this.bd.modificarZapatillas(this.zapatilla.id_zapatilla, this.zapatilla.descripcion, this.zapatilla.imagen_url, this.zapatilla.precio, this.nombre_marca, this.zapatilla.id_categoria, this.zapatilla.stock);  
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