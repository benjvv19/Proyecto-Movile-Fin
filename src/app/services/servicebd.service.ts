import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Zapatillas } from './zapatillas';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creacion de tablas
  tablaCategoriaZapatillas: string = "CREATE TABLE categoria_zapatillas (id_categoria INTEGER NOT NULL,nombre_categoria TEXT NOT NULL,PRIMARY KEY (id_categoria));";
  tablaMarcaZapatillas: string = "CREATE TABLE marca_zapatillas (id_marca INTEGER NOT NULL,nombre_marca TEXT NOT NULL,PRIMARY KEY (id_marca));";
  tablaRoles: string = "CREATE TABLE roles (id_rol INTEGER NOT NULL,nombre_rol TEXT NOT NULL,PRIMARY KEY (id_rol);";
  tablaUsuarios: string = "CREATE TABLE usuarios (id_usuario INTEGER NOT NULL,nombre TEXT NOT NULL,apellido TEXT NOT NULL,id_rol INTEGER NOT NULL,PRIMARY KEY (id_usuario),FOREIGN KEY (id_rol) REFERENCES roles(id_rol));";
  tablaInformacionUsuario: string = "CREATE TABLE informacion_usuario (id_informacion INTEGER NOT NULL,correo TEXT NOT NULL,telefono TEXT NOT NULL,contrasena TEXT NOT NULL,id_usuario INTEGER NOT NULL,PRIMARY KEY (id_informacion),FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario));";
  tablaInventario: string = "CREATE TABLE inventario (id_inventario INTEGER NOT NULL,id_zapatilla INTEGER NOT NULL,cantidad_disponible INTEGER NOT NULL,ultima_actualizacion TEXT NOT NULL,PRIMARY KEY (id_inventario),FOREIGN KEY (id_zapatilla) REFERENCES zapatillas(id_zapatilla));";
  tablaMetodosPago: string = "CREATE TABLE metodos_pago (id_metodo_pago INTEGER NOT NULL,nombre_metodo TEXT NOT NULL,descripcion TEXT,PRIMARY KEY (id_metodo_pago));";
  tablaHistorialPedidos: string = "CREATE TABLE historial_pedidos (id_historial INTEGER NOT NULL,id_pedido INTEGER NOT NULL,estado_anterior TEXT NOT NULL,estado_nuevo TEXT NOT NULL,fecha_cambio TEXT NOT NULL,PRIMARY KEY (id_historial),FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido));";
  
  tablaZapatillas: string = "CREATE TABLE zapatillas (id_zapatilla INTEGER NOT NULL,nombre TEXT NOT NULL,descripcion TEXT NOT NULL,imagen_url TEXT NOT NULL,precio INTEGER NOT NULL,id_marca INTEGER NOT NULL,id_categoria INTEGER NOT NULL,PRIMARY KEY (id_zapatilla),FOREIGN KEY (id_marca) REFERENCES marca_zapatillas(id_marca),FOREIGN KEY (id_categoria) REFERENCES categoria_zapatillas(id_categoria));";

  //varibles de insert por defecto de nuestras tablas
  registroZapatillas: string= "INSERT or IGNORE INTO zapatillas (id_zapatilla, nombre, descripcion, imagen, precio, id_marca, id_categoria)VALUES(1,'soy un nombre','soy una descripcion','', 100, 1, 1)";


  //variables para guardar ñps datps de las consultas en las tablas
  listadoZapatillas = new BehaviorSubject([]);


  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.createBD();
   }

  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables
  fetchZapatillas(): Observable<Zapatillas[]>{
    return this.listadoZapatillas.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }



  //función para crear la Base de Datos
  createBD(){
    //varificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //crear la Base de Datos
      this.sqlite.create({
        name: 'zapatillas.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //capturar la conexion a la BD
        this.database = db;
        //llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })

  }
  
  async crearTablas(){
    try{
      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaZapatillas, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroZapatillas, []);

      this.seleccionarZapatillas();

      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  
  seleccionarZapatillas(){
    return this.database.executeSql('SELECT * FROM zapatillas', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Zapatillas[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_zapatilla: res.rows.item(i).id_zapatilla,
            descripcion: res.rows.item(i).descripcion,
            imagen_url: res.rows.item(i). imagen_url,
            precio: res.rows.item(i).precio,
            id_marca: res.rows.item(i).id_marca,
            id_categoria:res.rows.item(i).id_categoria
          })
        }
        
       }
       //actualizar el observable
       this.listadoZapatillas.next(items as any);

    })
  }


  //Falta modificar, eliminar, insert !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

}
