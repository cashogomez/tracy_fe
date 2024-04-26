import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecepcionalmacenComponent } from '../recepcionalmacen/recepcionalmacen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-codigo-qr',
  standalone: true,
  imports: [
    CommonModule,
    ZXingScannerModule,
    FormsModule,
    RecepcionalmacenComponent,
  ],
  templateUrl: './codigo-qr.component.html',
  styleUrl: './codigo-qr.component.scss'
})
export class CodigoQRComponent {
  public scannerEnabled: boolean = true;
  public information: string = "No se  detectado información de ningún código. Acerque un código QR para escanear.";
  codigoQRleido: string ='';
  editar = false;

  constructor() {}

  ngOnInit() {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";

    /*const appointment = new Appointment($event);
    this.logService.logAppointment(appointment).subscribe(
      (result: OperationResponse) => {
        this.information = $event;
        this.transports = result.object;
        this.cd.markForCheck();
      },
      (error: any) => {
        this.information = "Ha ocurrido un error por favor intentalo nuevamente ... ";
        this.cd.markForCheck();
      }); */
    this.information = $event;
    this.codigoQRleido =$event
    this.editar = true;
    console.log(this.codigoQRleido)
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se  detectado información de ningún código. Acerque un código QR para escanear.";
    this.editar = false;
  }

}
