import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AreaTrabajo } from '@app/models/backend/area';
import { Turno } from '@app/models/backend/turno';
import { AreatrabajoService, NotificationService, TurnoService } from '@app/services';
import { DialogService } from '@app/services/dialog/dialog.service';

import 'moment/locale/es';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-almacengeneral',
  standalone: false,
  templateUrl: './almacengeneral.component.html',
  styleUrl: './almacengeneral.component.scss'
})
export class AlmacengeneralComponent {
  nombrejefa= "María Dolores Rodríguez Ramírez";
  editarRegistro !: Element;
  borrarRegistro !: Element;
  area: AreaTrabajo[]=[];
  turno: Turno[] =[];

  /** Constants used to fill up our data base. */
  ELEMENT_DATA = [
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'baja', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'media', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'baja', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'baja', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'baja', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'media', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'baja', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'baja', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'media', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'media', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'baja', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'media', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'media', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'media', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
    {Prioridad: 'alta', Caducidad: '15/11/2023', Recepcion:'15/10/2023', QR:12345375, Proveedor:'Smartes', Nombre: 'Set de Angiocardio', Ubicacion: 'Estante A-2'},
  
  ];
  areaElegida!: AreaTrabajo;
  area_id!: number;

// EliminarElementoTabla(key: number) {
//   this.ELEMENT_DATA.forEach((value,index)=>{
//       if(value.recepcion==key) this.ELEMENT_DATA.splice(index,1);
//   });
// } 

  constructor(
    private dialog:DialogService,
    private areadetrabajoService: AreatrabajoService,
    private turnoService: TurnoService,
    private notification: NotificationService,
    private router: Router,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) { // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.areadetrabajoService.listaAreasTrabajo().subscribe((data => {
        data.forEach((area_trabajo) => {
          this.area.push( area_trabajo)
        })
      })
    )
    this.turnoService.traerturnos().subscribe((data) => {
      
    } )



    //------------------------------------------condicion reloj
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data3, filter) =>{
        var cortado = data3.Caducidad.split('T').slice(0)
        var cortado2 = cortado[0]
        console.log (cortado2)
        console.log (this.today + ' 0000000asdasd ' + this.today2)
      const date =this.fromDate._d; this.today = date.getFullYear()+ '-'  + ('0' + (date.getMonth() + 1)).slice(-2) + '-' +('0' + date.getDate()).slice(-2)  

      const date2 =this.toDate._d;  this.today2 = date2.getFullYear()+ '-'  + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' +('0' + date2.getDate()).slice(-2)  

      if (this.today && this.today2 ) {
        return cortado2  >=  this.today  && cortado2 <= this.today2;
      }
      return true;
    }
  //------------------------------------------condicion reloj
  }


  //--------------------inicia calendario
  today:any;
  today2:any;
  pipe: DatePipe;
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

  emergente(){
    this.dialog.transfalmacen()
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

  displayedColumns = ['prioridad', 'caducidad', 'recepcion', 'QR', 'nombre','proveedor',  'ubicacion', 'accion' ];

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
  generarPDF() {
    createPDF(this.ELEMENT_DATA, this.nombrejefa);
  }
  leerCodigoQR() {
    this.router.navigate(['/static/lectorqr'])
  }
}

export interface Element {
  Caducidad: string;
  Recepcion: string;
  QR: number;
  Proveedor: string;
  Nombre: string;
  Ubicacion: string;
  Prioridad: string;
}

// ********************** RUTINAS DE IMPRESIÖN *****************

const date = new Date();
const año = date.getFullYear();
const mes = date.toLocaleString('default', { month: 'short' });
const mes2 = date.toLocaleString('default', { month: 'long' });
const dia = date.getDate(); 
const hora = date.getHours();
const minutos = date.getMinutes();


const fecha =dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs';

const area = 'Almacén CEyE'
const turno = 1;


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
        widths: ['15%','15%','15%','15%','15%','15%','15%',],
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
      {text: 'ALMACÉN GENERAL', style: 'header2'},
      {
        columns: [
          {
            text: 'Área: '+ area, 
            width:'40%',alignment: "center", margin:[0,25,0,0], fontSize: 11, bold:true,
          },
          {
            text: 'Turno: '+turno,
            width:'10%',alignment: "center", margin:[0,25,0,0], fontSize: 11, bold:true,
          },
          {
            text: 'Rango de Fecha: '+/*aqui va la primera la variable de fecha del piker*/'10/08/23'+' - '+/*aqui va la segunda la variable de fecha del piker*/'16/12/23',
            width:'50%',alignment: "center", margin:[0,25,0,0], fontSize: 11, bold:true,
          },
        ]
      },
      
    ],

    content: [
      
       table(fuenteDatos, ['Prioridad', 'Caducidad', 'Recepcion', 'Proveedor', 'Nombre', 'Ubicacion'], ),
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
  //pdf.download('Reporte Almacén General '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
pdf.open()
  
}


