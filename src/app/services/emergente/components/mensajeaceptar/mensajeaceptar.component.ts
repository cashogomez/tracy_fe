import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mensajeaceptar',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './mensajeaceptar.component.html',
  styleUrl: './mensajeaceptar.component.scss'
})
export class MensajeaceptarComponent {

}
