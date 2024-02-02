import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionquirofanoRoutingModule } from './recepcionquirofano-routing.module';
import { RecepcionquirofanoComponent } from './recepcionquirofano.component';


@NgModule({
  declarations: [RecepcionquirofanoComponent],
  imports: [
    CommonModule,
    RecepcionquirofanoRoutingModule,
  ]
})
export class RecepcionquirofanoModule { }
