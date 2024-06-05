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

import { IncidenciaRequest } from '@app/models/backend/incidencia';


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
  ],
  templateUrl: './dialogo.component.html',
  styleUrl: './dialogo.component.scss'
})
export class DialogoComponent {
 
valor='';
comentario='';

subir (): IncidenciaRequest{
  this.valor = this.incidencias.get('valor')?.value!
  this.comentario = this.incidencias.get('comentario')?.value!

  console.log(this.valor);
  console.log(this.comentario);
  let incidencia: IncidenciaRequest = {
    opcion: this.valor,
    nota: this.comentario,
  }
  return incidencia
}


  incidencias= new FormGroup({
  valor: new FormControl(''),
  comentario: new FormControl('')
})


  durationInSeconds =1 ;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }


  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styles: `
  
   :host {
    display: flex;
      text-align: center;
      
    }

    .example-pizza-party {
    color: white;
    font-weight: 500;
    }
  `,
  standalone: true,
})
export class PizzaPartyComponent {}