import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Venta } from 'src/app/services/venta';

@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.page.html',
  styleUrls: ['./boletas.page.scss'],
})
export class BoletasPage implements OnInit {
  arregloBoletas: Venta[] = []; 

  constructor(private bd: ServicebdService, private router: Router) {}

  ngOnInit() {
    const id_usuario = parseInt(localStorage.getItem('userId') || '0', 10);
  }

  seleccionarBoletas(id_usuario: number) {
    this.bd.seleccionarBoletas(id_usuario).then(() => {
      this.bd.listadoVentas.subscribe((ventas: Venta[]) => {
        this.arregloBoletas = ventas; 
      });
    });
  }

  verDetalles(id_venta: number) {
    this.router.navigate(['/detalleboletas', id_venta]);
  }

}