import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-distrib1',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './distrib1.component.html',
  styleUrl: './distrib1.component.scss'
})
export class Distrib1Component {
 actualizarticket(){
  console.log ('Actualizando estatus del ticket')
 }
}
