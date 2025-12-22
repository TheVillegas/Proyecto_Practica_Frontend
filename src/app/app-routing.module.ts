import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'generar-ali-basico',
    loadChildren: () => import('./pages/generar-ali-basico/generar-ali-basico.module').then(m => m.GenerarALiBasicoPageModule)
  },
  {
    path: 'busqueda-ali',
    loadChildren: () => import('./pages/busqueda-ali/busqueda-ali.module').then(m => m.BusquedaALIPageModule)
  },
  {
    path: 'reporte-tpa/:codigoALI',
    loadChildren: () => import('./pages/reporte-tpa/reporte-tpa.module').then(m => m.ReporteTPAPageModule)
  },
  {
    path: 'reporte-ram/:codigoALI',
    loadChildren: () => import('./pages/reporte-ram/reporte-ram.module').then(m => m.ReporteRamPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
