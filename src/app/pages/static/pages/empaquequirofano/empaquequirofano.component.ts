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
  selector: 'app-empaquequirofano',
  standalone: false,
  templateUrl: './empaquequirofano.component.html',
  styleUrl: './empaquequirofano.component.scss'
})
export class EmpaquequirofanoComponent {

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
setmaterial =[
  {
    nombre: 'Pinzas',
  },
  {
    nombre: 'Set Instrumental',
  },
  {
    nombre: 'set 2',
  },
];

  /** Constants used to fill up our data base. */
 ELEMENT_DATA: Element[] = [
  {  nombre: 'H', prioridad: 'alta', estatus: 'falla', por_elaborar: 1  },
  {  nombre: 'H', prioridad: 'media', estatus: 'falla', por_elaborar: 2 },
  { nombre: 'H', prioridad: 'baja', estatus: 'falla', por_elaborar: 1  },
  { nombre: 'H', prioridad: 'alta', estatus: 'falla', por_elaborar: 3  },
  { nombre: 'H' , prioridad: 'alta', estatus: 'falla', por_elaborar: 3 },
  { nombre: 'H' , prioridad: 'baja', estatus: 'falla', por_elaborar: 2},
  {  nombre: 'H' , prioridad: 'media', estatus: 'falla', por_elaborar: 2 },
  { nombre: 'H' , prioridad: 'alta', estatus: 'falla', por_elaborar: 1 },
  { nombre: 'H' , prioridad: 'baja', estatus: 'falla', por_elaborar: 4 },
  { nombre: 'H', prioridad: 'media', estatus: 'falla', por_elaborar: 1  },
  {  nombre: 'H', prioridad: 'baja', estatus: 'falla', por_elaborar: 3  },
  {  nombre: 'H', prioridad: 'media', estatus: 'falla', por_elaborar: 2  },
  { nombre: 'H', prioridad: 'alta', estatus: 'falla', por_elaborar: 5  },
  { nombre: 'H', prioridad: 'baja', estatus: 'falla', por_elaborar: 2 },
  {  nombre: 'H', prioridad: 'baja', estatus: 'falla', por_elaborar: 2  },
  {  nombre: 'H' , prioridad: 'baja', estatus: 'falla', por_elaborar: 2 },
  {  nombre: 'H' , prioridad: 'baja', estatus: 'falla', por_elaborar: 1 },
  {  nombre: 'H' , prioridad: 'alta', estatus: 'falla', por_elaborar: 4},
  { nombre: 'H' , prioridad: 'media', estatus: 'falla', por_elaborar: 2},
  {  nombre: 'H' , prioridad: 'media', estatus: 'falla', por_elaborar: 3 },
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

  displayedColumns = ['prioridad', 'nombre',  'por_elaborar', 'estatus', 'accion', 'impresion' ];

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
changeSetmaterial(valor: {nombre: string}) { 
  console.log(valor);
}
}


export interface Element {
  prioridad: string;
  nombre: string;
  por_elaborar: number;
  estatus: string;
}

