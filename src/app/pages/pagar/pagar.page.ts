import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage {
  nombreTitular: string = '';
  usuario: Usuarios | null = null;
  productosCarrito: any[] = [];
  totalPagar: number = 0;
  formattedCardNumber: string = '';
  formattedExpiryDate: string = '';
  cvv: string = '';
  constructor(
    private storage: NativeStorage,
    private alertController: AlertController,
    private navController: NavController,
    private serviceBD: ServicebdService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.serviceBD.obtenerUsuarioPorId(parseInt(userId)).then((usuario) => {
        this.usuario = usuario;
      });
    }

    const carrito = history.state?.productos;
    if (carrito) {
      this.productosCarrito = carrito.map((item: any) => ({
        ...item,
        imagen_url: item.imagen_url,
      }));
      this.calcularTotal();
    } else {
      this.productosCarrito = [];
    }
  }

  calcularTotal() {
    this.totalPagar = (this.productosCarrito || []).reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  }
  

  get isCardNumberValid(): boolean {
    const plainCardNumber = this.formattedCardNumber.replace(/\s/g, '');
    return plainCardNumber.length === 16;
  }

  get isCvvValid(): boolean {
    const cvvInput = document.querySelector('#cvv') as HTMLInputElement | null;
    const cvvValue = cvvInput?.value || '';
    return cvvValue.length === 3;
  }

  get isExpiryDateValid(): boolean {
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return expiryPattern.test(this.formattedExpiryDate);
  }

  formatCardNumber(event: any) {
    const input = event.target.value.replace(/\D/g, '');
    const formatted = input.match(/.{1,4}/g)?.join(' ') || '';
    this.formattedCardNumber = formatted;
    event.target.value = formatted;
  }

  limitCvv(event: any) {
    const input = event.target.value.replace(/\D/g, '');
    event.target.value = input.slice(0, 3);
  }

  formatExpiryDate(event: any) {
    const input = event.target.value.replace(/\D/g, '');
    let formatted = input.slice(0, 2);
    if (input.length > 2) {
      formatted += '/' + input.slice(2, 4);
    }
    this.formattedExpiryDate = formatted;
    event.target.value = formatted;
  }

  async onSubmit(form: any) {
    const { cardNumber, expiryDate, cardType, cvv } = form.value;

    const isCardTypeSelected = !!cardType;
    const isNameValid = this.usuario
      ? this.nombreTitular.trim().toLowerCase() === `${this.usuario.nombre} ${this.usuario.apellido}`.toLowerCase()
      : false;

    if (
      form.valid &&
      this.isCardNumberValid &&
      this.isCvvValid &&
      isCardTypeSelected &&
      isNameValid
    ) {
      const ventaData = {
        id_usuario: localStorage.getItem('userId'),
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
        total: this.totalPagar,
      };

      await this.guardarVenta(ventaData, this.productosCarrito);

      this.productosCarrito = [];
      await this.storage.remove(`productos_carrito_${ventaData.id_usuario}`);
      this.totalPagar = 0;

      const alert = await this.alertController.create({
        header: 'Pago exitoso',
        message: 'Su pago ha sido procesado con éxito.',
        buttons: ['OK'],
      });
      await alert.present();

      form.reset();
      this.navController.navigateBack('/boletas');
    } else {
      let errorMessage = 'Por favor, complete todos los campos correctamente.';

      if (!cvv) {
        errorMessage = 'El CVV no puede estar vacío.';
      } else if (!this.isCvvValid) {
        errorMessage = 'El CVV debe ser de 3 dígitos.';
      } else if (!this.isCardNumberValid) {
        errorMessage = 'El número de tarjeta debe contener 16 dígitos.';
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

  async guardarVenta(ventaData: any, productosCarrito: any[]) {
    const queryVenta = `INSERT INTO ventas (id_usuario, fecha, total) VALUES (?, ?, ?)`;

    return this.serviceBD.database
      .executeSql(queryVenta, [
        ventaData.id_usuario,
        ventaData.fecha,
        ventaData.total,
      ])
      .then(async (ventaResult) => {
        const id_venta = ventaResult.insertId;

        const queries = productosCarrito.map((producto) =>
          this.serviceBD.database.executeSql(
            `INSERT INTO detalle_ventas (id_venta, id_zapatilla, precio, cantidad, imagen_url) VALUES (?, ?, ?, ?, ?)`,
            [
              id_venta,
              producto.id_zapatilla,
              producto.precio,
              producto.cantidad,
              producto.imagen_url,
            ]
          )
        );

        await Promise.all(queries);
        await this.actualizarStock(productosCarrito);
      })
      .catch((error) => {
        console.error('Error al guardar la venta:', error);
      });
  }

  async actualizarStock(productosCarrito: any[]) {
    const queries = productosCarrito.map((producto) => {
      const nuevoStock = producto.stock - producto.cantidad;
      return this.serviceBD.database.executeSql(
        `UPDATE zapatillas SET stock = ? WHERE id_zapatilla = ?`,
        [nuevoStock, producto.id_zapatilla]
      );
    });

    return Promise.all(queries);
  }
}
