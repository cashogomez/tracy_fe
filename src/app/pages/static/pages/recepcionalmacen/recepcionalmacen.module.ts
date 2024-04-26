import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionalmacenRoutingModule } from './recepcionalmacen-routing.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RecepcionalmacenComponent } from './recepcionalmacen.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    FormsModule ,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
  ]
})
export class RecepcionalmacenModule { }
