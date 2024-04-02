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
import { from } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NotificationService } from '@app/services';
import { ImprimirService } from '@app/services/imprimir/imprimir.service';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TicketService } from '@app/services/ticket/ticket.service';
import { Ticket } from '@app/models/backend/ticket';
import { EditarprogramacioncirugiaComponent } from '../editarprogramacioncirugia/editarprogramacioncirugia.component';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-quirofanoinformacion',
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
    EditarprogramacioncirugiaComponent,

    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    RouterModule,
  ],
  templateUrl: './quirofanoinformacion.component.html',
  styleUrl: './quirofanoinformacion.component.scss'
})
export class QuirofanoinformacionComponent {
  nombrejefa= "María Dolores Rodríguez Ramírez";
  editar: boolean = false;
  editarRegistro !: Element;
  ticketAEditar: string = '';
  borrarRegistro !: Element;
  ELEMENT_DATA: any[]=[]

  EliminarElementoTabla(ticket: number) {
    this.ticketService.borrarticket(ticket).subscribe(res=>{
      this.dataSource.data = this.dataSource.data.filter((u) => u.Ticket !== ticket);
      this.ELEMENT_DATA = this.dataSource.data;
      this.notification.success("¡El registro se borro exitosamente!");
    });
    
  }

  private lazyLoadBeta$ = from(
    import('@app/services/emergente/components/mensajecontinuar/mensajecontinuar.component').then(
      (component) => component.MensajecontinuarComponent
    )
  );

  onBetaClicked() {
    this.dataService.showDialog(this.lazyLoadBeta$);
  }

  constructor(
    private notification: NotificationService,
    private ticketService: TicketService,
    private dataService: DynamicDialogService,
    
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        // Assign the data to the data source for the table to render
        
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
          console.log(data);
          if (data==true) {
            console.log('Va bien');
            if (this.borrarRegistro != undefined) {
              this.EliminarElementoTabla(this.borrarRegistro.Ticket);
            }
            
          }
          else {
            this.notification.error("¡Se canceló la operación");
          }
        });

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
  generarPDF() {
    createPDF(this.ELEMENT_DATA, this.nombrejefa);
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

  displayedColumns = ['ticket', 'fecha', 'paciente', 'edad', 'diagnostico', 'cirugia', 'sala', 'turno', 'estatus', 'accion' ];

  editarFila(element: Element) {
    this.editarRegistro=element;
    this.editar = true;
    this.ticketAEditar = element.id.toString();
    console.log(this.ticketAEditar);   
  }
  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }
  
}

export interface Element {
  id: number;
  Fecha: string;
  Ticket: number;
  Paciente: string;
  Edad: number;

  Diagnostico: string;
  Cirugia: string;
  Sala: number;
  Turno: number;

  Estatus: string;
}


const date = new Date();
const año = date.getFullYear();
const mes = date.toLocaleString('default', { month: 'short' });
const mes2 = date.toLocaleString('default', { month: 'long' });
const dia = date.getDate(); 
const hora = date.getHours();
const minutos = date.getMinutes();

const fecha =dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs';


function buildTableBody(data: { [x: string]: { toString: () => any; }; }[], columns: (string | number)[]) {
  var body: any[][] = [];

  //body.push(columns);

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
        widths: ['7%','12%','20%','5%','15%','17%','5%','5%','10%'],
          //headerRows: 1,
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

  async function createPDF(dataSource:  { [x: string]: { toString: () => any; }; }[], nombreJefa: string ){
 
    const pdfDefinition: any = {
      pageSize: 'A4',
      pageMargins: [20, 270, 20, 60],

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
        {text: 'SUBDIRECCIÓN DE ENFERMERÍA: '+nombreJefa, style: 'header'},
        {text: 'DEPARTAMENTO DE ENFERMERÍA', style: 'header'},
        {text: 'CENTRAL DE EQUIPOS Y ESTERILIZACIÓN', style: 'header'},
        {text: 'Fecha de Impresión: '+fecha, style: 'header3'},
        {text: 'SOLICITUDES DE PROGRAMACIÓN DE CIRUGÍA', style: 'header2'},
        {text: 'Rango de Fecha: '+/*aqui va la primera la variable de fecha del piker*/'10/08/23'+' - '+/*aqui va la segunda la variable de fecha del piker*/'16/12/23', style: 'header3' },
        {
          style: 'tableExample', margin:[20,20,20,0],
          table: {
            widths: ['7%','12%','20%','5%','15%','17%','5%','5%','15%'],
            body: [
              ['Ticket', 'Fecha', 'Paciente', 'Edad', 'Diagnóstico', 'Tipo de Cirugía', 'Sala', 'Turno', 'Estatus'],
            ]
          },layout: 'noBorders'
        },
      ],

      content: [
        
         table(dataSource, ['Ticket', 'Fecha', 'Paciente', 'Edad', 'Diagnostico', 'Cirugia', 'Sala', 'Turno', 'Estatus'], ),
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
        fontSize: 9,
        bold: true,
        margin: [0, -15, 0, 0],
        alignment : 'center',
        color: 'black'
      },
    
    },
    
    footer:[
      
      {text: 'TRACY © '+año, style: 'footer'},
    ]
    }
    const pdf =  pdfMake.createPdf(pdfDefinition);
    //pdf.download('Reporte Solicitudes de Programación de Cirugía '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
    pdf.open();
    
  }
