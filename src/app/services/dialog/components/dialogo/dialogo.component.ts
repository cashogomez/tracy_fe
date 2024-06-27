import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { InsidenciasComponent } from '../insidencias/insidencias.component';

//import { IncidenciaRequest } from '@app/models/backend/incidencia';



export interface incidencias {
  valor:string;
  comentario:string;
}

@Component({
  selector: 'app-dialogo',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule ,
    ReactiveFormsModule,
    InsidenciasComponent
  ],
  templateUrl: './dialogo.component.html',
  styleUrl: './dialogo.component.scss'
})
export class DialogoComponent {
 
  Insidencia: string = '';
  Texto: string = '';

  valor='';
  comentario='';

  constructor(){}
/* subir (): IncidenciaRequest{
  this.valor = this.incidencias.get('valor')?.value!
  this.comentario = this.incidencias.get('comentario')?.value!

  console.log(this.valor);
  console.log(this.comentario);
  let incidencia: IncidenciaRequest = {
    opcion: this.valor,
    nota: this.comentario,
  }
  return incidencia
} */





  durationInSeconds =1 ;




  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}

