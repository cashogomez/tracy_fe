import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
