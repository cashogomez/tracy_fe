import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-recibir',
  standalone: true,
  imports: [ MatDialogModule,
    MatIconModule],
  templateUrl: './recibir.component.html',
  styleUrl: './recibir.component.scss'
})
export class RecibirComponent {

}
