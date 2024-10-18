import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleVentas } from 'src/app/services/detalleventas';
import { ServicebdService } from 'src/app/services/servicebd.service';


@Component({
  selector: 'app-detalleboletas',
  templateUrl: './detalleboletas.page.html',
  styleUrls: ['./detalleboletas.page.scss'],
})
export class DetalleboletasPage implements OnInit {
  id_venta!: number;  // Variable para almacenar el ID de la venta
  detallesVenta: DetalleVentas[] = []; // Array para almacenar los detalles de la venta

  constructor(
    private route: ActivatedRoute,
    private bd: ServicebdService
  ) {}

  ngOnInit() {
    // Obtener el id_venta de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.id_venta = +params['id_venta']; // Convertir a número
      this.BuscarBoleta(this.id_venta); // Llamar al método para obtener detalles
    });
    
  }

  // Método para buscar los detalles de la venta
  BuscarBoleta(id_venta: number) {
    this.bd.BuscarBoleta(id_venta).then(() => {
      this.bd.listadoDetalleVentas.subscribe((detalles: DetalleVentas[]) => {
        this.detallesVenta = detalles; // Asignar los detalles obtenidos a la propiedad
      });
    }).catch(error => {
      console.error('Error al buscar boleta:', error);
      // Manejar el error, por ejemplo, mostrando una alerta
    });
  }


  getImageUrl(url: string): string {
    return url ? url : 'assets/icon/default-image.jpg'; // Si no hay URL, devuelve la imagen por defecto
  }

  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/default-image.jpg'; // Cambia la imagen a la por defecto
  }

  calcularTotal(): number {
    return this.detallesVenta.reduce((total, detalle) => total + (detalle.precio * detalle.cantidad), 0);
  }


}