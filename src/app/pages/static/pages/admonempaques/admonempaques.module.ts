import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmonempaquesRoutingModule } from './admonempaques-routing.module';
import { AdmonempaquesComponent } from './admonempaques.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AdmonempaquesComponent
  ],
  imports: [
    CommonModule,
    AdmonempaquesRoutingModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatTableModule,
    FormsModule ,
    ReactiveFormsModule,
  ]
})
export class AdmonempaquesModule { }
