import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistribucionquirofanoRoutingModule } from './distribucionquirofano-routing.module';
import { DistribucionquirofanoComponent } from './distribucionquirofano.component';


@NgModule({
  declarations: [
    DistribucionquirofanoComponent
  ],
  imports: [
    CommonModule,
    DistribucionquirofanoRoutingModule
  ]
})
export class DistribucionquirofanoModule { }
