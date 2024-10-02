import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admineditar',
  templateUrl: './admineditar.page.html',
  styleUrls: ['./admineditar.page.scss'],
})
export class AdmineditarPage {
  zapatilla = {
    id: '',
    name: '',
    description: '',
    brand: '',
    price: null,
    type: ''
  };
  showError = false;

  constructor(private router: Router, private toastController: ToastController) { }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      
      this.router.navigate(['/adminproductos']);
    } else {
      this.showError = true;
      const toast = await this.toastController.create({
        message: 'Debe completar todos los datos del producto a modificar',
        color: 'danger',
        duration: 2000
      });
      toast.present();
    }
  }
}