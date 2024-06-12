import { Component, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AreaTrabajo } from '@app/models/backend/area';
import { Router } from '@angular/router';
import { NotificationService, SetService } from '@app/services';
import 'moment/locale/es';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AreatrabajoService  } from '@app/services/AreaTrabajo/areatrabajo.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { CrearEmpaqueComponent } from '../crear-empaque/crear-empaque.component';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-empaquequirofano',
  standalone: false,
  templateUrl: './empaquequirofano.component.html',
  styleUrl: './empaquequirofano.component.scss'
})
export class EmpaquequirofanoComponent { 
  crear = false;
  empaqueACrear: string = '';
  editarRegistro !: Element;
  borrarRegistro !: Element;
  area: AreaTrabajo[]=[];
  ELEMENT_DATA: any[] = []
  setmaterial : Opcion[] =[]
  


  areaElegida!: AreaTrabajo;
  area_id!: number;



  constructor(private notification: NotificationService,
    private router:Router,
    private setsService: SetService,
    private areatrabajoService: AreatrabajoService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) { // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.setsService.traersets().subscribe((setsCreados => {
        setsCreados.forEach((setCreado) => {
          let dato = {
            nombre: setCreado.nombre,
          }
          this.setmaterial.push(dato);
        })
      }))



      //------------------------------------------condicion reloj
      this.pipe = new DatePipe('en');
      this.dataSource.filterPredicate = (data3, filter) =>{
          var cortado = data3.Estatus.split('T').slice(0)
          var cortado2 = cortado[0]
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
  goPlaces(){
    this.router.navigate(['static/historico-qr'])
  }

  itemEnviado(valorRecibido: any) {
    console.log(valorRecibido)
  }
  ngOnInit() {
    this.updateCloseButtonLabel('Cerrar Calendario');
    this.areatrabajoService.listaAreasTrabajo().subscribe(data => {
      this.area = data;
      this.setsService.traersets().subscribe(dataSets => {
        dataSets.forEach(dataSet => {
          let almacen: Element = {
            id: dataSet.id,
            Prioridad: this.calcularprioridad(dataSet.minimo,dataSet.maximo, dataSet.numero),
            Nombre: dataSet.nombre,
            Elaborar: (dataSet.maximo - dataSet.numero),
            Estatus: this.calcularStatus(dataSet.minimo,dataSet.maximo, dataSet.numero),
          }
          this.ELEMENT_DATA.push(almacen);
        })
        this.dataSource.data = this.ELEMENT_DATA
      });
    })

  }
  calcularStatus(minimo:number, maximo: number, actual:number) {
    let salida: string = '';
    if (actual < maximo) {
      salida = 'pendiente'
    }
    else {
      salida = 'completo'
    }
    return salida
  }
  calcularprioridad(minimo: number, maximo: number, actual: number): string {
    let respuesta: string = ''
    let valor = 0
    if (actual != minimo) {
      if (minimo < actual) {
        valor = ((actual-minimo)/(maximo-minimo))*100
      }
      else {
        valor = ((minimo - actual)/(maximo-minimo))*100
      }
    }
    else {
      valor = 0.0
    }

    switch ( true ) {
      case valor < 0.0 : 
          respuesta = 'alta'
        break
      case valor < 30.0 :
            respuesta =  'alta'
          break;
      case valor < 70:
            respuesta =  'media'
          break;
      case valor < 100:
            respuesta =  'baja'
          break;
    }
    return respuesta;


}
  french() {
    this._locale = 'es-ES';
    this._adapter.setLocale(this._locale);
    this.updateCloseButtonLabel('Cerrar el calendario');
  }
  inicioEmpaquetar(Aempaquetar: Element) {  
    this.empaqueACrear = Aempaquetar.id.toString()
    this.crear = true
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
  id: number;
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

export interface Opcion {
  nombre: string;
}