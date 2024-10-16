import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Subscription } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit, OnDestroy {
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

  constructor(private router: Router,private bd: ServicebdService, private route: ActivatedRoute,private alertController: AlertController,
    private storage: NativeStorage) {}

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


  getImageUrl(url: string): string {
    return url ? url : 'assets/icon/default-image.jpg'; // Si no hay URL, devuelve la imagen por defecto
  }

  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/default-image.jpg'; // Cambia la imagen a la por defecto
  }



  cargarProducto() {
    // Definir los datos del producto para el carrito
    const productoParaCarrito = {
     id_zapatilla: this.zapatilla.id_zapatilla,
     nombre: this.zapatilla.nombre,
     descipcion: this.zapatilla.descipcion,
     imagen_url: this.zapatilla.imagen_url,
     precio: this.zapatilla.precio,
     id_categoria: this.zapatilla.id_categoria,
     nombre_marca: this.zapatilla.nombre_marca,
     nombre_categoria: this.zapatilla.nombre_categoria,
     stock: this.zapatilla.stock,
     cantidad: 1 // Inicia con 1 unidad del producto
   };
  
   this.storage.getItem('productos_carrito').then((productos: any[]) => {
    if (productos) {
      const productoExistente = productos.find(p => p.id === productoParaCarrito.id_zapatilla);

      if (productoExistente) {
        if (productoExistente.cantidad < productoExistente.stock) {
          productoExistente.cantidad++;
          productoExistente.precio += productoParaCarrito.precio; 
        } else {
          console.log('No se puede agregar más, se ha alcanzado el límite de stock');
        }
      } else {
        productos.push(productoParaCarrito);
      }

      this.storage.setItem('productos_carrito', productos)
        .then(() => {
          console.log('Producto añadido al carrito correctamente');
          this.presentAlert('Éxito', 'Producto añadido al carrito'); // Mostrar alerta
          this.router.navigate(['/inicio']); // Redirigir a inicio
        })
        .catch(error => console.error('Error al actualizar el carrito', error));
    } else {
      this.storage.setItem('productos_carrito', [productoParaCarrito])
        .then(() => {
          console.log('Carrito creado y producto añadido correctamente');
          this.presentAlert('Éxito', 'Producto añadido al carrito'); // Mostrar alerta
          this.router.navigate(['/inicio']); // Redirigir a inicio
        })
        .catch(error => console.error('Error al crear el carrito', error));
    }
  }).catch(() => {
    this.storage.setItem('productos_carrito', [productoParaCarrito])
      .then(() => {
        console.log('Carrito creado y producto añadido correctamente');
        this.presentAlert('Éxito', 'Producto añadido al carrito'); // Mostrar alerta
        this.router.navigate(['/inicio']); // Redirigir a inicio
      })
      .catch(error => console.error('Error al crear el carrito', error));
  });
}



  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }


}