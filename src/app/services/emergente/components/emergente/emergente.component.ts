import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-emergente',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './emergente.component.html',
  styleUrl: './emergente.component.scss'
})
export class EmergenteComponent {
  constructor(
    public dialogRef: MatDialogRef<EmergenteComponent>,
    @Inject(MAT_DIALOG_DATA) public dynamicComponents$: Observable<any>
  ) {}
}
