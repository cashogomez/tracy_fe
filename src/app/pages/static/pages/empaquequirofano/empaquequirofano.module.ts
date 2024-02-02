import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpaquequirofanoRoutingModule } from './empaquequirofano-routing.module';
import { EmpaquequirofanoComponent } from './empaquequirofano.component';


@NgModule({
  declarations: [
    EmpaquequirofanoComponent
  ],
  imports: [
    CommonModule,
    EmpaquequirofanoRoutingModule
  ]
})
export class EmpaquequirofanoModule { }
