import { Component } from '@angular/core';
import { ImprimirService } from '../../imprimir.service';

@Component({
  selector: 'app-imprimir',
  standalone: true,
  imports: [],
  templateUrl: './imprimir.component.html',
  styleUrl: './imprimir.component.scss'
})
export class ImprimirComponent {
  constructor(private pdfService: ImprimirService) {
    
  }
  downloadPdf() {

  }
}


// ********************* DATOS Y VALORES ***************

