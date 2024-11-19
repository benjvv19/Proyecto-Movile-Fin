import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Zapatillas } from './zapatillas';
import { Usuarios } from './usuarios';
import { Roles } from './roles';
import { Categoriazapatillas } from './categoriazapatillas';
import { Venta } from './venta';
import { DetalleVentas } from './detalleventas';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  public database!: SQLiteObject;

  
  //
  tablaZapatillas: string = "CREATE TABLE IF NOT EXISTS zapatillas (id_zapatilla INTEGER PRIMARY KEY autoincrement, nombre TEXT NOT NULL, descripcion TEXT NOT NULL, imagen_url TEXT NOT NULL, precio INTEGER NOT NULL, nombre_marca TEXT NOT NULL, nombre_categoria INTEGER NOT NULL,stock INTEGER NOT NULL);";
  tablaRoles: string = "CREATE TABLE IF NOT EXISTS roles (id_rol INTEGER PRIMARY KEY autoincrement,nombre_rol TEXT NOT NULL);";
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, apellido TEXT NOT NULL, id_rol INTEGER NOT NULL, correo TEXT NOT NULL, telefono TEXT NOT NULL, contrasena TEXT NOT NULL,imagen TEXT NOT NULL , pregunta TEXT NOT NULL , respuesta TEXT NOT NULL, FOREIGN KEY (id_rol) REFERENCES roles(id_rol));";

  
  tablaCategoriaZapatillas: string = "CREATE TABLE IF NOT EXISTS categoria_zapatillas (id_categoria INTEGER PRIMARY KEY autoincrement,nombre_categoria TEXT NOT NULL);";
  tablaMarcaZapatillas: string = "CREATE TABLE IF NOT EXISTS marca_zapatillas (id_marca INTEGER PRIMARY KEY autoincrement,nombre_marca TEXT NOT NULL);";

  tablaVentas:string=`CREATE TABLE IF NOT EXISTS ventas (
  id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario));
  `; 

  tablaDetallesVenta:string=`CREATE TABLE IF NOT EXISTS detalle_ventas (
  id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
  id_venta INTEGER NOT NULL,
  id_zapatilla INTEGER NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  cantidad INTEGER NOT NULL,
  imagen_url TEXT NOT NULL,
  FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
  FOREIGN KEY (id_zapatilla) REFERENCES zapatillas(id_zapatilla));
  `; 


  //


  //varibles de insert por defecto de nuestras tablas
registroZapatillas: string = `
  INSERT or IGNORE INTO zapatillas 
  (id_zapatilla, nombre, descripcion, imagen_url, precio, nombre_marca, nombre_categoria, stock) 
  VALUES 
  (1, 'ZAPATILLAS ADIDAS BREAKNET JUNIOR HOMBRE', '¡Domina la cancha con estilo con las zapatillas adidas Breaknet Junior para niños!', 'https://i.postimg.cc/hjPVd5nd/adidas-breaknet-nino.webp', 41999, 'Adidas', 'Niño', 29),
  (2, 'ZAPATILLAS ADIDAS HOOPS 3.0', '¡Prepárate para marcar la diferencia en el juego con las zapatillas adidas Hoops 3.0 para niños!', 'https://i.postimg.cc/m2FCC9v8/adidas-hoops-nino.webp', 54999, 'Adidas', 'Niño', 30),
  (3, 'ZAPATILLAS ADIDAS HOOPS 2.0', '¡Prepárate para marcar la diferencia en el juego con las zapatillas adidas Hoops 2.0 para niños!', 'https://i.postimg.cc/m2FCC9v8/adidas-hoops-nino2.webp', 66999, 'Adidas', 'Niño', 20),
  (4, 'ZAPATILLAS ADIDAS HOOPS 3.0 BLANCA', '¡Prepárate para brillar en la cancha con las zapatillas adidas Hoops 3.0 blancas para niños!', 'https://i.postimg.cc/13h6HtPP/adidas-hoops-nino3.webp', 32999, 'Adidas', 'Niño', 65),
  
  (5, 'ZAPATILLAS PUMA KARMEN REBELLE', '¡Haz que tus pequeños destaquen con actitud con las zapatillas Puma Karmen Rebelle!', 'https://i.postimg.cc/JhKkM5X4/puma-karmen-nino.webp', 31999, 'Puma', 'Niño', 71),
  (6, 'ZAPATILLAS PUMA PAW PATROL INFANTIL AZUL', '¡Prepárate para la aventura con las zapatillas Puma Paw Patrol infantiles en azul!', 'https://i.postimg.cc/k4pRtMw0/puma-paw-nino.webp', 70999, 'Puma', 'Niño', 41),
  (7, 'ZAPATILLAS PUMA REBOUND V6 MID', '¡Eleva su estilo y juego con las zapatillas Puma Rebound V6 Mid para niños!', 'https://i.postimg.cc/zD4psq52/puma-rebound-nino.webp', 50999, 'Puma', 'Niño', 22),
  (8, 'ZAPATILLAS PUMA REBOUND V6', '¡Prepárate para elevar su estilo y juego con las zapatillas Puma Rebound V6 para niños!', 'https://i.postimg.cc/sfMwHMFZ/puma-reboud-nino.webp', 44999, 'Puma', 'Niño', 12),

  (9, 'ZAPATILLA ADIDAS RACER TR21 HOMBRE', '¡Domina tu carrera con las zapatillas Adidas Racer TR21 para hombre!', 'https://i.postimg.cc/d0F2q0Sn/adidad-3.webp', 60999, 'Adidas', 'Hombre', 43),
  (10, 'ZAPATILLAS ADIDAS HOOPS 3.0  BLANCO', '¡Eleva tu estilo urbano con las Zapatillas Adidas Hoops 3.0 para Hombre en Blanco!', 'https://i.postimg.cc/1XbFbRqG/ADIDAS-BLANCA.webp', 63999, 'Adidas', 'Hombre', 4),
  (11, 'ZAPATILLAS ADIDAS HOOPS 3.0 HOMBRE', '¡Eleva tu estilo urbano con las Zapatillas Adidas Hoops 3.0 para Hombre en Negras!', 'https://i.postimg.cc/KY5n4y6b/adidas-1.webp', 78999, 'Adidas', 'Hombre', 53),
  (12, 'ZAPATILLAS ADIDAS TERREX EASTRAIL HOMBRE', '¡Explora la naturaleza con confianza con las zapatillas Adidas Terrex!', 'https://i.postimg.cc/mDXCNyZ6/ADIDAS-TTR.webp', 45990, 'Adidas', 'Hombre', 13),

  (13, 'ZAPATILLAS VANS KNU MID HOMBRE', '¡Dale a tus pasos un toque de estilo con las Zapatillas Vans!', 'https://i.postimg.cc/VkWR0Mt2/vans-baja.webp', 69999, 'Vans', 'Hombre', 43),
  (14, 'ZAPATILLAS PUMA CALI CANVAS MUJER', '¡Deslumbra con estilo en cada paso con las zapatillas Puma Cali Canvas para mujeres!', 'https://i.postimg.cc/qvsKZTMK/puma-cali-rosada.webp', 61999, 'Puma', 'Mujer', 53),
  (15, 'ZAPATILLAS PUMA CAVEN 2.0 MUJER', '¡Haz que tus pasos sean una declaración de estilo con las zapatillas Puma Caven 2.0 para mujeres!', 'https://i.postimg.cc/1zyqkjfj/puma-caven-blanca.webp', 86999, 'Puma', 'Mujer', 83),
  (16, 'ZAPATILLAS KARMEN REBELLE MUJER', '¡Desata tu rebeldía con las zapatillas Karmen Rebelle para mujeres!', 'https://i.postimg.cc/855r5fdd/puma-karmen-rosada.webp', 47999, 'Puma', 'Mujer', 19),
  (17, 'ZAPATILLAS PUMA RBD MUJER', '¡Destaca con estilo con las zapatillas Puma RBD para mujeres!', 'https://i.postimg.cc/hhFJpCkM/PUMA-RBD.webp', 77999, 'Puma', 'Mujer', 69);
`;


  registroUsuario: string = "INSERT OR IGNORE INTO usuario (id_usuario, nombre, apellido, id_rol, correo, telefono, contrasena,imagen,pregunta,respuesta) VALUES (1, 'Admin', 'Admin', 1, 'admin@gmail.com', '966129682', 'admin','https://i.postimg.cc/1zyqkjfj/puma-caven-blanca.webp','¿Cuál es el color favorito?','Rojo'), (2, 'Usuario', 'Usuarioo', 2, 'usuario@gmail.com', '966129683', 'usuario','https://i.postimg.cc/zD4psq52/puma-rebound-nino.webp','¿Cuál es el color favorito?','Rojo')";
  registroRoles: string ="INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'admin'), (2, 'usuario');";
  registroMarcaZapatillas: string ="INSERT or IGNORE INTO marca_zapatillas (id_marca, nombre_marca) VALUES (1,'Adidas'),(2,'Nike'),(3,'Puma'),(4,'Vans')";
  registroCategoriaZapatillas: string ="INSERT or IGNORE INTO categoria_zapatillas (id_categoria, nombre_categoria) VALUES (1,'Niño'),(2,'Niña'),(3,'Hombre'),(4,'Mujer')";





  listadoZapatillas = new BehaviorSubject([]);
  listadoCarrito = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  BuscarZapatilla = new BehaviorSubject([]);
  listadoCategoriaZapatillas = new BehaviorSubject([]);
  listadoMarcaZapatillas = new BehaviorSubject([]);
  listadoVentas = new BehaviorSubject([]);
  listadoDetalleVentas = new BehaviorSubject([]);

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
  
  fetchVenta(): Observable<Venta[]> {
    return this.listadoVentas.asObservable();
  }

  fetchDetalleVenta(): Observable<DetalleVentas[]> {
    return this.listadoDetalleVentas.asObservable();
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
        name: 'KickSport.db',
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

      //Eliminar un base de datos mal creada
      //despues de borrarla se tiene que borrar estas lineas y ejecutar nuevamente
      //await this.eliminarBaseDatos('miBaseDeDatos.db');

      //await this.eliminarBaseDatos('KikSport.db');

      //Eliminar tablas para cambiar informacion de estas
      await this.database.executeSql('DROP TABLE IF EXISTS ventas', []);
      await this.database.executeSql('DROP TABLE IF EXISTS detalle_ventas', []);
      await this.database.executeSql('DROP TABLE IF EXISTS zapatillas', []);
      await this.database.executeSql('DROP TABLE IF EXISTS usuario', []);
      await this.database.executeSql('DROP TABLE IF EXISTS categoria_zapatillas', []);

      await this.database.executeSql(this.tablaRoles, []);
      
      await this.database.executeSql(this.tablaCategoriaZapatillas, []);

      await this.database.executeSql(this.tablaMarcaZapatillas, []);

      await this.database.executeSql(this.tablaUsuarios, []);

      await this.database.executeSql(this.tablaZapatillas, []);

      await this.database.executeSql(this.tablaVentas, []);

      await this.database.executeSql(this.tablaDetallesVenta, []);


      // Registros
      await this.database.executeSql(this.registroRoles, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroZapatillas, []);
      await this.database.executeSql(this.registroCategoriaZapatillas, []);
      await this.database.executeSql(this.registroMarcaZapatillas, []);
    
      this.seleccionarZapatillas();
      this.seleccionarUsuarios();
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }
  
  // Método para eliminar la base de datos
  private async eliminarBaseDatos(dbName: string) {
    try {
      await this.sqlite.deleteDatabase({ name: dbName, location: 'default' });
      console.log(`Base de datos ${dbName} eliminada con éxito`);
    } catch (e) {
      console.error(`Error al eliminar la base de datos ${dbName}:`, e);
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
      this.presentAlert("Eliminar","Zapatilla Eliminada");
      this.seleccionarZapatillas();
    }).catch(e=>{
      this.presentAlert('Buscar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarZapatillas(id: number, descripcion: string, imagen_url: string, precio: number, nombre_marca: string, nombre_categoria: string, stock: number) {
    return this.database.executeSql('SELECT nombre_marca FROM marca_zapatillas WHERE nombre_marca = ?', [nombre_marca]).then(res => {
        if (res.rows.length > 0) {
            const nombre_marca = res.rows.item(0).nombre_marca;

            return this.database.executeSql('SELECT nombre_categoria FROM categoria_zapatillas WHERE nombre_categoria = ?', [nombre_categoria]).then(res => {
                if (res.rows.length > 0) {
                    const nombre_categoria = res.rows.item(0).nombre_categoria;

                    return this.database.executeSql('UPDATE zapatillas SET descripcion = ?, imagen_url = ?, precio = ?, nombre_marca = ?, nombre_categoria = ? , stock = ? WHERE id_zapatilla = ?', 
                    [descripcion, imagen_url, precio, nombre_marca, nombre_categoria, stock, id]).then(() => {
                        this.presentAlert("Modificar", "Zapatilla Modificada");
                        this.seleccionarZapatillas();
                    });
                } else {
                    return this.database.executeSql('INSERT INTO categoria_zapatillas (nombre_categoria) VALUES (?)', [nombre_categoria]).then(() => {
                        return this.database.executeSql('SELECT nombre_categoria FROM categoria_zapatillas WHERE nombre_categoria = ?', [nombre_categoria]).then(res => {
                            const nombre_categoria_nueva = res.rows.item(0).nombre_categoria;

                            return this.database.executeSql('UPDATE zapatillas SET descripcion = ?, imagen_url = ?, precio = ?, nombre_marca = ?, nombre_categoria = ? , stock = ? WHERE id_zapatilla = ?', 
                            [descripcion, imagen_url, precio, nombre_marca, nombre_categoria_nueva, stock, id]).then(() => {
                                this.presentAlert("Modificar", "Zapatilla Modificada");
                                this.seleccionarZapatillas();
                            });
                        });
                    });
                }
            });
        } else {
            return this.database.executeSql('INSERT INTO marca_zapatillas (nombre_marca) VALUES (?)', [nombre_marca]).then(() => {
                return this.database.executeSql('SELECT nombre_marca FROM marca_zapatillas WHERE nombre_marca = ?', [nombre_marca]).then(res => {
                    const nombre_marca_nueva = res.rows.item(0).nombre_marca;

                    return this.database.executeSql('SELECT nombre_categoria FROM categoria_zapatillas WHERE nombre_categoria = ?', [nombre_categoria]).then(res => {
                        if (res.rows.length > 0) {
                            const nombre_categoria = res.rows.item(0).nombre_categoria;

                            return this.database.executeSql('UPDATE zapatillas SET descripcion = ?, imagen_url = ?, precio = ?, nombre_marca = ?, nombre_categoria = ? , stock = ? WHERE id_zapatilla = ?', 
                            [descripcion, imagen_url, precio, nombre_marca_nueva, nombre_categoria, stock, id]).then(() => {
                                this.presentAlert("Modificar", "Zapatilla Modificada");
                                this.seleccionarZapatillas();
                            });
                        } else {
                            return this.database.executeSql('INSERT INTO categoria_zapatillas (nombre_categoria) VALUES (?)', [nombre_categoria]).then(() => {
                                return this.database.executeSql('SELECT nombre_categoria FROM categoria_zapatillas WHERE nombre_categoria = ?', [nombre_categoria]).then(res => {
                                    const nombre_categoria_nueva = res.rows.item(0).nombre_categoria;

                                    return this.database.executeSql('UPDATE zapatillas SET descripcion = ?, imagen_url = ?, precio = ?, nombre_marca = ?, nombre_categoria = ? , stock = ? WHERE id_zapatilla = ?', 
                                    [descripcion, imagen_url, precio, nombre_marca_nueva, nombre_categoria_nueva, stock, id]).then(() => {
                                        this.presentAlert("Modificar", "Zapatilla Modificada");
                                        this.seleccionarZapatillas();
                                    });
                                });
                            });
                        }
                    });
                });
            });
        }
    }).catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
}



  insertarZapatillas(nombre: string, descripcion: string, imagen_url: string, precio: number, nombre_marca: string, nombre_categoria: string,stock:number) {
    this.database.executeSql('INSERT OR IGNORE INTO marca_zapatillas (nombre_marca) VALUES (?)', [nombre_marca])
      .then(() => {
        return this.database.executeSql('INSERT INTO categoria_zapatillas (nombre_categoria) VALUES (?)', [nombre_categoria]);
      })
      .then(() => {
        return this.database.executeSql('INSERT INTO zapatillas (nombre, descripcion, imagen_url, precio, nombre_marca, nombre_categoria,stock) VALUES (?, ?, ?, ?, ?, ?,?)', [nombre, descripcion, imagen_url, precio, nombre_marca, nombre_categoria,stock]);
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
        categoria_zapatillas c ON z.nombre_categoria = c.nombre_categoria 
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
  
  
  obtenerCategorias(): Observable<any[]> {
    return new Observable((observer) => {
      const query = 'SELECT * FROM categoria_zapatillas';
      this.database.executeSql(query, []).then((res) => {
        const categorias = [];
        for (let i = 0; i < res.rows.length; i++) {
          categorias.push(res.rows.item(i));
        }
        observer.next(categorias);
        observer.complete();
      });
    });
  }

  obtenerCategoriasPorid(id_categoria:number): Observable<any[]> {
    return new Observable((observer) => {
      const query = 'SELECT * FROM categoria_zapatillas WHERE id_categoria = ?';
      this.database.executeSql(query, [id_categoria]).then((res) => {
        const categorias = [];
        for (let i = 0; i < res.rows.length; i++) {
          categorias.push(res.rows.item(i));
        }
        observer.next(categorias);
        observer.complete();
      });
    });
  }

  obtenerZapatillasPorCategoria(nombre_categoria: string): Observable<any[]> {
    return new Observable((observer) => {
      const query = `SELECT * FROM zapatillas WHERE nombre_categoria = ?`;
      this.database.executeSql(query, [nombre_categoria]).then((res) => {
        const zapatillas = [];
        for (let i = 0; i < res.rows.length; i++) {
          zapatillas.push(res.rows.item(i));
        }
        observer.next(zapatillas);
        observer.complete();
      });
    });
  }


  eliminarCategoria(id: number, nombre_categoria: string): Promise<void> {
    return this.database
      .executeSql('DELETE FROM zapatillas WHERE nombre_categoria = ?', [nombre_categoria])
      .then(() => {
        return this.database.executeSql('DELETE FROM categoria_zapatillas WHERE id_categoria = ?', [id]);
      })
      .then(() => {
        this.presentAlert("Eliminar", "Categoría y zapatillas asociadas eliminadas con éxito");
        this.seleccionarZapatillas(); 
      })
      .catch((error) => {
        this.presentAlert("Error", "Ocurrió un error al eliminar la categoría: " + JSON.stringify(error));
      });
  }
  


  insertarCategoria(nombreCategoria: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.executeSql('INSERT OR IGNORE INTO categoria_zapatillas (nombre_categoria) VALUES (?)', [nombreCategoria])
        .then(() => {
          return this.database.executeSql('SELECT * FROM categoria_zapatillas WHERE nombre_categoria = ?', [nombreCategoria]);
        })
        .then((res) => {
          if (res.rows.length > 0) {
            this.presentAlert("Éxito", `La categoría "${nombreCategoria}" fue añadida exitosamente.`);
            resolve();
          } else {
            this.presentAlert("Error", `No se pudo registrar la categoría "${nombreCategoria}".`);
            reject('No se pudo registrar la categoría.');
          }
        })
        .catch(e => {
          this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
          reject(e);
        });
    });
  }
  
  

  actualizarCategoriaYZapatillas(id_categoria: number, nuevoNombreCategoria: string): Observable<any> {
    return new Observable((observer) => {
        this.database.executeSql('SELECT nombre_categoria FROM categoria_zapatillas WHERE id_categoria = ?', [id_categoria]).then(res => {
            if (res.rows.length > 0) {
                const nombreCategoriaAnterior = res.rows.item(0).nombre_categoria;

                this.database.executeSql('UPDATE categoria_zapatillas SET nombre_categoria = ? WHERE id_categoria = ?', [nuevoNombreCategoria, id_categoria]).then(() => {
                    this.database.executeSql('UPDATE zapatillas SET nombre_categoria = ? WHERE nombre_categoria = ?', [nuevoNombreCategoria, nombreCategoriaAnterior]).then(() => {
                        observer.next('Categoría y zapatillas actualizadas');
                        observer.complete();
                    }).catch(e => {
                        observer.error('Error al actualizar las zapatillas: ' + JSON.stringify(e));
                    });
                }).catch(e => {
                    observer.error('Error al actualizar la categoría: ' + JSON.stringify(e));
                });
            } else {
                observer.error('La categoría no existe.');
            }
        }).catch(e => {
            observer.error('Error al verificar la categoría: ' + JSON.stringify(e));
        });
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
            contrasena: res.rows.item(i).contrasena,
            imagen: res.rows.item(i).imagen,
            pregunta: res.rows.item(i).pregunta,
            respuesta: res.rows.item(i).respuesta

          });
        }
      }
      this.listadoUsuarios.next(items as any);
    });
  }



  insertarUsuarios(nombre: string, apellido: string, correo: string, telefono: string, id_rol: number, contrasena: string,imagen:string,pregunta:string,respuesta:string) {
    return this.database.executeSql('INSERT INTO usuario(nombre, apellido, correo, telefono, id_rol, contrasena,imagen,pregunta,respuesta) VALUES (?, ?, ?, ?, ?, ?,?,?,?)', [nombre, apellido, correo, telefono, id_rol, contrasena,imagen,pregunta,respuesta]).then(res => {
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }


  

  validarUsuario(correo: string, contrasena: string ): Promise<Usuarios | null> {
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
            contrasena: res.rows.item(0).contrasena,
            imagen: res.rows.item(0).imagen,
            pregunta: res.rows.item(0).pregunta,
            respuesta: res.rows.item(0).respuesta

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
            contrasena: res.rows.item(0).contrasena,
            imagen: res.rows.item(0).imagen,
            pregunta: res.rows.item(0).pregunta,
            respuesta: res.rows.item(0).respuesta
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



  modificarUsuario(id_usuario: number, correo: string, telefono: string,imagen:string) {  
    return this.database.executeSql(
      'UPDATE usuario SET correo = ?, telefono = ?, imagen = ? WHERE id_usuario = ?', 
      [correo, telefono,imagen,id_usuario]
    ).then(() => {
      this.presentAlert("Modificar", "Usuario Modificado");
      this.seleccionarUsuarios();
    });
  }


  actualizarContrasena(correo: string, nuevaContrasena: string): Promise<boolean> {
    return this.database.executeSql(
      'UPDATE usuario SET contrasena = ? WHERE correo = ?',
      [nuevaContrasena, correo]
    ).then(result => {
      return result.rowsAffected > 0; // Retorna true si se actualizó la contraseña
    });
}

  verificarCorreo(correo: string, id_usuario: number): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM usuario WHERE correo = ? AND id_usuario <> ?',
      [correo, id_usuario]
    ).then(result => {
      return result.rows.length > 0; // Retorna true si el correo ya existe
    });
  }

  verificarPregunta(correo: string, pregunta:string,id_usuario: number): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM usuario WHERE correo = ? AND pregunta = ? AND id_usuario <> ?',
      [correo, pregunta, id_usuario]
    ).then(result => {
      return result.rows.length > 0;
    });
  }
  
  verificarRespuesta(correo: string,respuesta:string ,id_usuario: number): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM usuario WHERE correo = ? AND respuesta = ? AND id_usuario <> ?',
      [correo, respuesta , id_usuario]
    ).then(result => {
      return result.rows.length > 0;
    });
  }


  verificarTelefono(telefono: string, id_usuario: number): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM usuario WHERE telefono = ? AND id_usuario <> ?',
      [telefono, id_usuario]
    ).then(result => {
      return result.rows.length > 0; // Retorna true si el teléfono ya existe
    });
  }
  

  guardarVenta(ventaData: any, productosCarrito: any[]) {
    const queryVenta = `INSERT INTO ventas (id_usuario, fecha, total) VALUES (?, ?, ?)`;
  
    // Primero insertar la venta
    return this.database.executeSql(queryVenta, [
      ventaData.id_usuario,
      ventaData.fecha,
      ventaData.total
    ]).then((ventaResult) => {
      const id_venta = ventaResult.insertId; // Obtener el ID de la venta insertada
  
      // Insertar los detalles de los productos
      const queries = [];
      for (const producto of productosCarrito) {
        const queryDetalle = `INSERT INTO detalle_ventas (id_venta, id_zapatilla, precio, cantidad, imagen_url) VALUES (?, ?, ?, ?, ?)`;
        const detalleQuery = this.database.executeSql(queryDetalle, [
          id_venta, // Usar el mismo id_venta para todos los productos
          producto.id_zapatilla,
          producto.precio,
          producto.cantidad,
          producto.imagen_url
        ]);
        queries.push(detalleQuery);
      }
  
      // Ejecutar todas las inserciones en detalle_ventas
      return Promise.all(queries).then(() => {
        // Actualizar el stock de las zapatillas
        return this.actualizarStock(productosCarrito);
      });
      
    }).catch((error) => {
      console.error('Error al guardar la venta:', error);
    });
  }


  actualizarStock(productosCarrito: any[]) {
    const queries = [];
  
    for (const producto of productosCarrito) {
      const queryActualizarStock = `
        UPDATE zapatillas 
        SET stock = stock - ? 
        WHERE id_zapatilla = ? AND stock >= ?`;
  
      const detalleQuery = this.database.executeSql(queryActualizarStock, [
        producto.cantidad,
        producto.id_zapatilla,
        producto.cantidad
      ]);
      queries.push(detalleQuery);
    }
  
    return Promise.all(queries);  
  }


  seleccionarTodasBoletasPorId(id_usuario: number): Promise<Venta[]> {
    return this.database.executeSql('SELECT * FROM ventas WHERE id_usuario=?', [id_usuario]).then(res => {
      const items: Venta[] = [];
  
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_venta: res.rows.item(i).id_venta,
            id_usuario: res.rows.item(i).id_usuario,
            fecha: res.rows.item(i).fecha,
            total: res.rows.item(i).total
          });
        }
      }
  
      // Emitir los datos y también devolverlos como una promesa
      this.listadoVentas.next(items as any);
      return items; // Devolver el arreglo de ventas como una promesa
    })
    .catch(error => {
      console.error('Error al seleccionar boletas:', error);
      return [];
    });
  }
  

  

  BuscarBoleta(id_venta: number) {
    return this.database.executeSql(`
      SELECT 
        dv.*, 
        z.nombre, 
        z.imagen_url, 
        m.nombre_marca, 
        c.nombre_categoria
      FROM 
        detalle_ventas dv
      JOIN 
        zapatillas z ON dv.id_zapatilla = z.id_zapatilla
      JOIN 
        marca_zapatillas m ON z.nombre_marca = m.nombre_marca 
      JOIN 
        categoria_zapatillas c ON z.nombre_categoria = c.nombre_categoria 
      WHERE 
        dv.id_venta = ?`, [id_venta]).then(res => {
      
      // Variable para almacenar el resultado de la consulta
      let items: DetalleVentas[] = [];
      
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista, incluyendo los nombres de marca y categoría
          items.push({
            id_detalle: res.rows.item(i).id_detalle,
            id_venta: res.rows.item(i).id_venta,
            id_zapatilla: res.rows.item(i).id_zapatilla,
            precio: res.rows.item(i).precio,
            cantidad: res.rows.item(i).cantidad,
            imagen_url: res.rows.item(i).imagen_url,
            nombre_zapatilla: res.rows.item(i).nombre, // Nombre de la zapatilla
            nombre_marca: res.rows.item(i).nombre_marca, // Nombre de la marca
            nombre_categoria: res.rows.item(i).nombre_categoria // Nombre de la categoría
          });
        }
      }
      // Actualizar el observable
      this.listadoDetalleVentas.next(items as any);
    }).catch(error => {
      console.error('Error al buscar la boleta:', error);
      // Manejar el error según sea necesario
    });
  }

  seleccionarTodasBoletas() {
    return this.database.executeSql('SELECT * FROM ventas', []).then(res => {
      const items: Venta[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_venta: res.rows.item(i).id_venta,
            id_usuario: res.rows.item(i).id_usuario,
            fecha: res.rows.item(i).fecha,
            total: res.rows.item(i).total
          });
        }
      }

      this.listadoVentas.next(items as any);
    })
    .catch(error => {
      console.error('Error al seleccionar boletas:', error);
    });
  }


  
}









