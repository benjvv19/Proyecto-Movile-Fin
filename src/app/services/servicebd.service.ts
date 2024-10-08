import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Zapatillas } from './zapatillas';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creacion de tablas
  
  //
  tablaZapatillas: string = "CREATE TABLE IF NOT EXISTS zapatillas (id_zapatilla INTEGER PRIMARY KEY autoincrement,nombre TEXT NOT NULL,descripcion TEXT NOT NULL,imagen_url TEXT NOT NULL,precio INTEGER NOT NULL,id_marca INTEGER NOT NULL,id_categoria INTEGER NOT NULL,FOREIGN KEY (id_marca) REFERENCES marca_zapatillas(id_marca),FOREIGN KEY (id_categoria) REFERENCES categoria_zapatillas(id_categoria));";
  tablaRoles: string = "CREATE TABLE IF NOT EXISTS roles (id_rol INTEGER PRIMARY KEY autoincrement,nombre_rol TEXT NOT NULL);";
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY autoincrement,nombre TEXT NOT NULL,apellido TEXT NOT NULL,id_rol INTEGER NOT NULL,FOREIGN KEY (id_rol) REFERENCES roles(id_rol));";
  
  tablaInventario: string = "CREATE TABLE IF NOT EXISTS inventario (id_inventario INTEGER PRIMARY KEY autoincrement,id_zapatilla INTEGER NOT NULL,cantidad_disponible INTEGER NOT NULL,ultima_actualizacion TEXT NOT NULL,FOREIGN KEY (id_zapatilla) REFERENCES zapatillas(id_zapatilla));";
  tablaCategoriaZapatillas: string = "CREATE TABLE IF NOT EXISTS categoria_zapatillas (id_categoria INTEGER PRIMARY KEY autoincrement,nombre_categoria TEXT NOT NULL);";
  tablaMarcaZapatillas: string = "CREATE TABLE IF NOT EXISTS marca_zapatillas (id_marca INTEGER PRIMARY KEY autoincrement,nombre_marca TEXT NOT NULL);";
  
  tablaInformacionUsuario: string = "CREATE TABLE IF NOT EXISTS informacion_usuario (id_informacion INTEGER PRIMARY KEY autoincrement,correo TEXT NOT NULL,telefono TEXT NOT NULL,contrasena TEXT NOT NULL,id_usuario INTEGER NOT NULL,FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario));";
  tablaMetodosPago: string = "CREATE TABLE IF NOT EXISTS metodos_pago (id_metodo_pago INTEGER PRIMARY KEY autoincrement,nombre_metodo TEXT NOT NULL,descripcion TEXT);";
  tablaHistorialPedidos: string = "CREATE TABLE IF NOT EXISTS historial_pedidos (id_historial INTEGER PRIMARY KEY autoincrement,id_pedido INTEGER NOT NULL,estado_anterior TEXT NOT NULL,estado_nuevo TEXT NOT NULL,fecha_cambio TEXT NOT NULL,FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido));";
  //


  //varibles de insert por defecto de nuestras tablas
  registroZapatillas: string= "INSERT or IGNORE INTO zapatillas (id_zapatilla, nombre, descripcion, imagen_url, precio, id_marca, id_categoria)VALUES(1,'soy un nombre','soy una descripcion','https://i.postimg.cc/hjPVd5nd/adidas-breaknet-nino.webp', 100, 1, 1),(2,'soy un nombre','soy una descripcion','https://i.postimg.cc/Wpy0d8Hd/adidas-hoops-nino.webp',200, 2, 2)";
  registroUsuarios: string="INSERT OR IGNORE INTO usuarios (id_usuario, nombre, apellido, id_rol) VALUES (1, 'Admin', 'Adminn', 1), (2, 'Usuario', 'Usuarioo', 2);";
  registroRoles: string="INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'admin'), (2, 'usuario');";
  registroInformacionUsuario: string="INSERT OR IGNORE INTO informacion_usuario (id_informacion, correo, telefono, contrasena, id_usuario) VALUES (1, 'admin@gmail.com', '111111111', 'admin', 1), (2, 'usuario@gmail.com', '222222222', 'usuario', 2);";
  registroInventario: string="INSERT or IGNORE INTO inventario (id_inventario, id_zapatilla, cantidad_disponible, ultima_actualizacion) VALUES (1, 1, 50, '2023-10-01')";
  registroHistorialPedidos: string="INSERT or IGNORE INTO historial_pedidos (id_historial, id_pedido, estado_anterior, estado_nuevo, fecha_cambio) VALUES (1, 1, 'Pendiente', 'Recibido', '2023-10-01')";
  registroMarcaZapatillas: string="INSERT or IGNORE INTO marca_zapatillas (id_marca, nombre_marca) VALUES (1,'adidas'),(2,'nike'),(3,'jordan'),(4,'fila'),(5,'kappa')";
  registroHistorialCategoriaZapatillas: string="INSERT or IGNORE INTO categoria_zapatillas (id_categoria, nombre_categoria) VALUES (1,'niño'),(2,'niña'),(3,'hombre'),(4,'mujer')";




  //variables para guardar los datos de las consultas en las tablas
  listadoZapatillas = new BehaviorSubject([]);
  listadoRoles = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  listadoInventario = new BehaviorSubject([]);
  listadoCategoriaZapatillas = new BehaviorSubject([]);
  listadoMarcaZapatillas = new BehaviorSubject([]);
  listadoInformacionUsuario = new BehaviorSubject([]);
  listadoMetodosPago = new BehaviorSubject([]);
  listadoHistorialPedidos = new BehaviorSubject([]);

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



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      await this.database.executeSql(this.tablaRoles, []);
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaInventario, []);
      await this.database.executeSql(this.tablaCategoriaZapatillas, []);
      await this.database.executeSql(this.tablaMarcaZapatillas, []);
      await this.database.executeSql(this.tablaInformacionUsuario, []);
      await this.database.executeSql(this.tablaMetodosPago, []);
      await this.database.executeSql(this.tablaHistorialPedidos, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroZapatillas, []);
      await this.database.executeSql(this.registroUsuarios, []);

      this.seleccionarZapatillas();

      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  /////////////////////////////////Zapatillas////////////////////////////////////////////////
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
            nombre: res.rows.item(i).nombre,
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

  eliminarZapatillas(id:string){
    return this.database.executeSql('DELETE FROM zapatillas WHERE id_zapatilla = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Zapatilla Eliminada");
      this.seleccionarZapatillas();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarZapatillas(id:number, descripcion:string, imagen_url: string, precio: number, id_marca: number, id_categoria: number){  
    return this.database.executeSql('UPDATE zapatillas SET descripcion = ?, imagen_url = ?, precio = ?, id_marca = ?, id_categoria = ? WHERE id_zapatilla = ?',[descripcion, imagen_url, precio, id_marca, id_categoria, id]).then(res=>{
      this.presentAlert("Modificar", "Zapatilla Modificada");
      this.seleccionarZapatillas();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  insertarZapatillas(nombre:string, descripcion:string, imagen_url: string, precio: number, id_marca: number, id_categoria: number){
    return this.database.executeSql('INSERT INTO zapatillas(nombre,descripcion, imagen_url, precio, id_marca, id_categoria) VALUES (?,?,?,?,?,?)',[nombre,descripcion, imagen_url, precio, id_marca, id_categoria]).then(res=>{
      this.presentAlert("Insertar","Zapatilla Registrada");
      this.seleccionarZapatillas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

 ////////////////////////////////////////////////Usuarios////////////////////////////////////////////////////////////////////



 seleccionarUsuarios(){
  return this.database.executeSql('SELECT * FROM usuarios', []).then(res=>{
     //variable para almacenar el resultado de la consulta
     let items: Usuarios[] = [];
     //valido si trae al menos un registro
     if(res.rows.length > 0){
      //recorro mi resultado
      for(var i=0; i < res.rows.length; i++){
        //agrego los registros a mi lista
        items.push({
          id_usuario: res.rows.item(i).id_usuario,
          nombre: res.rows.item(i).nombre,
          apellido: res.rows.item(i).apellido,
          id_rol: res.rows.item(i).id_rol
        })
      }
      
     }
     //actualizar el observable
     this.listadoUsuarios.next(items as any);

  })
}


insertarUsuarios(nombre: string, apellido: string, id_rol: number) {
  return this.database.executeSql('INSERT INTO usuarios(nombre, apellido, id_rol) VALUES (?, ?, ?)', [nombre, apellido, id_rol]).then(res => {
    this.presentAlert("Insertar", "Usuario Registrado");
    this.seleccionarUsuarios();
  }).catch(e => {
    this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
  });
}
  //  registroUsuarios: string="INSERT OR IGNORE INTO usuarios (id_usuario, nombre, apellido, id_rol) VALUES (1, 'Admin', 'Adminn', 1), (2, 'Usuario', 'Usuarioo', 2);";

  insertarInformacionUsuarios(correo: string, telefono: string, contrasena: string) {
    return this.database.executeSql('INSERT INTO informacion_usuario(correo, telefono, contrasena, id_usuario) VALUES (?, ?, ?, (SELECT MAX(id_usuario) FROM usuarios))', [correo, telefono, contrasena]).then(res => {
      this.presentAlert("Registro", "Usuario registrado con éxito");
    }).catch(e => {
      this.presentAlert('Error', 'Error en el registro: ' + JSON.stringify(e));
    });
  }

}
