import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AreaTrabajo } from '@app/models/backend/area';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-lavadomanual',
  standalone: false,
  templateUrl: './lavadomanual.component.html',
  styleUrl: './lavadomanual.component.scss'
})
export class LavadomanualComponent {



  /** Constants used to fill up our data base. */
 ELEMENT_DATA: Element[] = [
  {  fecha: '26/10/24', ticket: 2345, cirugia: 'Laparoscopia', turno: 1, sala: 1, area: 'urgencia'  },
  {  fecha: '26/10/24',ticket: 2345, cirugia: 'Biopsia', turno: 2, sala: 2, area: 'urgencia' },
  { fecha: '26/10/24', ticket: 2345,cirugia: 'Biopsia', turno: 2, sala: 1, area: 'urgencia'  },
  { fecha: '26/10/24', ticket: 2345,cirugia: 'Apendiceptomia', turno: 1, sala: 3, area: 'urgencia'  },
  { fecha: '26/10/24' , ticket: 2345,cirugia: 'Apendiceptomia', turno: 1, sala: 3, area: 'urgencia' },
  { fecha: '26/10/24' ,ticket: 2345,cirugia: 'Apendiceptomia', turno: 2, sala: 2, area: 'urgencia' },
  {  fecha: '26/10/24' , ticket: 2345,cirugia: 'Biopsia', turno: 3, sala: 2, area: 'urgencia' },
  { fecha: '26/10/24' , ticket: 2345,cirugia: 'alta', turno: 3, sala: 1, area: 'urgencia' },
  { fecha: '26/10/24' , ticket: 2345,cirugia: 'baja', turno: 2, sala: 4, area: 'urgencia' },
  { fecha: '26/10/24', ticket: 2345,cirugia: 'media', turno: 2, sala: 1, area: 'urgencia'  },
  {  fecha: '26/10/24', ticket: 2345,cirugia: 'baja', turno: 1, sala: 3, area: 'urgencia'  },
  {  fecha: '26/10/24', ticket: 2345,cirugia: 'media', turno: 1, sala: 2, area: 'urgencia'  },
  { fecha: '26/10/24', ticket: 2345,cirugia: 'alta', turno: 1, sala: 5, area: 'urgencia'  },
  { fecha: '26/10/24', ticket: 2345,cirugia: 'baja', turno: 1, sala: 2, area: 'urgencia' },
  {  fecha: '26/10/24', ticket: 2345,cirugia: 'baja', turno: 2, sala: 2, area: 'urgencia'  },
  {  fecha: '26/10/24' , ticket: 2345,cirugia: 'Biopsia', turno: 3, sala: 2, area: 'urgencia' },
  {  fecha: '26/10/24' , ticket: 2345,cirugia: 'baja', turno: 3, sala: 1, area: 'urgencia' },
  {  fecha: '26/10/24' , ticket: 2345,cirugia: 'Apendiceptomia', turno: 1, sala: 4, area: 'urgencia'},
  { fecha: '26/10/24' , ticket: 2345,cirugia: 'media', turno: 1, sala: 2, area: 'urgencia'},
  {  fecha: '26/10/24' , ticket: 2345,cirugia: 'media', turno: 1, sala: 3, area: 'urgencia' },
];

// EliminarElementoTabla(key: number) {
//   this.ELEMENT_DATA.forEach((value,index)=>{
//       if(value.recepcion==key) this.ELEMENT_DATA.splice(index,1);
//   });
// } 

  constructor(private notification: NotificationService) {
    
    // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  }

  ngOnInit() {
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

  displayedColumns = ['ticket', 'fecha',  'cirugia', 'sala', 'turno', 'area', 'accion'];

}

export interface Element {
  cirugia: string;
  ticket: number;
  fecha: string;
  sala: number;
  turno: number;
  area: string
}
