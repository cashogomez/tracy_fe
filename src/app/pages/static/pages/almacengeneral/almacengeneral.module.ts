import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacengeneralRoutingModule } from './almacengeneral-routing.module';
import { AlmacengeneralComponent } from './almacengeneral.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [
    AlmacengeneralComponent
  ],
  imports: [
    CommonModule,
    AlmacengeneralRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDivider,
    MatIcon,
    MatTooltipModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,

    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    RouterModule,


  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideMomentDateAdapter(),
  ],
})
export class AlmacengeneralModule { }
