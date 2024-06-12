import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistribucionquirofanoRoutingModule } from './distribucionquirofano-routing.module';
import { DistribucionquirofanoComponent } from './distribucionquirofano.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';

import { DetalledistribucionquirofanoComponent } from '../detalledistribucionquirofano/detalledistribucionquirofano.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DistribucionquirofanoComponent
  ],
  imports: [
    CommonModule,
    DistribucionquirofanoRoutingModule,
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
    DetalledistribucionquirofanoComponent ,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideMomentDateAdapter(),
  ],
})
export class DistribucionquirofanoModule { }
