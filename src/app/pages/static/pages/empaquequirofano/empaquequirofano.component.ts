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
  ELEMENT_DATA = [
    {Prioridad: 'baja', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'baja', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'media', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'baja', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'media', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'media', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'media', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
    {Prioridad: 'alta', Nombre: 'Set de Angiocardio', Elaborar:1, Estatus: 'Pendiente'},
  
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
nombrejefa= "María Dolores Rodríguez Ramírez";
  displayedColumns: string[] = ['Prioridad', 'Nombre', 'Elaborar', 'Estatus','Accion', 'Impresion'];
  
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
  Prioridad: string;
  Nombre: string;
  Elaborar: number;
  Estatus: string;
}

// ******************************* Impresión *****************************+
const date = new Date();const año = date.getFullYear();const mes = date.toLocaleString('default', { month: 'short' });const mes2 = date.toLocaleString('default', { month: 'long' });const dia = date.getDate(); const hora = date.getHours();const minutos = date.getMinutes();
const fecha =dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs';

const area = 'Quirófano'
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
        widths: ['25%','25%', '25%', '25%'],
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

  async function createPDF(dataSource:  { [x: string]: { toString: () => any; }; }[], nombreJefa: string){

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
      {text: 'SUBDIRECCIÓN DE ENFERMERÍA: '+nombreJefa, style: 'header'},
      {text: 'DEPARTAMENTO DE ENFERMERÍA', style: 'header'},
      {text: 'CENTRAL DE EQUIPOS Y ESTERILIZACIÓN', style: 'header'},
      {text: 'Fecha de Impresión: '+fecha, style: 'header3'},
      {text: 'EMPAQUE MATERIAL DE QUIRÓFANO Y CEyE', style: 'header2'},
      {
        columns: [
          {
            text: 'Tipo: '+tipo, 
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
          widths: ['25%','25%', '25%', '25%'],
          body: [
            ['Prioridad', 'Nombre', 'Por Elaborar', 'Estatus'],
          ]
        },layout: 'noBorders'
      },
      
    ],

    content: [
      
       table(dataSource, ['Prioridad', 'Nombre', 'Elaborar', 'Estatus'], ),
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
  //pdf.download('Reporte Empaque Material De Quirófano Y CEyE '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');

  pdf.open()  
}
