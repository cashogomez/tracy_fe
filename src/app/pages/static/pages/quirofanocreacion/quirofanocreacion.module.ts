import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuirofanocreacionRoutingModule } from './quirofanocreacion-routing.module';
import { QuirofanocreacionComponent } from './quirofanocreacion.component';


@NgModule({
  declarations: [
    QuirofanocreacionComponent
  ],
  imports: [
    CommonModule,
    QuirofanocreacionRoutingModule
  ]
})
export class QuirofanocreacionModule { }
