import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodigoQRRoutingModule } from './codigo-qr-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CodigoQRComponent } from './codigo-qr.component';
import { RecepcionalmacenComponent } from '../recepcionalmacen/recepcionalmacen.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CodigoQRRoutingModule,
  ]
})
export class CodigoQRModule { }
