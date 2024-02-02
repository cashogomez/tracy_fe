import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistribucionotrasareasRoutingModule } from './distribucionotrasareas-routing.module';
import { DistribucionotrasareasComponent } from './distribucionotrasareas.component';


@NgModule({
  declarations: [
    DistribucionotrasareasComponent
  ],
  imports: [
    CommonModule,
    DistribucionotrasareasRoutingModule
  ]
})
export class DistribucionotrasareasModule { }
