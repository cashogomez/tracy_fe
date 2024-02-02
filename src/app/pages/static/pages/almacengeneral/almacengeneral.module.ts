import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacengeneralRoutingModule } from './almacengeneral-routing.module';
import { AlmacengeneralComponent } from './almacengeneral.component';


@NgModule({
  declarations: [
    AlmacengeneralComponent
  ],
  imports: [
    CommonModule,
    AlmacengeneralRoutingModule
  ]
})
export class AlmacengeneralModule { }
