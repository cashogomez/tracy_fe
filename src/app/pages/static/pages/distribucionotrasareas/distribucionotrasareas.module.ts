import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistribucionotrasareasRoutingModule } from './distribucionotrasareas-routing.module';
import { DistribucionotrasareasComponent } from './distribucionotrasareas.component';
import { MatButtonModule } from '@angular/material/button';
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
import { DistribucionquirofanoRoutingModule } from '../distribucionquirofano/distribucionquirofano-routing.module';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { FormControl, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DistribucionotrasareasComponent
  ],
  imports: [
    CommonModule,
    DistribucionotrasareasRoutingModule,
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
    ReactiveFormsModule,
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
export class DistribucionotrasareasModule { }
