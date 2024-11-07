import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Venta } from 'src/app/services/venta';

@Component({
  selector: 'app-boletasadmin',
  templateUrl: './boletasadmin.page.html',
  styleUrls: ['./boletasadmin.page.scss'],
})
export class BoletasadminPage implements OnInit {
  arregloBoletas: Venta[] = [];

  constructor(private bd: ServicebdService, private router: Router) {}

  ngOnInit() {
    this.seleccionarTodasBoletas();
  }

  seleccionarTodasBoletas() {
    this.bd.seleccionarTodasBoletas().then(() => {
      this.bd.listadoVentas.subscribe((ventas: Venta[]) => {
        this.arregloBoletas = ventas;
      });
    });
  }

  verDetalles(id_venta: number) {
    this.router.navigate(['/detalleboletas', id_venta]);
  }
}
