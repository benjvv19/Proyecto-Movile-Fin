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
  nombre_categoria: string = ""; // Cambiado de id_categoria a nombre_categoria
  stock: any = "";

  showError = false;

  constructor(private bd: ServicebdService, private router: Router, private toastController: ToastController) { }

  async onSubmit(productForm: any) {
    const form = productForm;

    // Validaciones adicionales
    if (this.precio < 0) {
      await this.presentToast('El precio no puede ser menor a 0', 'danger');
      return;
    }

    if (this.stock < 1) {
      await this.presentToast('El stock no puede ser menor a 1', 'danger');
      return;
    }

    if (!this.nombre_categoria) {
      await this.presentToast('Debe ingresar un nombre de categoría', 'danger');
      return;
    }

    if (!this.imagen_url) {
      await this.presentToast('Debe ingresar una imagen', 'danger');
      return;
    }

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

  // Método para manejar la selección de archivo
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

  // Método de inserción de datos en la base de datos
  insertar() {
    // Llamamos al servicio para insertar la zapatilla
    this.bd.insertarZapatillas(
      this.nombre, 
      this.descripcion, 
      this.imagen_url, 
      this.precio, 
      this.nombre_marca, 
      this.nombre_categoria,  // Se pasa el nombre de la categoría en lugar del id
      this.stock
    );
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
