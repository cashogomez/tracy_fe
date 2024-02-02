import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EsterilizacionRoutingModule } from './esterilizacion-routing.module';
import { EsterilizacionComponent } from './esterilizacion.component';


@NgModule({
  declarations: [
    EsterilizacionComponent
  ],
  imports: [
    CommonModule,
    EsterilizacionRoutingModule
  ]
})
export class EsterilizacionModule { }
