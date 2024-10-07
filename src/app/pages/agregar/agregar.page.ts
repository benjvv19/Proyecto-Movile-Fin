import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  nombre: string = "";
  descripcion: string = "";
  imagen_url: string = "";
  precio: any = "";
  id_marca: any = "";
  id_categoria: any = "";

  showError = false;

  constructor(private bd: ServicebdService, private router: Router, private toastController: ToastController) { }

  async onSubmit(productForm: any) {
    const form = productForm;
  
    if (form.valid) {
      this.insertar();
      form.reset();
      this.router.navigate(['/adminproductos']);
    } else {
      this.showError = true;
      const toast = await this.toastController.create({
        message: 'Debe ingresar todos los datos del producto',
        color: 'danger',
        duration: 2000
      });
      toast.present();
    }
  }

  insertar(){
    this.bd.insertarZapatillas(this.nombre, this.descripcion,this.imagen_url,this.precio,this.id_marca,this.id_categoria);
  }
}


