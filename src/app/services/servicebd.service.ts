import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Zapatillas } from './zapatillas';
import { Usuarios } from './usuarios';
import { Roles } from './roles';
import { Categoriazapatillas } from './categoriazapatillas';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creacion de tablas
  
  //
  tablaZapatillas: string = "CREATE TABLE IF NOT EXISTS zapatillas (id_zapatilla INTEGER PRIMARY KEY autoincrement, nombre TEXT NOT NULL, descripcion TEXT NOT NULL, imagen_url TEXT NOT NULL, precio INTEGER NOT NULL, nombre_marca TEXT NOT NULL, id_categoria INTEGER NOT NULL,stock INTEGER NOT NULL, FOREIGN KEY (id_categoria) REFERENCES categoria_zapatillas(id_categoria));";
  tablaRoles: string = "CREATE TABLE IF NOT EXISTS roles (id_rol INTEGER PRIMARY KEY autoincrement,nombre_rol TEXT NOT NULL);";
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, apellido TEXT NOT NULL, id_rol INTEGER NOT NULL, correo TEXT NOT NULL, telefono TEXT NOT NULL, contrasena TEXT NOT NULL, FOREIGN KEY (id_rol) REFERENCES roles(id_rol));`; registroUsuarios: string = `INSERT OR IGNORE INTO usuario (id_usuario, nombre, apellido, id_rol, correo, telefono, contrasena) VALUES (1, 'Admin', 'Adminn', 1, 'admin@gmail.com', '966129681', 'admin'), (2, 'Usuario', 'Usuarioo', 2, 'usuario@gmail.com', '966129681', 'usuario');";

  
  tablaCategoriaZapatillas: string = "CREATE TABLE IF NOT EXISTS categoria_zapatillas (id_categoria INTEGER PRIMARY KEY autoincrement,nombre_categoria TEXT NOT NULL);";
  tablaMarcaZapatillas: string = "CREATE TABLE IF NOT EXISTS marca_zapatillas (id_marca INTEGER PRIMARY KEY autoincrement,nombre_marca TEXT NOT NULL);";
  
  tablaHistorialPedidos: string = "CREATE TABLE IF NOT EXISTS historial_pedidos (id_historial INTEGER PRIMARY KEY autoincrement,id_pedido INTEGER NOT NULL,estado_anterior TEXT NOT NULL,estado_nuevo TEXT NOT NULL,fecha_cambio TEXT NOT NULL,FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido));";
  //


  //varibles de insert por defecto de nuestras tablas
  registroZapatillas: string = `
  INSERT or IGNORE INTO zapatillas 
  (id_zapatilla, nombre, descripcion, imagen_url, precio, nombre_marca, id_categoria, stock) 
  VALUES 
  (1, 'ZAPATILLAS ADIDAS BREAKNET JUNIOR HOMBRE', '¡Domina la cancha con estilo con las zapatillas adidas Breaknet Junior para niños!', 'https://i.postimg.cc/hjPVd5nd/adidas-breaknet-nino.webp', 41999, 'Adidas', 1, 50),
  (2, 'ZAPATILLAS ADIDAS HOOPS 3.0', '¡Prepárate para marcar la diferencia en el juego con las zapatillas adidas Hoops 3.0 para niños!', 'https://i.postimg.cc/m2FCC9v8/adidas-hoops-nino.webp', 54999, 'Adidas', 1, 30),
  (3, 'ZAPATILLAS ADIDAS HOOPS 2.0', '¡Prepárate para marcar la diferencia en el juego con las zapatillas adidas Hoops 2.0 para niños!', 'https://i.postimg.cc/m2FCC9v8/adidas-hoops-nino2.webp', 66999, 'Adidas', 1, 20),
  (4, 'ZAPATILLAS ADIDAS HOOPS 3.0 BLANCA', '¡Prepárate para brillar en la cancha con las zapatillas adidas Hoops 3.0 blancas para niños!', 'https://i.postimg.cc/13h6HtPP/adidas-hoops-nino3.webp', 32999, 'Adidas', 1, 65),

  (5, 'ZAPATILLAS PUMA KARMEN REBELLE', '¡Haz que tus pequeños destaquen con actitud con las zapatillas Puma Karmen Rebelle!', 'https://i.postimg.cc/JhKkM5X4/puma-karmen-nino.webp', 31999, 'Puma', 1, 71),
  (6, 'ZAPATILLAS PUMA PAW PATROL INFANTIL AZUL', '¡Prepárate para la aventura con las zapatillas Puma Paw Patrol infantiles en azul!', 'https://i.postimg.cc/k4pRtMw0/puma-paw-nino.webp', 70999, 'Puma', 1, 41),
  (7, 'ZAPATILLAS PUMA REBOUND V6 MID', '¡Eleva su estilo y juego con las zapatillas Puma Rebound V6 Mid para niños!', 'https://i.postimg.cc/zD4psq52/puma-rebound-nino.webp', 50999, 'Puma', 1, 22),
  (8, 'ZAPATILLAS PUMA REBOUND V6', '¡Prepárate para elevar su estilo y juego con las zapatillas Puma Rebound V6 para niños!', 'https://i.postimg.cc/sfMwHMFZ/puma-reboud-nino.webp', 44999, 'Puma', 1, 12),


  (9, 'ZAPATILLA ADIDAS RACER TR21 HOMBRE', '¡Domina tu carrera con las zapatillas Adidas Racer TR21 para hombre!', 'https://i.postimg.cc/d0F2q0Sn/adidad-3.webp', 60999, 'Adidas', 3, 43),
  (10, 'ZAPATILLAS ADIDAS HOOPS 3.0  BLANCO', '¡Eleva tu estilo urbano con las Zapatillas Adidas Hoops 3.0 para Hombre en Blanco!', 'https://i.postimg.cc/1XbFbRqG/ADIDAS-BLANCA.webp', 63999, 'Adidas', 3, 4),
  (11, 'ZAPATILLAS ADIDAS HOOPS 3.0 HOMBRE', '¡Eleva tu estilo urbano con las Zapatillas Adidas Hoops 3.0 para Hombre en Negras!', 'https://i.postimg.cc/KY5n4y6b/adidas-1.webp', 78999, 'Adidas', 3, 53),
  (12, 'ZAPATILLAS ADIDAS TERREX EASTRAIL HOMBRE', '¡Explora la naturaleza con confianza con las zapatillas Adidas Terrex!', 'https://i.postimg.cc/mDXCNyZ6/ADIDAS-TTR.webp', 45990, 'Adidas', 3, 13),
  
  (13, 'ZAPATILLAS VANS KNU MID HOMBRE', '¡Dale a tus pasos un toque de estilo con las Zapatillas Vans!', 'https://i.postimg.cc/VkWR0Mt2/vans-baja.webp', 69999, 'Vans', 3, 43),
  (14, 'ZAPATILLAS PUMA CALI CANVAS MUJER', '¡Deslumbra con estilo en cada paso con las zapatillas Puma Cali Canvas para mujeres!', 'https://i.postimg.cc/qvsKZTMK/puma-cali-rosada.webp', 61999, 'Puma', 4, 53),
  (15, 'ZAPATILLAS PUMA CAVEN 2.0 MUJER', '¡Haz que tus pasos sean una declaración de estilo con las zapatillas Puma Caven 2.0 para mujeres!', 'https://i.postimg.cc/1zyqkjfj/puma-caven-blanca.webp', 86999, 'Puma', 4, 83),
  (16, 'ZAPATILLAS KARMEN REBELLE MUJER', '¡Desata tu rebeldía con las zapatillas Karmen Rebelle para mujeres!', 'https://i.postimg.cc/855r5fdd/puma-karmen-rosada.webp', 47999, 'Puma', 4, 19),
  (17, 'ZAPATILLAS PUMA RBD MUJER', '¡Destaca con estilo con las zapatillas Puma RBD para mujeres!', 'https://i.postimg.cc/hhFJpCkM/PUMA-RBD.webp', 77999, 'Puma', 4, 69);
  `;  

  registroUsuario: string = "INSERT OR IGNORE INTO usuario (id_usuario, nombre, apellido, id_rol, correo, telefono, contrasena) VALUES (1, 'Admin', 'Admin', 1, 'admin@gmail.com', '966129681', 'admin'), (2, 'Usuario', 'Usuarioo', 2, 'usuario@gmail.com', '966129681', 'usuario')";
  registroRoles: string ="INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'admin'), (2, 'usuario');";
  registroInventario: string ="INSERT or IGNORE INTO inventario (id_inventario, id_zapatilla, cantidad_disponible, ultima_actualizacion) VALUES (1, 1, 50, '2023-10-01')";
  registroHistorialPedidos: string ="INSERT or IGNORE INTO historial_pedidos (id_historial, id_pedido, estado_anterior, estado_nuevo, fecha_cambio) VALUES (1, 1, 'Pendiente', 'Recibido', '2023-10-01')";
  registroMarcaZapatillas: string ="INSERT or IGNORE INTO marca_zapatillas (id_marca, nombre_marca) VALUES (1,'Adidas'),(2,'Nike'),(3,'Puma'),(4,'Vans')";
  registroCategoriaZapatillas: string ="INSERT or IGNORE INTO categoria_zapatillas (id_categoria, nombre_categoria) VALUES (1,'Niño'),(2,'Niña'),(3,'Hombre'),(4,'Mujer')";





  listadoZapatillas = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  listadoInventario = new BehaviorSubject([]);
  BuscarZapatilla = new BehaviorSubject([]);
  listadoCategoriaZapatillas = new BehaviorSubject([]);
  listadoMarcaZapatillas = new BehaviorSubject([]);
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

  fetchUsuarios(): Observable<Usuarios[]>{
    return this.listadoUsuarios.asObservable();
  }

  fetchRol(): Observable<Roles[]> {
    return this.listadoUsuarios.asObservable();
  }

  fetchZapatillas(): Observable<Zapatillas[]>{
    return this.listadoZapatillas.asObservable();
  }


  fetchZapatilla(): Observable<Zapatillas[]>{
    return this.BuscarZapatilla.asObservable();
  }

  fetchCategoria(): Observable<Categoriazapatillas[]> {
    return this.listadoCategoriaZapatillas.asObservable();
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
  
  async crearTablas() {
    try {



      await this.database.executeSql(this.tablaRoles, []);
      await this.database.executeSql(this.tablaCategoriaZapatillas, []);
      await this.database.executeSql(this.tablaMarcaZapatillas, []);
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaZapatillas, []);
      await this.database.executeSql(this.tablaHistorialPedidos, []);
      
      await this.database.executeSql(this.registroRoles, []);
      await this.database.executeSql(this.registroCategoriaZapatillas, []);
      await this.database.executeSql(this.registroMarcaZapatillas, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroZapatillas, []);
  
      this.seleccionarZapatillas();
      this.isDBReady.next(true);
    } catch(e) {
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
            id_categoria:res.rows.item(i).id_categoria,
            nombre_marca: res.rows.item(i).nombre_marca, 
            nombre_categoria: res.rows.item(i).nombre_categoria,
            stock: res.rows.item(i).stock 
          })
        }
        
       }
       //actualizar el observable
       this.listadoZapatillas.next(items as any);

    })
  }

  eliminarZapatillas(id:number){
    return this.database.executeSql('DELETE FROM zapatillas WHERE id_zapatilla = ?',[id]).then(res=>{
      this.presentAlert("Buscar","Zapatilla Encontrada");
      this.seleccionarZapatillas();
    }).catch(e=>{
      this.presentAlert('Buscar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarZapatillas(id: number, descripcion: string, imagen_url: string, precio: number, nombre_marca: string, id_categoria: number,stock:number) {  
    return this.database.executeSql('SELECT nombre_marca FROM marca_zapatillas WHERE nombre_marca = ?', [nombre_marca]).then(res => {
        if (res.rows.length > 0) {
            const nombre_marca = res.rows.item(0).nombre_marca;

            return this.database.executeSql('UPDATE zapatillas SET descripcion = ?, imagen_url = ?, precio = ?, nombre_marca = ?, id_categoria = ? , stock = ? WHERE id_zapatilla = ?', 
            [descripcion, imagen_url, precio, nombre_marca, id_categoria,stock, id]).then(() => {
                this.presentAlert("Modificar", "Zapatilla Modificada");
                this.seleccionarZapatillas();
            });
        } else {
            return this.database.executeSql('INSERT INTO marca_zapatillas (nombre_marca) VALUES (?)', [nombre_marca]).then(() => {
                return this.database.executeSql('SELECT nombre_marca FROM marca_zapatillas WHERE nombre_marca = ?', [nombre_marca]).then(res => {
                    const nombre_marca_nueva = res.rows.item(0).nombre_marca;
                    
                    return this.database.executeSql('UPDATE zapatillas SET descripcion = ?, imagen_url = ?, precio = ?, nombre_marca = ?, id_categoria = ? , stock = ? WHERE id_zapatilla = ?', 
                    [descripcion, imagen_url, precio,nombre_marca_nueva, id_categoria,stock, id]).then(() => {
                        this.presentAlert("Modificar", "Zapatilla Modificada");
                        this.seleccionarZapatillas();
                    });
                });
            });
        }
    }).catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
}

  insertarZapatillas(nombre: string, descripcion: string, imagen_url: string, precio: number, nombre_marca: string, id_categoria: number,stock:number) {
    this.database.executeSql('INSERT OR IGNORE INTO marca_zapatillas (nombre_marca) VALUES (?)', [nombre_marca])
      .then(() => {
        return this.database.executeSql('INSERT INTO zapatillas (nombre, descripcion, imagen_url, precio, nombre_marca, id_categoria,stock) VALUES (?, ?, ?, ?, ?, ?,?)', [nombre, descripcion, imagen_url, precio, nombre_marca, id_categoria,stock]);
      })
      .then(res => {
        this.presentAlert("Insertar", "Zapatilla Registrada");
        this.seleccionarZapatillas();
      })
      .catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      });
  }


  BuscarZapatillas(id: number) {
    return this.database.executeSql(`
      SELECT 
        z.*, 
        m.nombre_marca, 
        c.nombre_categoria
      FROM 
        zapatillas z
      JOIN 
        marca_zapatillas m ON z.nombre_marca = m.nombre_marca 
      JOIN 
        categoria_zapatillas c ON z.id_categoria = c.id_categoria 
      WHERE 
        z.id_zapatilla = ?`, [id]).then(res => {
        
      // Variable para almacenar el resultado de la consulta
      let items: Zapatillas[] = [];
      
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista, incluyendo los nombres de marca y categoría
          items.push({
            id_zapatilla: res.rows.item(i).id_zapatilla,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
            imagen_url: res.rows.item(i).imagen_url,
            precio: res.rows.item(i).precio,
            id_marca: res.rows.item(i).id_marca,
            id_categoria: res.rows.item(i).id_categoria,
            nombre_marca: res.rows.item(i).nombre_marca,
            nombre_categoria: res.rows.item(i).nombre_categoria,
            stock: res.rows.item(i).stock 
          });
        }
      }
      // Actualizar el observable
      this.BuscarZapatilla.next(items as any);
    });
  }
  



 ////////////////////////////////////////////////Usuarios////////////////////////////////////////////////////////////////////


 

  seleccionarUsuarios() {
    return this.database.executeSql('SELECT * FROM usuarios', []).then(res => {
      let items: Usuarios[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            correo: res.rows.item(i).correo,
            telefono: res.rows.item(i).telefono,
            id_rol: res.rows.item(i).id_rol,
            contrasena: res.rows.item(i).contrasena
          });
        }
      }
      this.listadoUsuarios.next(items as any);
    });
  }



  insertarUsuarios(nombre: string, apellido: string, correo: string, telefono: string, id_rol: number, contrasena: string) {
    return this.database.executeSql('INSERT INTO usuario(nombre, apellido, correo, telefono, id_rol, contrasena) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, correo, telefono, id_rol, contrasena]).then(res => {
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }


  

  validarUsuario(correo: string, contrasena: string): Promise<Usuarios | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND contrasena = ?', [correo, contrasena])
      .then(res => {
        if (res.rows.length > 0) {
          const usuario: Usuarios = {
            id_usuario: res.rows.item(0).id_usuario,
            nombre: res.rows.item(0).nombre,
            apellido: res.rows.item(0).apellido,
            correo: res.rows.item(0).correo,
            telefono: res.rows.item(0).telefono,
            id_rol: res.rows.item(0).id_rol,
            contrasena: res.rows.item(0).contrasena
          };
          return usuario; // Devolver el usuario encontrado
        }
        return null; // Usuario no encontrado
      })
      .catch(e => {
        console.error('Error al verificar usuario por correo y contraseña:', e);
        return null; // Manejar el error
      });
  }



  verificarUsuario(correo: string, telefono: string): Promise<boolean> {
    return this.database.executeSql('SELECT COUNT(*) as count FROM usuario WHERE correo = ? AND telefono = ?', [correo, telefono])
      .then(res => {
        if (res.rows.length > 0) {
          const count = res.rows.item(0).count;
          return count > 0; 
        }
        return false;
      })
      .catch(e => {
        console.error('Error al verificar usuario:', e);
        return false; 
      });
  }



  obtenerUsuarioPorId(id: number): Promise<Usuarios | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?', [id])
      .then(res => {
        if (res.rows.length > 0) {
          const usuario: Usuarios = {
            id_usuario: res.rows.item(0).id_usuario,
            nombre: res.rows.item(0).nombre,
            apellido: res.rows.item(0).apellido,
            correo: res.rows.item(0).correo,
            telefono: res.rows.item(0).telefono,
            id_rol: res.rows.item(0).id_rol,
            contrasena: res.rows.item(0).contrasena
          };
          return usuario;
        }
        return null;
      })
      .catch(e => {
        console.error('Error al obtener usuario por ID:', e);
        return null; 
      });
  }

}






