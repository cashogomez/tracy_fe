import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QRbusquedaRoutingModule } from './qrbusqueda-routing.module';
import { QRbusquedaComponent } from './qrbusqueda.component';


@NgModule({
  declarations: [
    QRbusquedaComponent
  ],
  imports: [
    CommonModule,
    QRbusquedaRoutingModule
  ]
})
export class QRbusquedaModule { }
