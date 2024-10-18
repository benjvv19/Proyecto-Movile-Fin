import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mascondiciones',
  templateUrl: './mascondiciones.page.html',
  styleUrls: ['./mascondiciones.page.scss'],
})
export class MascondicionesPage implements OnInit {
  terminos: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.cargarTerminos();
  }

  cargarTerminos() {
    this.apiService.obtenerTerminos().subscribe(
      data => {
        this.terminos = data; // Almacena los términos obtenidos
        console.log(this.terminos); // Para depuración
      },
      error => {
        console.error('Error al obtener los términos:', error);
      }
    );
  }
}