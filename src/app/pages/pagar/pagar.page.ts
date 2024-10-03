import { Component} from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage{
  constructor(private alertController: AlertController) {}

  async onSubmit(form: any) {
    if (form.valid) {
      const alert = await this.alertController.create({
        header: 'Pago exitoso',
        message: 'Su pago ha sido procesado con éxito.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}