import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergenteComponent } from './components/emergente/emergente.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    EmergenteComponent
  ],
  imports: [
    CommonModule,
    EmergenteModule,
    FormsModule,
    CommonModule,
    MatDialogModule, 
    MatButtonModule,
    MatDialogModule
  ]
})
export class EmergenteModule { 

}
