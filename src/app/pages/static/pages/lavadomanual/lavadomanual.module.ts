import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LavadomanualRoutingModule } from './lavadomanual-routing.module';
import { LavadomanualComponent } from './lavadomanual.component';


@NgModule({
  declarations: [
    LavadomanualComponent
  ],
  imports: [
    CommonModule,
    LavadomanualRoutingModule
  ]
})
export class LavadomanualModule { }
