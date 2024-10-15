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
  foto_zapatilla: string = "";
  imagen_url: string = "";
  precio: any = "";
  nombre_marca: string = "";  // Cambiado de id_marca a nombre_marca
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

  onFileSelected(event: any) {
    const file = event.target.files[0];  // Obtén el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convertimos la imagen a base64 o URL para la vista previa
        this.imagen_url = e.target.result;  // Guardamos la URL en la variable
      };
      reader.readAsDataURL(file);  // Leemos el archivo como una URL o base64
    }
  }

  insertar(){
    this.bd.insertarZapatillas(this.nombre, this.descripcion, this.imagen_url, this.precio, this.nombre_marca, this.id_categoria);  // Cambiado de id_marca a nombre_marca
  }
}