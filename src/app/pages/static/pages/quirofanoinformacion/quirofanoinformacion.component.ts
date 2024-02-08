import { Component, Inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import 'moment/locale/ja';
import 'moment/locale/fr';
import 'moment/locale/es';


import { DynamicDialogService } from '@app/services/emergente/emergente.service';
import { MatDivider } from '@angular/material/divider';
import { DataSource } from '@angular/cdk/collections';
import { Observable, from, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-quirofanoinformacion',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideMomentDateAdapter(),
  ],
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDivider,
    MatIcon,
    MatTooltipModule,
  ],
  templateUrl: './quirofanoinformacion.component.html',
  styleUrl: './quirofanoinformacion.component.scss'
})
export class QuirofanoinformacionComponent {

  private lazyLoadBeta$ = from(
    import('@app/services/emergente/components/mensajecontinuar/mensajecontinuar.component').then(
      (component) => component.MensajecontinuarComponent
    )
  );

  onBetaClicked() {
    this.dynamicDialogService.showDialog(this.lazyLoadBeta$);
  }

  constructor(private dynamicDialogService: DynamicDialogService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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

  // ************************ PAGINATOR *******************
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //dataSource: MatTableDataSource<Element>;
  dataSource: MatTableDataSource<Element>;
// **********************************************************

  displayedColumns = ['ticket', 'fecha', 'paciente', 'edad', 'diagnostico', 'cirugia', 'sala', 'turno', 'estatus', 'accion', 'id' ];

  editarFila(element: Element) {
    console.log(element);
  }
  eliminarFila(element: Element) {
    console.log(element);
  }
}

export interface Element {
  fecha: string;
  ticket: number;
  paciente: string;
  edad: string;

  diagnostico: number;
  cirugia: string;
  sala: string;
  turno: string;

  estatus: string;
  accion: string;
  id: string;
}
/** Constants used to fill up our data base. */
const ELEMENT_DATA: Element[] = [
  { ticket: 1, fecha: 'Hydrogen', paciente: 'falla', edad: 'H', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '1'  },
  { ticket: 2, fecha: 'Helium', paciente: 'falla', edad: 'He', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '2' },
  { ticket: 3, fecha: 'Lithium', paciente: 'falla', edad: 'Li', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '3'  },
  { ticket: 4, fecha: 'Beryllium', paciente: '9.0122', edad: 'Be', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '4'  },
  { ticket: 5, fecha: 'Boron', paciente: '10.811', edad: 'B', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '5' },
  { ticket: 6, fecha: 'Carbon', paciente: '12.0107', edad: 'C', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '6' },
  { ticket: 7, fecha: 'Nitrogen', paciente: '14.0067', edad: 'N', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '7' },
  { ticket: 8, fecha: 'Oxygen', paciente: '15.9994', edad: 'O', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '8' },
  { ticket: 9, fecha: 'Fluorine', paciente: '18.9984', edad: 'F', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '9' },
  { ticket: 10, fecha: 'Neon', paciente: '20.1797', edad: 'Ne', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '10'  },
  { ticket: 11, fecha: 'Sodium', paciente: '22.9897', edad: 'Na', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '11'  },
  { ticket: 12, fecha: 'Magnesium', paciente: '24.305', edad: 'Mg', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '12'  },
  { ticket: 13, fecha: 'Aluminum', paciente: '26.9815', edad: 'Al', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '13'  },
  { ticket: 14, fecha: 'Silicon', paciente: '28.0855', edad: 'Si', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '14'  },
  { ticket: 15, fecha: 'Phosphorus', paciente:' 30.9738', edad: 'P', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '15'  },
  { ticket: 16, fecha: 'Sulfur', paciente: '32.065', edad: 'S', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '16' },
  { ticket: 17, fecha: 'Chlorine', paciente: '35.453', edad: 'Cl', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '17' },
  { ticket: 18, fecha: 'Argon', paciente: '39.948', edad: 'Ar', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '18' },
  { ticket: 19, fecha: 'Potassium', paciente: '39.0983', edad: 'K', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '19' },
  { ticket: 20, fecha: 'Calcium', paciente: '40.078', edad: 'Ca', diagnostico: 1, cirugia: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '20' },
];
