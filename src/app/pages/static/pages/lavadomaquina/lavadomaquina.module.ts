import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LavadomaquinaRoutingModule } from './lavadomaquina-routing.module';
import { LavadomaquinaComponent } from './lavadomaquina.component';


@NgModule({
  declarations: [
    LavadomaquinaComponent
  ],
  imports: [
    CommonModule,
    LavadomaquinaRoutingModule
  ]
})
export class LavadomaquinaModule { }
