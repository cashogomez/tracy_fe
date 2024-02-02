import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionproveedorexternoRoutingModule } from './recepcionproveedorexterno-routing.module';
import { RecepcionproveedorexternoComponent } from './recepcionproveedorexterno.component';


@NgModule({
  declarations: [
    RecepcionproveedorexternoComponent
  ],
  imports: [
    CommonModule,
    RecepcionproveedorexternoRoutingModule
  ]
})
export class RecepcionproveedorexternoModule { }
