import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-esterilizador',
  standalone: true,
  imports: [  MatDialogModule,
    MatIconModule],
  templateUrl: './esterilizador.component.html',
  styleUrl: './esterilizador.component.scss'
})
export class EsterilizadorComponent {

}
