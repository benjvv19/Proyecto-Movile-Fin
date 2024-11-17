import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editarcategorias',
  templateUrl: './editarcategoria.page.html',
  styleUrls: ['./editarcategoria.page.scss'],
})
export class EditarcategoriaPage implements OnInit {
  categorias: any[] = [];
  categoriaSeleccionada: any = null;
  nuevoNombre: string = '';

  constructor(
    private servicebd: ServicebdService,
    private navCtrl: NavController,
    private alertController: AlertController  
  ) {}

  ngOnInit() {
    const idCategoria = 1;
    this.obtenerCategoriaPorId(idCategoria);
  }

  obtenerCategoriaPorId(id_categoria: number) {
    this.servicebd.obtenerCategoriasPorid(id_categoria).subscribe((categoria) => {
      if (categoria && categoria.length > 0) {
        this.categoriaSeleccionada = categoria[0];
        this.nuevoNombre = this.categoriaSeleccionada.nombre_categoria;
      } else {
        alert('Categoría no encontrada.');
      }
    }, (error) => {
      console.error('Error al obtener la categoría:', error);
      alert('Ocurrió un error al obtener la categoría.');
    });
  }

  async mostrarConfirmacion() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: `¿Estás seguro de modificar el nombre de la categoría y el nombre de las zapatillas?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operación cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.actualizarCategoria();
          }
        }
      ]
    });

    await alert.present();
  }

  actualizarCategoria() {
    if (this.nuevoNombre && this.categoriaSeleccionada) {
      this.servicebd.actualizarCategoriaYZapatillas(this.categoriaSeleccionada.id_categoria, this.nuevoNombre).subscribe(
        (response: any) => {
          alert('Categoría actualizada con éxito.');
          this.categoriaSeleccionada.nombre_categoria = this.nuevoNombre;
          
          this.navCtrl.back();
        },
        (error: any) => {
          console.error('Error al actualizar la categoría:', error);
          alert('Ocurrió un error al actualizar la categoría.');
        }
      );
    } else {
      alert('Por favor ingresa un nombre válido para la categoría.');
    }
  }
}
