import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./pages/recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'pagar',
    loadChildren: () => import('./pages/pagar/pagar.module').then( m => m.PagarPageModule)
  },
  {
    path: 'notfound',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
  {
    path: 'masdetalles',
    loadChildren: () => import('./pages/masdetalles/masdetalles.module').then( m => m.MasdetallesPageModule)
  },
  {
    path: 'mascondiciones',
    loadChildren: () => import('./pages/mascondiciones/mascondiciones.module').then( m => m.MascondicionesPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'eliminar',
    loadChildren: () => import('./pages/eliminar/eliminar.module').then( m => m.EliminarPageModule)
  },
  {
    path: 'editarperfil',
    loadChildren: () => import('./pages/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'detalles/:id',
    loadChildren: () => import('./pages/detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {
    path: 'condiciones',
    loadChildren: () => import('./pages/condiciones/condiciones.module').then( m => m.CondicionesPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'cambiarcontra',
    loadChildren: () => import('./pages/cambiarcontra/cambiarcontra.module').then( m => m.CambiarcontraPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'adminproductos',
    loadChildren: () => import('./pages/adminproductos/adminproductos.module').then( m => m.AdminproductosPageModule)
  },
  {
    path: 'admineditar',
    loadChildren: () => import('./pages/admineditar/admineditar.module').then( m => m.AdmineditarPageModule)
  },
  {
    path: 'admindetalles/:id',
    loadChildren: () => import('./pages/admindetalles/admindetalles.module').then( m => m.AdmindetallesPageModule)
  },
  {
    path: 'boletas',
    loadChildren: () => import('./pages/boletas/boletas.module').then( m => m.BoletasPageModule)
  },
  {
    path: 'detalleboletas/:id_venta',
    loadChildren: () => import('./pages/detalleboletas/detalleboletas.module').then( m => m.DetalleboletasPageModule)
  },
  {
    path: '**',
    redirectTo: 'notfound'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
