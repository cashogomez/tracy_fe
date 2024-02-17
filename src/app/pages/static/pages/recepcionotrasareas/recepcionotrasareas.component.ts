import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/services/notification/notification.service';

@Component({
  selector: 'app-recepcionotrasareas',
  standalone: false,
  templateUrl: './recepcionotrasareas.component.html',
  styleUrl: './recepcionotrasareas.component.scss'
})
export class RecepcionotrasareasComponent {

  editarRegistro !: Element;
  borrarRegistro !: Element;
  /** Constants used to fill up our data base. */
 ELEMENT_DATA: Element[] = [
  { ticket: 1, fecha: 'Hydrogen', paciente: 'falla', edad: 'H', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '1'  },
  { ticket: 2, fecha: 'Helium', paciente: 'falla', edad: 'He', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '2' },
  { ticket: 3, fecha: 'Lithium', paciente: 'falla', edad: 'Li', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '3'  },
  { ticket: 4, fecha: 'Beryllium', paciente: '9.0122', edad: 'Be', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '4'  },
  { ticket: 5, fecha: 'Boron', paciente: '10.811', edad: 'B', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '5' },
  { ticket: 6, fecha: 'Carbon', paciente: '12.0107', edad: 'C', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '6' },
  { ticket: 7, fecha: 'Nitrogen', paciente: '14.0067', edad: 'N', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '7' },
  { ticket: 8, fecha: 'Oxygen', paciente: '15.9994', edad: 'O', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '8' },
  { ticket: 9, fecha: 'Fluorine', paciente: '18.9984', edad: 'F', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '9' },
  { ticket: 10, fecha: 'Neon', paciente: '20.1797', edad: 'Ne', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '10'  },
  { ticket: 11, fecha: 'Sodium', paciente: '22.9897', edad: 'Na', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '11'  },
  { ticket: 12, fecha: 'Magnesium', paciente: '24.305', edad: 'Mg', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '12'  },
  { ticket: 13, fecha: 'Aluminum', paciente: '26.9815', edad: 'Al', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '13'  },
  { ticket: 14, fecha: 'Silicon', paciente: '28.0855', edad: 'Si', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '14'  },
  { ticket: 15, fecha: 'Phosphorus', paciente:' 30.9738', edad: 'P', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H', estatus: 'Hydrogen', accion: 'falla', id: '15'  },
  { ticket: 16, fecha: 'Sulfur', paciente: '32.065', edad: 'S', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '16' },
  { ticket: 17, fecha: 'Chlorine', paciente: '35.453', edad: 'Cl', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '17' },
  { ticket: 18, fecha: 'Argon', paciente: '39.948', edad: 'Ar', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '18' },
  { ticket: 19, fecha: 'Potassium', paciente: '39.0983', edad: 'K', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '19' },
  { ticket: 20, fecha: 'Calcium', paciente: '40.078', edad: 'Ca', diagnostico: 1, area: 'Hydrogen', sala: 'falla', turno: 'H' , estatus: 'Hydrogen', accion: 'falla', id: '20' },
];

// EliminarElementoTabla(key: number) {
//   this.ELEMENT_DATA.forEach((value,index)=>{
//       if(value.ticket==key) this.ELEMENT_DATA.splice(index,1);
//   });
// } 

  constructor(private notification: NotificationService,

    
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) { // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

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
  downloadPdf() {

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

  displayedColumns = ['ticket', 'fecha', 'area', 'sala', 'turno', 'estatus', 'accion' ];

  editarFila(element: Element) {
    this.editarRegistro=element;
  }
  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }

}
export interface Element {
  fecha: string;
  ticket: number;
  paciente: string;
  edad: string;

  diagnostico: number;
  area: string;
  sala: string;
  turno: string;

  estatus: string;
  accion: string;
  id: string;
}