import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/services/notification/notification.service';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import 'moment/locale/es';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


import { FormControl, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-recepcionproveedorexterno',
  standalone: false,
  templateUrl: './recepcionproveedorexterno.component.html',
  styleUrl: './recepcionproveedorexterno.component.scss'
})
export class RecepcionproveedorexternoComponent {
  nombrejefa= "María Dolores Rodríguez Ramírez";
  editarRegistro !: Element;
  borrarRegistro !: Element;
  /** Constants used to fill up our data base. */
  ELEMENT_DATA = [
    {Ticket: 1, Fecha: new Date(2024, 5, 26), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 5, 27), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 5, 28), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 5, 29), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 5, 30), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 6, 1), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 6, 2), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 6, 3), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 6, 4), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    {Ticket: 1, Fecha: new Date(2024, 6, 5), Instrumental:'Tijeras Kelly', Proveedor:'SMARTEST', Responsable: 2, Estatus:'Recibido'},
    ];

// EliminarElementoTabla(key: number) {
//   this.ELEMENT_DATA.forEach((value,index)=>{
//       if(value.ticket==key) this.ELEMENT_DATA.splice(index,1);
//   });
// } 

  constructor(private notification: NotificationService,

    private router:Router,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) { // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

        //------------------------------------------condicion reloj
  this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
    if (this.fromDate && this.toDate) {
      return data.Fecha>= this.fromDate && data.Fecha <= this.toDate;
    }
    const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
      return (currentTerm + (data as { [key: string]: any })[key] + '◬');
    }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return dataStr.indexOf(transformedFilter) != -1;
  }
  //------------------------------------------condicion reloj
  }
 //--------------------inicia calendario
 today:any;
 today2:any;
 filterForm:any = new FormGroup({
   fromDate: new FormControl(),
   toDate: new FormControl(),
 });
 
 get fromDate() { return this.filterForm.get('fromDate').value; }
 get toDate() { return this.filterForm.get('toDate').value; }
 
 applyFilter2() {
   this.dataSource.filter = ''+Math.random();
 }
 
 
//--------------------fincalendario
  goPlaces(){
    this.router.navigate(['static/recibirrecepcionprov'])
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

  displayedColumns = ['ticket', 'fecha', 'instrumental', 'proveedor', 'responsable' ];

  editarFila(element: Element) {
    this.editarRegistro=element;
  }
  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }
  generarPDF() {
    createPDF(this.ELEMENT_DATA, this.nombrejefa);
  }
}
export interface Element {
Ticket: number;
Fecha: Date;
Instrumental: string;
Proveedor: string;
Responsable: number;
Estatus: string;
}

//************************** Impresion ***************** */
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
        widths: ['15%','15%', '20%', '20%','15%','15%'],
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
    pageMargins: [20, 250, 20, 80],

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
      {text: 'RECEPCIÓN MATERIAL PROVEEDOR EXTERNO', style: 'header2'},
      {text: 'Rango de Fecha: '+/*aqui va la primera la variable de fecha del piker*/'10/08/23'+' - '+/*aqui va la segunda la variable de fecha del piker*/'16/12/23', style: 'header3' },
    ],

    content: [
      
       table(fuenteDatos, ['Ticket', 'Fecha', 'Instrumental', 'Proveedor','Responsable', 'Estatus'], ),
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
      margin: [0, 0, 0, 0],
      alignment : 'center',
      color: 'black'
    },
  
  },
  
  footer:[
    
    {text: 'TRACY © '+año, style: 'footer'},
  ]
  }
    
  

  const pdf =  pdfMake.createPdf(pdfDefinition);
  //pdf.download('Recepción Material Proveedor Externo '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');

  pdf.open()
}
