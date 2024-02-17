import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AreaTrabajo } from '@app/models/backend/area';
import { NotificationService } from '@app/services';
import 'moment/locale/es';

@Component({
  selector: 'app-almacengeneral',
  standalone: false,
  templateUrl: './almacengeneral.component.html',
  styleUrl: './almacengeneral.component.scss'
})
export class AlmacengeneralComponent {

  editarRegistro !: Element;
  borrarRegistro !: Element;
  area: AreaTrabajo[]=[
  {
    id: 1,
    tipo: 'interna',
    nombre: 'Quirófano'
  },
  {
    id: 2,
    tipo: 'interna',
    nombre: 'Urgencia'
  },
  {
    id: 3,
    tipo: 'interna',
    nombre: 'Ceye'
  },
];
turno =[
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

  /** Constants used to fill up our data base. */
 ELEMENT_DATA: Element[] = [
  { recepcion: 1, caducidad: 'Hydrogen', QR: 'falla', edad: 'H', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'alta', accion: 'falla', id: '1'  },
  { recepcion: 2, caducidad: 'Helium', QR: 'falla', edad: 'He', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'media', accion: 'falla', id: '2' },
  { recepcion: 3, caducidad: 'Lithium', QR: 'falla', edad: 'Li', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'baja', accion: 'falla', id: '3'  },
  { recepcion: 4, caducidad: 'Beryllium', QR: '9.0122', edad: 'Be', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'alta', accion: 'falla', id: '4'  },
  { recepcion: 5, caducidad: 'Boron', QR: '10.811', edad: 'B', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'alta', accion: 'falla', id: '5' },
  { recepcion: 6, caducidad: 'Carbon', QR: '12.0107', edad: 'C', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'baja', accion: 'falla', id: '6' },
  { recepcion: 7, caducidad: 'Nitrogen', QR: '14.0067', edad: 'N', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'media', accion: 'falla', id: '7' },
  { recepcion: 8, caducidad: 'Oxygen', QR: '15.9994', edad: 'O', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'alta', accion: 'falla', id: '8' },
  { recepcion: 9, caducidad: 'Fluorine', QR: '18.9984', edad: 'F', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'baja', accion: 'falla', id: '9' },
  { recepcion: 10, caducidad: 'Neon', QR: '20.1797', edad: 'Ne', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'media', accion: 'falla', id: '10'  },
  { recepcion: 11, caducidad: 'Sodium', QR: '22.9897', edad: 'Na', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'baja', accion: 'falla', id: '11'  },
  { recepcion: 12, caducidad: 'Magnesium', QR: '24.305', edad: 'Mg', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'media', accion: 'falla', id: '12'  },
  { recepcion: 13, caducidad: 'Aluminum', QR: '26.9815', edad: 'Al', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'alta', accion: 'falla', id: '13'  },
  { recepcion: 14, caducidad: 'Silicon', QR: '28.0855', edad: 'Si', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'baja', accion: 'falla', id: '14'  },
  { recepcion: 15, caducidad: 'Phosphorus', QR:' 30.9738', edad: 'P', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H', prioridad: 'baja', accion: 'falla', id: '15'  },
  { recepcion: 16, caducidad: 'Sulfur', QR: '32.065', edad: 'S', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'baja', accion: 'falla', id: '16' },
  { recepcion: 17, caducidad: 'Chlorine', QR: '35.453', edad: 'Cl', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'baja', accion: 'falla', id: '17' },
  { recepcion: 18, caducidad: 'Argon', QR: '39.948', edad: 'Ar', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'alta', accion: 'falla', id: '18' },
  { recepcion: 19, caducidad: 'Potassium', QR: '39.0983', edad: 'K', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'media', accion: 'falla', id: '19' },
  { recepcion: 20, caducidad: 'Calcium', QR: '40.078', edad: 'Ca', diagnostico: 1, nombre: 'Hydrogen', sala: 'falla', ubicacion: 'H' , prioridad: 'media', accion: 'falla', id: '20' },
];
  areaElegida!: AreaTrabajo;
  area_id!: number;

// EliminarElementoTabla(key: number) {
//   this.ELEMENT_DATA.forEach((value,index)=>{
//       if(value.recepcion==key) this.ELEMENT_DATA.splice(index,1);
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

  displayedColumns = ['prioridad', 'caducidad', 'recepcion', 'QR', 'nombre',  'ubicacion', 'accion' ];

  editarFila(element: Element) {
    this.editarRegistro=element;
  }
  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }
  changeArea(valor: AreaTrabajo) { 
    this.areaElegida = valor;
    this.area_id = this.areaElegida.id;
}
}

export interface Element {
  caducidad: string;
  recepcion: number;
  QR: string;
  edad: string;

  diagnostico: number;
  nombre: string;
  sala: string;
  ubicacion: string;

  prioridad: string;
  accion: string;
  id: string;
}
