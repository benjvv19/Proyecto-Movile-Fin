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

  showError = false;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService, private toastController: ToastController) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.zapatilla = this.router.getCurrentNavigation()?.extras?.state?.['zapatilla']; 
      }
    })
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.modificar();
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

  modificar(){
    this.bd.modificarZapatillas(this.zapatilla.id_zapatilla,this.zapatilla.descripcion,this.zapatilla.imagen_url,this.zapatilla.precio,this.zapatilla.id_marca,this.zapatilla.id_categoria);  
  }
}