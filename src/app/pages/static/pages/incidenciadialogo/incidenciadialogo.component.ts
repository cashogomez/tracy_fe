import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Incidencia, IncidenciaRequest } from '@app/models/backend/incidencia';

@Component({
  selector: 'app-incidenciadialogo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,


  ],
  templateUrl: './incidenciadialogo.component.html',
  styleUrl: './incidenciadialogo.component.scss'
})
export class IncidenciadialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IncidenciadialogoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: IncidenciaRequest) {}

    ngOnInit() {
    }
  
    cancelar() {
      this.dialogRef.close();
    }


}
