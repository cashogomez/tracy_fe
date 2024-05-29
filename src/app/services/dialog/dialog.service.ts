import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '@app/pages/static/pages/dialogo/dialogo.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor( private matDialog: MatDialog) { }


  emergente1(){
    this.matDialog.open(DialogoComponent)
  }
}
