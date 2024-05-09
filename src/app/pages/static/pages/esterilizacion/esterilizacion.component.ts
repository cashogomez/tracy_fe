import { Component, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { NotificationService } from '@app/services/notification/notification.service';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import 'moment/locale/ja';
import 'moment/locale/fr';
import 'moment/locale/es';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-esterilizacion',
  standalone: false,
  templateUrl: './esterilizacion.component.html',
  styleUrl: './esterilizacion.component.scss'
})
export class EsterilizacionComponent {
  constructor(private notification: NotificationService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) { // Assign the data to the data source for the table to render

  }


  ngOnInit() {
    this.updateCloseButtonLabel('Cerrar Calendario');
  }

  french() {
    this._locale = 'es-ES';
    this._adapter.setLocale(this._locale);
    this.updateCloseButtonLabel('Cerrar el calendario');
  }

  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }

  getDateFormatString(): string {
    if (this._locale === 'es-ES') {
      return 'DD/MM/AAAA';
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  }
  Tiempo= 10;
  value1 = '';
  value2 = '';
  value3 = '';
 
  disabledInput: boolean = true;
  disabledInput2: boolean = false;

  disabledInput3: boolean = true;
  disabledInput4: boolean = false;

  disabledInput5: boolean = true;
  disabledInput6: boolean = false;

  Esterilizador = new FormGroup({
    estatus1: new FormControl(''),
    estatus2: new FormControl(''),
    estatus3: new FormControl(''),
    PruebaBrDk1: new FormControl(''),
    PruebaBrDk2: new FormControl(''),
    PruebaBrDk3: new FormControl(''),
  });
  
  submitted() {
    
    window.alert(JSON.stringify(this.Esterilizador.value, null, 2));
  }
}
