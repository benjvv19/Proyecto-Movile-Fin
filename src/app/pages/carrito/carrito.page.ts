import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {
  carrito: any[] = [];

  constructor() {
  }

  finalizarCompra() {
    console.log('Compra finalizada');
  }
}
