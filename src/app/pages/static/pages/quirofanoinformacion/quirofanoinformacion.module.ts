import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuirofanoinformacionRoutingModule } from './quirofanoinformacion-routing.module';
import { QuirofanoinformacionComponent } from './quirofanoinformacion.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuirofanoinformacionRoutingModule,
    QuirofanoinformacionComponent,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
  ]
})
export class QuirofanoinformacionModule { }
