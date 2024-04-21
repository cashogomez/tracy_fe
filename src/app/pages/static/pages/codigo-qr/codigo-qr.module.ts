import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodigoQRRoutingModule } from './codigo-qr-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule } from '@angular/forms';
import { CodigoQRComponent } from './codigo-qr.component';


@NgModule({
  declarations: [
    CodigoQRComponent
  ],
  imports: [
    CommonModule,
    CodigoQRRoutingModule,
    ZXingScannerModule,
    FormsModule,
  ]
})
export class CodigoQRModule { }
