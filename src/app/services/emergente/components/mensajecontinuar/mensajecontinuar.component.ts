import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-mensajecontinuar',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './mensajecontinuar.component.html',
  styleUrl: './mensajecontinuar.component.scss'
})
export class MensajecontinuarComponent {

}
