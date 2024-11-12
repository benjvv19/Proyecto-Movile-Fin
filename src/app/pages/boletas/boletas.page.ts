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
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    if (userId) {
      this.bd.seleccionarTodasBoletasPorId(userId).then(ventas => {
        this.arregloBoletas = ventas;
      }).catch(error => {
        console.error('Error al cargar las boletas:', error);
      });
    }
  }

  verDetalles(id_venta: number) {
    this.router.navigate(['/detalleboletas', id_venta]);
  }
}
