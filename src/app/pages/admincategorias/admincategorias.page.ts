import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admincategorias',
  templateUrl: './admincategorias.page.html',
  styleUrls: ['./admincategorias.page.scss'],
})
export class AdmincategoriasPage implements OnInit {
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
    this.router.events.subscribe(() => {
      this.cargarCategorias();
    });
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
    this.nativeStorage
      .setItem('id_zapatilla', id_zapatilla)
      .then(() => {
        this.router.navigate(['/admindetalles', id_zapatilla]);
      })
      .catch((error) => {
        console.error(
          'Error al guardar el id de la zapatilla en el almacenamiento:',
          error
        );
      });
  }

  eliminarCategoria(id_categoria: number, nombre_categoria: string) {
    if (
      confirm(
        '¿Estás seguro de que deseas eliminar esta categoría y todas las zapatillas asociadas?'
      )
    ) {
      this.servicebd
        .eliminarCategoria(id_categoria, nombre_categoria)
        .then(() => {
          this.categorias = this.categorias.filter(
            (c) => c.id_categoria !== id_categoria
          );

          if (this.categoriaSeleccionada === nombre_categoria) {
            this.zapatillas = [];
            this.categoriaSeleccionada = null;
          }

          alert('Categoría y zapatillas asociadas eliminadas con éxito.');
        })
        .catch((error) => {
          console.error('Error al eliminar la categoría:', error);
          alert('Ocurrió un error al intentar eliminar la categoría.');
        });
    }
  }

  editarCategoria(categoria: any) {
    this.router.navigate(['/editarcategoria', categoria.id_categoria]);
  }

  irAgregarCategoria() {
    this.router.navigate(['/agregarcategoria']);
  }
}
