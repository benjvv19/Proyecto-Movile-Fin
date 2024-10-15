import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage {
  nombreTitular: string = ''; 
  usuario: Usuarios | null = null;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private serviceBD: ServicebdService 
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.serviceBD.obtenerUsuarioPorId(parseInt(userId)).then(usuario => {
        this.usuario = usuario;
      });
    }
  }

  async onSubmit(form: any) {
    const cardNumber = form.value.cardNumber;
    const expiryDate = form.value.expiryDate;
    const cardType = form.value.cardType;

    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

    let isExpiryDateValid = false;
    if (expiryDatePattern.test(expiryDate)) {
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (parseInt(year) > currentYear || (parseInt(year) === currentYear && parseInt(month) >= currentMonth)) {
        isExpiryDateValid = true;
      }
    }

    const isCardTypeSelected = !!cardType;

    const isNameValid = this.usuario 
      ? this.nombreTitular.trim().toLowerCase() === `${this.usuario.nombre} ${this.usuario.apellido}`.toLowerCase() 
      : false;

    if (form.valid && cardNumberPattern.test(cardNumber) && isExpiryDateValid && isCardTypeSelected && isNameValid) {
      const alert = await this.alertController.create({
        header: 'Pago exitoso',
        message: 'Su pago ha sido procesado con éxito.',
        buttons: ['OK'],
      });
      await alert.present();

      form.reset();
      this.navController.navigateBack('/carrito'); 
    } else {
      let errorMessage = 'Por favor, complete todos los campos correctamente.';

      if (!isExpiryDateValid) {
        errorMessage = 'La fecha de expiración no es válida o está vencida.';
      } else if (!isCardTypeSelected) {
        errorMessage = 'Debe seleccionar un tipo de tarjeta.';
      } else if (!isNameValid) {
        errorMessage = 'El nombre del titular no coincide con el nombre del usuario.';
      }

      const alert = await this.alertController.create({
        header: 'Error',
        message: errorMessage,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}