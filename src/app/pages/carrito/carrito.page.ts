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
    this.storage.getItem('productos_carrito')
      .then((productos) => {
        this.productosCarrito = productos || [];
        this.calcularTotal();
      })
      .catch(() => {
        console.log('No hay productos en el carrito');
        this.productosCarrito = [];
      });
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    this.storage.setItem('productos_carrito', this.productosCarrito)
      .then(() => {
        console.log('Producto eliminado correctamente');
        this.calcularTotal();
      })
      .catch(error => {
        console.error('Error al actualizar el carrito:', error);
      });
  }

  vaciarCarrito() {
    this.productosCarrito = [];
    this.precioTotal = 0;
    this.storage.setItem('productos_carrito', this.productosCarrito)
      .then(() => {
        console.log('Carrito vaciado correctamente');
      })
      .catch(error => {
        console.error('Error al vaciar el carrito:', error);
      });
  }

  increaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.calcularTotal();
      this.storage.setItem('productos_carrito', this.productosCarrito);
    } else {
      console.log('No hay suficiente stock disponible');
    }
  }

  decreaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.calcularTotal();
      this.storage.setItem('productos_carrito', this.productosCarrito);
    } else {
      console.log('No puedes disminuir más la cantidad, debe ser al menos 1');
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