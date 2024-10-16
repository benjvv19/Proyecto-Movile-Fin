import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admindetalles',
  templateUrl: './admindetalles.page.html',
  styleUrls: ['./admindetalles.page.scss'],
})
export class AdmindetallesPage implements OnInit {
    alertButtons = ['Cerrar'];

    zapatilla: any = {
      id_zapatilla: '',
      nombre: '',
      descripcion: '',
      imagen_url: '',
      precio: '',
      id_categoria: '',
      nombre_marca: '',
      nombre_categoria: '',
      stock:''
    };
  
    private dbStateSubscription: Subscription = new Subscription();
  
    constructor(private bd: ServicebdService, private route: ActivatedRoute) {}
  
    async ngOnInit() {
      this.dbStateSubscription = this.bd.dbState().subscribe(async data => {
        if (data) {
          const idParam = this.route.snapshot.paramMap.get('id');
          const id = idParam ? +idParam : null; // Convertir el id a número si no es null
  
          if (id !== null) {
            // Llamar al método BuscarZapatillas y actualizar la zapatilla
            await this.bd.BuscarZapatillas(id); // Usar await aquí
            this.bd.fetchZapatilla().subscribe(res => {
              if (res.length > 0) {
                this.zapatilla = res[0]; // Suponiendo que solo habrá una zapatilla con ese ID
              }
            });
          }
        }
      });
    }
  
    ngOnDestroy() {
      this.dbStateSubscription.unsubscribe(); // Cancelar la suscripción
    }
  
    anadirCarrito(zapatilla: any) {
      if (zapatilla) {
        // Lógica para añadir al carrito
      }
    }
  
    getImageUrl(url: string): string {
      return url ? url : 'assets/icon/default-image.jpg'; // Si no hay URL, devuelve la imagen por defecto
    }
  
    setDefaultImage(event: Event) {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = 'assets/icon/default-image.jpg'; // Cambia la imagen a la por defecto
    }
  }