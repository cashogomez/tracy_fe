import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogo',
  standalone: true,
  imports: [
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './dialogo.component.html',
  styleUrl: './dialogo.component.scss'
})
export class DialogoComponent {
 
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