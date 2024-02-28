import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QRbusquedaRoutingModule } from './qrbusqueda-routing.module';
import { QRbusquedaComponent } from './qrbusqueda.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    QRbusquedaComponent
  ],
  imports: [
    CommonModule,
    QRbusquedaRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
})
export class QRbusquedaModule { }
