import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuarios } from 'src/app/services/usuarios';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private storage: NativeStorage,
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

    // Obtener los productos del carrito
    const carrito = history.state.productos; // Recibe los productos del carrito
    if (carrito) {
      this.productosCarrito = carrito.map((item: any) => ({
        ...item,
        imagen_url: item.imagen_url // Asegúrate de que cada producto tenga esta propiedad
      }));
      this.calcularTotal(); // Calcular el total a pagar
    }
  }

  calcularTotal() {
    this.totalPagar = this.productosCarrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
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
      // Guardar la venta en la base de datos
      const ventaData = {
        id_usuario: localStorage.getItem('userId'),
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato YYYY-MM-DD HH:MM:SS
        total: this.totalPagar,
      };

      await this.guardarVenta(ventaData, this.productosCarrito); 

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

  async guardarVenta(ventaData: any, productosCarrito: any[]) {
    const queryVenta = `INSERT INTO ventas (id_usuario, fecha, total) VALUES (?, ?, ?)`;

    // Primero insertar la venta
    return this.serviceBD.database.executeSql(queryVenta, [
      ventaData.id_usuario,
      ventaData.fecha,
      ventaData.total
    ]).then(async (ventaResult) => {
      const id_venta = ventaResult.insertId; // Obtener el ID de la venta insertada

      // Insertar los detalles de los productos
      const queries = [];
      for (const producto of productosCarrito) {
        const queryDetalle = `INSERT INTO detalle_ventas (id_venta, id_zapatilla, precio, cantidad, imagen_url) VALUES (?, ?, ?, ?, ?)`;
        const detalleQuery = this.serviceBD.database.executeSql(queryDetalle, [
          id_venta, // Usar el mismo id_venta para todos los productos
          producto.id_zapatilla,
          producto.precio,
          producto.cantidad,
          producto.imagen_url // Ahora incluye la URL de la imagen
        ]);
        queries.push(detalleQuery);
      }

      return Promise.all(queries);  // Ejecutar todas las inserciones en detalle_ventas
    }).catch((error) => {
      console.error('Error al guardar la venta:', error);
    });
  }
}
