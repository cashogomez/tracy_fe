import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AreaTrabajo } from '@app/models/backend/area';
import { NotificationService } from '@app/services';
import 'moment/locale/es';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-distribucionotrasareas',
  standalone: false,
  templateUrl: './distribucionotrasareas.component.html',
  styleUrl: './distribucionotrasareas.component.scss'
})
export class DistribucionotrasareasComponent {
  nombrejefa= "María Dolores Rodríguez Ramírez";
  editarRegistro !: Element;
  borrarRegistro !: Element;
  area: AreaTrabajo[]=[
  {
    id: 1,
    tipo: 'interna',
    nombre: 'Quirofano'
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


  /** Constants used to fill up our data base. */
  ELEMENT_DATA = [
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'baja', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'media', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
    {Prioridad: 'alta', Ticket: 1233, QR:44376579, Proveedor:'Quirófano', Nombre: 'Set de Angiocardio', Fecha:'23/02/2024', Turno:2},
   
  ];
  areaElegida!: AreaTrabajo;
  area_id!: number;

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

  displayedColumns = ['prioridad', 'ticket', 'QR', 'nombre',  'fecha', 'turno', 'accion' ];

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
Prioridad: string;
Ticket: number;
QR: number;
Proveedor: string;
Nombre: string;
Fecha: string;
Turno: number;
}
// **************************************************************************************
const date = new Date();
const año = date.getFullYear();
const mes = date.toLocaleString('default', { month: 'short' });
const mes2 = date.toLocaleString('default', { month: 'long' });
const dia = date.getDate(); 
const hora = date.getHours();
const minutos = date.getMinutes();
const fecha =dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs';
const area = 'Urgencias'
const tipo= 'Set de Instrumental';

function buildTableBody(data: { [x: string]: { toString: () => any; }; }[], columns: (string | number)[]) {
  var body: any[][] = [];


  data.forEach(function(row: { [x: string]: { toString: () => any; }; }) {
      var dataRow: any[] = [];

      columns.forEach(function(column: string | number) {
          dataRow.push({text : row[column].toString(), alignment : 'center', color : 'black', bold:false, fontSize: 9, margin: [0, 10, 0, 0]});
      })

      body.push(dataRow, );
  });

  return body;
}

function table(data: { [x: string]: { toString: () => any; }; }[] | { name: string; age: number; }[], columns: (string | number)[]) {
  return {
    style: 'tableExample',
      table: {
        widths: ['12%','12%', '12%', '18%','18%','18%','10%' ],
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

  async function  createPDF(fuenteDatos: { [x: string]: { toString: () => any; }; }[], jefaNombre: string){

  const pdfDefinition: any = {

    pageSize: 'A4',
    pageMargins: [20, 270, 20, 80],

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
      {text: 'Fecha de Impresión: '+fecha, style: 'header3'},
      {text: 'DISTRIBUCIÓN MATERIAL OTRAS ÁREAS HOSPITALARIAS Y PROVEEDOR EXTERNO', style: 'header2'},
      {
        columns: [
          {
            text: '', 
            width:'40%',alignment: "center", margin:[0,25,0,0], fontSize: 11, bold:true,
          },
          {
            text: 'Área: '+area,
            width:'20%',alignment: "center", margin:[0,25,0,0], fontSize: 11, bold:true,
          },
          {
            text: 'Rango de Fecha: '+/*aqui va la primera la variable de fecha del piker*/'10/08/23'+' - '+/*aqui va la segunda la variable de fecha del piker*/'16/12/23',
            width:'40%',alignment: "center", margin:[0,25,0,0], fontSize: 11, bold:true,
          },
        ]
      },
      
      {
        style: 'tableExample', margin:[20,20,20,0],
        table: {
          widths: ['12%','12%', '12%', '18%','18%','18%','10%' ],
          body: [
            ['Prioridad','Ticket','QR', 'Proveedor/Área', 'Nombre', 'Fecha de Recepción', 'Turno'],
          ]
        },layout: 'noBorders'
      },
      

    ],

    content: [
      
       table(fuenteDatos, ['Prioridad','Ticket','QR', 'Proveedor', 'Nombre', 'Fecha', 'Turno'], ),
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
  //pdf.download('Reporte Distribución Material Otras Áreas Hospitalarias Y Proveedor Externo '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
  pdf.open()
}
