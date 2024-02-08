import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { EditionRoutingModule } from './edition-routing.module';
import { EditionComponent } from './edition.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { PopupsModule } from '@app/shared/popups/popups.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    EditionComponent
  ],
  imports: [
    CommonModule,
    EditionRoutingModule,
    MatDivider,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    PopupsModule,
    NgOptimizedImage,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule, 
    MatRadioModule,
  ]
})
export class EditionModule { }
