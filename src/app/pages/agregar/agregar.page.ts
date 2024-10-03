import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {
  product = {
    description: '',
    type: '',
    image: '',
    brand: '',
    name: '',
    price: null
  };
  showError = false;

  constructor(private router: Router, private toastController: ToastController) { }

  async onSubmit() {
    const form = document.querySelector('form') as HTMLFormElement;

    if (form.checkValidity()) {
      
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
}