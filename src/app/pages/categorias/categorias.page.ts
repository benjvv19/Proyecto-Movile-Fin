import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: any[] = [];
  zapatillas: any[] = [];
  categoriaSeleccionada: string | null = null;

  constructor(
    private servicebd: ServicebdService,
    private nativeStorage: NativeStorage, 
    private router: Router  
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.servicebd.obtenerCategorias().subscribe((data: any[]) => {
      this.categorias = data;
    });
  }

  seleccionarCategoria(nombre_categoria: string) {
    this.categoriaSeleccionada = nombre_categoria;
    this.servicebd.obtenerZapatillasPorCategoria(nombre_categoria).subscribe((data: any[]) => {
      this.zapatillas = data;
    });
  }

  seleccionarZapatilla(id_zapatilla: number) {
    this.nativeStorage.setItem('id_zapatilla', id_zapatilla).then(() => {
      this.router.navigate(['/detalles', id_zapatilla]);
    }).catch((error) => {
      console.error("Error al guardar el id de la zapatilla en el almacenamiento:", error);
    });
  }
}
