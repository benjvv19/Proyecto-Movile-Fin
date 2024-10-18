import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Venta } from 'src/app/services/venta'; // Asegúrate de que esta importación sea correcta

@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.page.html',
  styleUrls: ['./boletas.page.scss'],
})
export class BoletasPage implements OnInit {
  arregloBoletas: Venta[] = []; // Array para almacenar las boletas

  constructor(private bd: ServicebdService, private router: Router) {}

  ngOnInit() {
    const id_usuario = parseInt(localStorage.getItem('userId') || '0', 10); // Obtener el id_usuario del local storage
    this.seleccionarBoletas(id_usuario); // Llamar al método para seleccionar las boletas
  }

  seleccionarBoletas(id_usuario: number) {
    this.bd.seleccionarBoletas(id_usuario).then(() => {
      this.bd.listadoVentas.subscribe((ventas: Venta[]) => {
        this.arregloBoletas = ventas; // Asignar las ventas obtenidas a la propiedad
      });
    });
  }

  verDetalles(id_venta: number) {
    this.router.navigate(['/detalleboletas', id_venta]);
  }
}