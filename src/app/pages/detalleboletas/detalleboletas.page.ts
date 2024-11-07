import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleVentas } from 'src/app/services/detalleventas';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalleboletas',
  templateUrl: './detalleboletas.page.html',
  styleUrls: ['./detalleboletas.page.scss'],
})
export class DetalleboletasPage implements OnInit {
  id_venta!: number;
  detallesVenta: DetalleVentas[] = [];

  constructor(
    private route: ActivatedRoute,
    private bd: ServicebdService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_venta = +params['id_venta'];
      this.BuscarBoleta(this.id_venta);
    });
  }

  BuscarBoleta(id_venta: number) {
    this.bd.BuscarBoleta(id_venta).then(() => {
      this.bd.listadoDetalleVentas.subscribe((detalles: DetalleVentas[]) => {
        this.detallesVenta = detalles;
      });
    }).catch(error => {
      console.error('Error al buscar boleta:', error);
    });
  }

  getImageUrl(url: string): string {
    return url ? url : 'assets/icon/default-image.jpg';
  }

  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/default-image.jpg';
  }

  calcularTotal(): number {
    return this.detallesVenta.reduce((total, detalle) => total + (detalle.precio * detalle.cantidad), 0);
  }

  volver() {
    const rolId = parseInt(localStorage.getItem('rolId') || '0', 10);
    if (rolId === 1) {
      this.router.navigate(['/boletasadmin']);
    } else if (rolId === 2) {
      this.router.navigate(['/boletas']);
    }
  }
}
