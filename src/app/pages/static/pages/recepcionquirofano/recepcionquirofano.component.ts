import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { RecibirrecepcionquirofanoComponent } from '../recibirrecepcionquirofano/recibirrecepcionquirofano.component';
import 'moment/locale/ja';
import 'moment/locale/fr';
import 'moment/locale/es';


import { MatDivider } from '@angular/material/divider';
import { NotificationService } from '@app/services/notification/notification.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TicketService } from '@app/services/ticket/ticket.service';
import { DynamicDialogService } from '@app/services/emergente/emergente.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-recepcionquirofano',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideMomentDateAdapter(),
  ],
  standalone: true,
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
    RecibirrecepcionquirofanoComponent,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    RouterModule,
  ],
  templateUrl: './recepcionquirofano.component.html',
  styleUrl: './recepcionquirofano.component.scss'
})
export class RecepcionquirofanoComponent implements AfterViewInit, OnInit {
  nombrejefa= "María Dolores Rodríguez Ramírez";
  editarRegistro !: Element;
  borrarRegistro !: Element;
  /** Constants used to fill up our data base. */
  ELEMENT_DATA: any[]=[]
  

// EliminarElementoTabla(key: number) {
//   this.ELEMENT_DATA.forEach((value,index)=>{
//       if(value.ticket==key) this.ELEMENT_DATA.splice(index,1);
//   });
// } 

  constructor(private notification: NotificationService,

    private router:Router,
    private _adapter: DateAdapter<any>,
    private ticketService: TicketService,
    private dataService: DynamicDialogService,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {// Assign the data to the data source for the table to render
      ticketService.traertickets().subscribe(ticketsRecibidos => {
        ticketsRecibidos.forEach((ticket) => {
          let elementoAgregar = {
            id: ticket.id,
            Fecha: ticket.fecha_cirugia,
            Ticket: ticket.id,
            Paciente: ticket.paciente,
            Edad: ticket.edad,
            Diagnostico: ticket.diagnostico,
            Cirugia: ticket.cirugia,
            Sala: ticket.sala,
            Turno: ticket.turno,
            Estatus: ticket.estatus,
          }
          this.ELEMENT_DATA.push(elementoAgregar)
        })
        this.dataSource.data = this.ELEMENT_DATA
      })

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      // ****** Recibe datos ******
      this.dataService.data$.subscribe(data => {
        //console.log(data);
        if (data==true) {
          //console.log('Va bien');
       
          
        }
        else {
          this.notification.error("¡Se canceló la operación");
        }
      });


  }

  editar: boolean = false;
  ticketAEditar: string = '';

  editarFila(element: Element) {
    this.editarRegistro=element;
    this.editar = true;
    this.ticketAEditar = element.Ticket.toString();
    //console.log(this.ticketAEditar);   
  }

  goPlaces(){
    this.router.navigate(['static/recibirrecepcionquirofano'])
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

  displayedColumns = ['ticket', 'fecha', 'cirugia', 'sala', 'turno', 'estatus', 'accion' ];

 
  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }
  generarPDF() {
    createPDF(this.ELEMENT_DATA, this.nombrejefa);
  }

}

export interface Element {
  Fecha: string;
  Ticket: number;
  Cirugia: string;
  Sala: number;
  Turno: number;
  Estatus: string;
  
}


// *********************** Funciones para imprimir ********************************

const date = new Date();
const año = date.getFullYear();
const mes = date.toLocaleString('default', { month: 'short' });
const mes2 = date.toLocaleString('default', { month: 'long' });
const dia = date.getDate(); 
const hora = date.getHours();
const minutos = date.getMinutes();

const fecha =dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs';


function buildTableBody(data: { [x: string]: { toString: () => any; }; }[], columns: (string | number)[]) {
  var body = [];

  body.push(columns);

  data.forEach(function(row: { [x: string]: { toString: () => any; }; }) {
      var dataRow: any[] = [];

      columns.forEach(function(column: string | number) {
          dataRow.push({text : row[column].toString(), alignment : 'center', color : 'black', bold:false, fontSize: 9, margin: [0, 10, 0, 0],});
      })

      body.push(dataRow, );
  });

  return body;
}

function table(data: { [x: string]: { toString: () => any; }; }[] | { name: string; age: number; }[], columns: (string | number)[]) {
  return {
    style: 'tableExample',
      table: {
        widths: ['10%','15%','20%','15%','15%','15%'],
          headerRows: 1,
          body: buildTableBody(data, columns),
      },layout: 'noBorders'
    
  };
}

function getBase64ImageFromURL(url: string) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
  
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
  
      var ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);
  
      var dataURL = canvas.toDataURL("image/png");
  
      resolve(dataURL);
    };
  
    img.onerror = error => {
      reject(error);
    };
  
    img.src = url;
  });}

  async function createPDF(fuenteDatos: { [x: string]: { toString: () => any; }; }[], jefaNombre: string){

  const pdfDefinition: any = {

    
    pageSize: 'A4',
    pageMargins: [20, 200, 20, 60],

    background: [
      {
        "image":"logo",
          width: 100,
          margin:[20,22,0,0]
      },

      {
        "image":"logo",
          width: 600,
          margin:[-2,60,0,0],
          opacity: 0.1
      }
    ],

    header:[
   
      {text: 'INSTITUTO NACIONAL DE CIENCIAS MÉDICAS NUTRICIÓN SALVADOR ZUBIRÁN', style: 'header2'},
      {text: 'SUBDIRECCIÓN DE ENFERMERÍA: '+jefaNombre, style: 'header'},
      {text: 'DEPARTAMENTO DE ENFERMERÍA', style: 'header'},
      {text: 'CENTRAL DE EQUIPOS Y ESTERILIZACIÓN', style: 'header'},
      {text: 'Fecha de Impresión: '+dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs', style: 'header3'},
      {text: 'RECEPCIÓN MATERIAL DE QUIRÓFANO ', style: 'header2'},
    ],

    content: [
      
       table(fuenteDatos, ['Ticket', 'Fecha', 'Cirugia', 'Sala', 'Turno', 'Estatus'], ),
  ],
  
images:{
  
  "logo" : await getBase64ImageFromURL(
      "../../assets/generales/Logo_nutricion.png")
    
},
  styles: {

    header: {
      fontSize: 11,
      bold: true,
      margin: [40, 7, 0, 0],
      alignment: "center",
      color: 'black',
      position:'fixed',
    },
    header2: {
      fontSize: 11,
      bold: true,
      margin: [40, 30, 0, 0],
      alignment: "center",
      color: 'black',
      position:'fixed',
     
    },
    header3: {
      fontSize: 11,
      bold: true,
      margin: [0, 27, 30, 0],
      alignment: "right",
      color: 'black',
      position:'fixed',
    },
    footer: {
      fontSize: 10,
      margin: [0, 20, 0, 0],
      alignment: "center",
      color: 'black',
      position:'fixed',
    },
    tableExample: {
      fontSize: 11,
      bold: true,
      margin: [60, 0, 0, 0],
      alignment : 'center',
      color: 'black'
    },
  
  },
  
  footer:[
    
    {text: 'TRACY © '+año, style: 'footer'},
  ]
  }
  
  const pdf =  pdfMake.createPdf(pdfDefinition);
  //pdf.download('Reporte Recepción Material de Quirófano '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
  pdf.open();
  
}
