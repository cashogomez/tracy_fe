import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: '404',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'recepcionquirofano',
    loadComponent: () => import('./pages/recepcionquirofano/recepcionquirofano.component').then((m) => m.RecepcionquirofanoComponent),
  },
  {
    path: 'recepcionotrasareas',
    loadChildren: () => import('./pages/recepcionotrasareas/recepcionotrasareas.module').then(m => m.RecepcionotrasareasModule)
  },
  {
    path: 'recepcionproveedorexterno',
    loadChildren: () => import('./pages/recepcionproveedorexterno/recepcionproveedorexterno.module').then(m => m.RecepcionproveedorexternoModule)
  },
  {
    path: 'lavadomanual',
    loadChildren: () => import('./pages/lavadomanual/lavadomanual.module').then(m => m.LavadomanualModule)
  },
  {
    path: 'lavadomaquina',
    loadChildren: () => import('./pages/lavadomaquina/lavadomaquina.module').then(m => m.LavadomaquinaModule)
  },
  {
    path: 'empaquequirofano',
    loadChildren: () => import('./pages/empaquequirofano/empaquequirofano.module').then(m => m.EmpaquequirofanoModule)
  },
  {
    path: 'empaqueotrasareas',
    loadChildren: () => import('./pages/empaqueotrasareas/empaqueotrasareas.module').then(m => m.EmpaqueotrasareasModule)
  },
  {
    path: 'esterilizacion',
    loadChildren: () => import('./pages/esterilizacion/esterilizacion.module').then(m => m.EsterilizacionModule)
  },
  {
    path: 'almacengeneral',
    loadChildren: () => import('./pages/almacengeneral/almacengeneral.module').then(m => m.AlmacengeneralModule)
  },
  {
    path: 'distribucionquirofano',
    loadChildren: () => import('./pages/distribucionquirofano/distribucionquirofano.module').then(m => m.DistribucionquirofanoModule)
  },
  {
    path: 'distribucionotrasareas',
    loadChildren: () => import('./pages/distribucionotrasareas/distribucionotrasareas.module').then(m => m.DistribucionotrasareasModule)
  },
  {
    path: 'qrbusqueda',
    loadChildren: () => import('./pages/qrbusqueda/qrbusqueda.module').then(m => m.QRbusquedaModule)
  },
  {
    path: 'quirofanoinformacion',
    loadComponent: () => import('./pages/quirofanoinformacion/quirofanoinformacion.component').then(m => m.QuirofanoinformacionComponent)
  },
  {
    path: 'quirofanocreacion',
    loadComponent: () => import('./pages/quirofanocreacion/quirofanocreacion.component').then(m => m.QuirofanocreacionComponent)
  },
  {
    path: 'programacioncirugia',
    loadComponent: () => import('./pages/programacioncirugia/programacioncirugia.component').then((m) => m.ProgramacioncirugiaComponent),
  },
  {
    path: 'editarprogramacioncirugia',
    loadComponent: () => import('./pages/editarprogramacioncirugia/editarprogramacioncirugia.component').then((m) => m.EditarprogramacioncirugiaComponent),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'admininstrumental',
    loadChildren: () => import('./pages/instrumental/instrumental.module').then((m) => m.InstrumentalModule),
  },
  {
    path: 'lectorqr',
    loadChildren: () => import('./pages/codigo-qr/codigo-qr.module').then((m) => m.CodigoQRModule),
  },
  {
    path: 'admonempaques',
    loadChildren: () => import('./pages/admonempaques/admonempaques.module').then((m) => m.AdmonempaquesModule),
  },
  {
    path: 'crearequipos',
    loadChildren: () => import('./pages/crear-equipos/crear-equipos.module').then((m) => m.CrearEquiposModule),
  },
  {
    path: 'detalledistribucionquirofano',
    loadComponent: () => import('./pages/detalledistribucionquirofano/detalledistribucionquirofano.component').then((m) => m.DetalledistribucionquirofanoComponent),
  },
  {
    path: 'detalledistribucionotras',
    loadComponent: () => import('./pages/detalledistribucionotras/detalledistribucionotras.component').then((m) => m.DetalledistribucionotrasComponent),
  },

  {
    path: 'recibirrecepcionquirofano',
    loadComponent: () => import('./pages/recibirrecepcionquirofano/recibirrecepcionquirofano.component').then((m) => m.RecibirrecepcionquirofanoComponent),
  },
  {
    path: 'recibirrecepcionotras',
    loadComponent: () => import('./pages/recibirrecepcionotras/recibirrecepcionotras.component').then((m) => m.RecibirrecepcionotrasComponent),
  },
  {
    path: 'recibirrecepcionotras2',
    loadComponent: () => import('./pages/recibirrecepcionotras2/recibirrecepcionotras2.component').then((m) => m.Recibirrecepcionotras2Component),
  },
  {
    path: 'recibirrecepcionprov',
    loadComponent: () => import('./pages/recibirrecepcionprov/recibirrecepcionprov.component').then((m) => m.RecibirrecepcionprovComponent),
  },
  {
    path: 'detallelavado',
    loadComponent: () => import('./pages/detallelavado/detallelavado.component').then((m) => m.DetallelavadoComponent),
  },
  {
    path: 'historico-qr',
    loadComponent: () => import('./pages/historicoqr/historicoqr.component').then((m) => m.HistoricoqrComponent),
  },
  {
    path: 'crear-lavadoras',
    loadComponent: () => import('./pages/crear-lavadoras/crear-lavadoras.component').then((m) => m.CrearLavadorasComponent),
  },
  {
    path: 'reporte-incidencia',
    loadComponent: () => import('./pages/reporteincidencia/reporteincidencia.component').then((m) => m.ReporteincidenciaComponent),
  },
  {
    path: 'construccion',
    loadComponent: () => import('./pages/enconstruccion/enconstruccion.component').then((m) => m.EnconstruccionComponent),
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
