import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mensajecancelar',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './mensajecancelar.component.html',
  styleUrl: './mensajecancelar.component.scss'
})
export class MensajecancelarComponent {

}
