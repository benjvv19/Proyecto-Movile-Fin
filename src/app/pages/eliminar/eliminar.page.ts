import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {
  
  

  arregloZapatillas: any[] = [
    {
      id_zapatilla: '',
      nombre: '',
      descripcion: '',
      imagen_url: '',
      precio: '',
      id_marca: '',
      id_categoria: ''
    }
  ];

  constructor(private bd: ServicebdService) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      // Validar si la BD está lista
      if (data) {
        // Suscribirse al observable de la lista de Zapatillas
        this.bd.fetchZapatillas().subscribe(res => {
          this.arregloZapatillas = res;
        });
      }
    });
  }



  // Método para obtener la URL de la imagen
  getImageUrl(url: string): string {
    return url ? url : 'assets/icon/default-image.jpg'; // Si no hay URL, devuelve la imagen por defecto
  }

  // Método para manejar el error de la imagen
  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/default-image.jpg'; // Cambia la imagen a la por defecto
  }

  eliminar(x:any){
    this.bd.eliminarZapatillas(x.id_zapatilla);
  }

}
    
 