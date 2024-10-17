import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {
  productosCarrito: any[] = [];
  precioTotal: number = 0;

  constructor(private storage: NativeStorage, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.cargarCarrito();
  }

  async cargarCarrito() {
    try {
      this.productosCarrito = await this.storage.getItem('productos_carrito') || [];
      this.calcularTotal();
    } catch {
      console.log('No hay productos en el carrito');
      this.productosCarrito = [];
    }
  }

  async eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    await this.updateCarrito();
    this.calcularTotal();
    this.presentAlert('Éxito', 'Producto eliminado correctamente');
  }

  async vaciarCarrito() {
    this.productosCarrito = [];
    this.precioTotal = 0;
    await this.updateCarrito();
    this.presentAlert('Éxito', 'Carrito vaciado correctamente');
  }

  async updateCarrito() {
    try {
      await this.storage.setItem('productos_carrito', this.productosCarrito);
      console.log('Carrito actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
    }
  }

  increaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.calcularTotal();
      this.updateCarrito();
    } else {
      this.presentAlert('Stock Insuficiente', 'No hay suficiente stock disponible');
    }
  }

  decreaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.calcularTotal();
      this.updateCarrito();
    } else {
      this.presentAlert('Cantidad Mínima', 'No puedes disminuir más la cantidad, debe ser al menos 1');
    }
  }

  calcularTotal() {
    this.precioTotal = this.productosCarrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  pagar() {
    if (this.productosCarrito.length > 0) {
      this.router.navigate(['/pagar'], { state: { productos: this.productosCarrito } });
    } else {
      this.presentAlert('Carrito vacío', 'No tienes productos en el carrito para pagar.');
    }
  }
}