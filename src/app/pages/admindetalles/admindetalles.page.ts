import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Subscription } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admindetalles',
  templateUrl: './admindetalles.page.html',
  styleUrls: ['./admindetalles.page.scss'],
})
export class AdmindetallesPage implements OnInit, OnDestroy {
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
    stock: ''
  };

  private dbStateSubscription: Subscription = new Subscription();
  isButtonDisabled: boolean = false; // Propiedad para controlar el estado del botón

  constructor(private router: Router, private bd: ServicebdService, private route: ActivatedRoute,
              private alertController: AlertController, private storage: NativeStorage) {}

  async ngOnInit() {
    this.dbStateSubscription = this.bd.dbState().subscribe(async data => {
      if (data) {
        const idParam = this.route.snapshot.paramMap.get('id');
        const id = idParam ? +idParam : null; // Convertir el id a número si no es null

        if (id !== null) {
          // Llamar al método BuscarZapatillas y actualizar la zapatilla
          await this.bd.BuscarZapatillas(id);
          this.bd.fetchZapatilla().subscribe(res => {
            if (res.length > 0) {
              this.zapatilla = res[0]; // Suponiendo que solo habrá una zapatilla con ese ID
              this.isButtonDisabled = this.zapatilla.stock === 0; // Actualizar estado del botón según el stock
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

  cargarProducto() {
    const productoParaCarrito = {
      id_zapatilla: this.zapatilla.id_zapatilla,
      nombre: this.zapatilla.nombre,
      descripcion: this.zapatilla.descripcion,
      imagen_url: this.zapatilla.imagen_url,
      precio: this.zapatilla.precio,
      nombre_marca: this.zapatilla.nombre_marca,
      nombre_categoria: this.zapatilla.nombre_categoria,
      stock: this.zapatilla.stock,
      cantidad: 1
    };
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.presentAlert('Error', 'No se encontró el usuario. Inicia sesión nuevamente.');
      return;
    }
    const carritoKey = `productos_carrito_${userId}`;
  
    this.storage.getItem(carritoKey).then((productos: any[]) => {
      if (productos) {
        const productoExistente = productos.find(p => p.id_zapatilla === productoParaCarrito.id_zapatilla);
  
        if (productoExistente) {
          this.presentAlert('Producto ya en el carrito', 'La zapatilla ya está en tu carrito.'); 
          return;
        }
  
        productos.push(productoParaCarrito);
        this.storage.setItem(carritoKey, productos)
          .then(() => {
            console.log('Producto añadido al carrito correctamente');
            this.presentAlert('Éxito', 'Producto añadido al carrito');
            this.router.navigate(['/inicio']);
          })
          .catch(error => console.error('Error al actualizar el carrito', error));
      } else {
        this.storage.setItem(carritoKey, [productoParaCarrito])
          .then(() => {
            console.log('Carrito creado y producto añadido correctamente');
            this.presentAlert('Éxito', 'Producto añadido al carrito'); 
            this.router.navigate(['/inicio']);
          })
          .catch(error => console.error('Error al crear el carrito', error));
      }
    }).catch(() => {
      this.storage.setItem(carritoKey, [productoParaCarrito])
        .then(() => {
          console.log('Carrito creado y producto añadido correctamente');
          this.presentAlert('Éxito', 'Producto añadido al carrito'); 
          this.router.navigate(['/inicio']); 
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
