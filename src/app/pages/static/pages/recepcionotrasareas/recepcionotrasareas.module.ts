import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionotrasareasRoutingModule } from './recepcionotrasareas-routing.module';
import { RecepcionotrasareasComponent } from './recepcionotrasareas.component';


@NgModule({
  declarations: [RecepcionotrasareasComponent ],
  imports: [
    CommonModule,
    RecepcionotrasareasRoutingModule
  ]
})
export class RecepcionotrasareasModule { }
