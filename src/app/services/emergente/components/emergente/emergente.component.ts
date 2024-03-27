import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DynamicDialogService } from '../../emergente.service';



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
    private dataService: DynamicDialogService,
    public dialogRef: MatDialogRef<EmergenteComponent>,
    @Inject(MAT_DIALOG_DATA) public dynamicComponents$: Observable<any>  ) {
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.dataService.sendData(result);
    });
  }
  
}
