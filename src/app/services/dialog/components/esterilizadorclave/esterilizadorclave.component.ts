import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-esterilizadorclave',
  standalone: true,
  imports: [  MatDialogModule,
    MatIconModule],
  templateUrl: './esterilizadorclave.component.html',
  styleUrl: './esterilizadorclave.component.scss'
})
export class EsterilizadorclaveComponent {

}
