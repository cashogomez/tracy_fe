import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import 'moment/locale/es';


import { DynamicDialogService } from '@app/services/emergente/emergente.service';
import { from } from 'rxjs';
import { NotificationService } from '@app/services';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NgForm } from '@angular/forms';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import {Instrumento, InstrumentoRequest} from '@app/models/backend/instrumento';
import { InstrumentoService } from '@app/services/instrumento/instrumento.service';

import { Buffer } from "buffer";
import { response } from 'express';

@Component({
  selector: 'app-instrumental',
  standalone: false,
  templateUrl: './instrumental.component.html',
  styleUrl: './instrumental.component.scss'
})
export class InstrumentalComponent {
  nombrejefa= "María Dolores Rodríguez Ramírez";
  editarRegistro !: Instrumento;
  borrarRegistro !: Instrumento;
  verSegundaTabla = false;
  foto : string ="https://firebasestorage.googleapis.com/v0/b/tracy-nutricion.appspot.com/o/instrumento.png?alt=media&token=e73f04cf-b593-45da-ba73-202b5362fe63";
  codigos: string[]=[]
  permisos = [
    'completo' , 
    'funcional', 
    'prelavado',
  ];
  selectedRadio : string = '';
  is_completo : boolean = true;
  is_funcional : boolean = true;
  is_prelavado : boolean = false;
  instrumentos: Instrumento[] = [];
  temporal!: Instrumento;
  lista_familia: string[] = [];
  ELEMENT_DATA: any[] = [];
  /** Constants used to fill up our data base. */

EliminarElementoTabla(id: number) {
  this.dataSource.data = this.dataSource.data.filter((u) => u.id !== id);
  this.ELEMENT_DATA = this.dataSource.data;
  this.notification.success("¡El registro se borro exitosamente!");
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
    private dataService: DynamicDialogService,
    private instrumentoService : InstrumentoService, 
    
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        // Assign the data to the data source for the table to render
        
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

        // ****** Recibe datos ******
        this.dataService.data$.subscribe(data => {
          console.log(data);
          if (data==true) {
            if (this.borrarRegistro != undefined) {
              this.EliminarElementoTabla(this.borrarRegistro.id);
            }
            
          }
          else {
            this.notification.error("¡Se canceló la operación");
          }
        });

        

  }

  ngOnInit() {
    this.instrumentoService.traerinstrumentos().subscribe(datos => {
          this.instrumentos = datos;
          this.instrumentos.forEach((name, index) => {
            let indice = this.lista_familia.findIndex(u => u === name.familia);
            //console.log(indice)
            if (indice == -1) {
              this.lista_familia.push(name.familia);
              this.ELEMENT_DATA.push(name)
              
            }
          })
          this.dataSource.data = this.ELEMENT_DATA;
          console.log(this.lista_familia)
          console.log('********************************************');

    });
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
  dataSource: MatTableDataSource<Instrumento>;
// **********************************************************

  displayedColumns = ['id', 'Nombre', 'Tipo', 'Marca', 'Descripcion',  'Lote',  'Caducidad', 'Cantidad','accion' ];

  editarFila(element: Instrumento) {
    this.editarRegistro=element;
  }
  eliminarFila(element: Instrumento) {
    this.borrarRegistro=element;
  }
  crearInstrumento(valor: number) {
    if (valor === 1) {
      
    }
    switch(valor) { 
      case 1: { 
        this.verSegundaTabla = true;
        this.notification.success('Se puede crear el instrumento')
         //statements; 
         break; 
      } 
      case 2: { 

        this.notification.success('El instrumento ha sido creado')
        this.verSegundaTabla = false;
         //statements; 
         break; 
      } 
      case 3: { 
        this.verSegundaTabla = false;
        this.notification.error('Se canceló la creación del instrumento')
        //statements; 
        break; 
     } 
      default: { 
         //statements; 
         break; 
      } 
   } 
  }
  registrarInstrumento(form: NgForm){
    console.log('inicio');
    const userInstrumentoRequest: InstrumentoRequest = {
      nombre: form.value.Nombre,
      cantidad: form.value.Cantidad,
      tipo: form.value.Tipo,
      marca: form.value.Marca,
      uso: 0,
      lote: form.value.Lote,
      caducidad: form.value.Caducidad,
      foto: this.foto,
      descripcion: form.value.Descripcion,
      prelavado: this.is_prelavado,
      completo: this.is_completo,
      funcional : this.is_funcional,
      set: '',
      empaque: '',
      codigo_qr: '',
      familia: '',
      individuo: 0,
      created: Date.now.toString(),
      updated: Date.now.toString(),
    };
    userInstrumentoRequest.familia = Buffer.from(userInstrumentoRequest.nombre+
                                      userInstrumentoRequest.tipo+
                                      userInstrumentoRequest.marca+
                                      userInstrumentoRequest.descripcion).toString('base64')
    console.log(userInstrumentoRequest);
   
    this.generadorQR(userInstrumentoRequest.cantidad,userInstrumentoRequest );
    for (var i=0; i<userInstrumentoRequest.cantidad; i++) {
      userInstrumentoRequest.codigo_qr=this.codigos[i]
      userInstrumentoRequest.individuo = i                              

      this.instrumentoService.altainstrumento(userInstrumentoRequest).subscribe((response: Instrumento) => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log(response);
        this.instrumentoService.traerinstrumentos().subscribe(datos => {
          this.instrumentos = datos;
          this.instrumentos.forEach((name, index) => {
            let indice = this.lista_familia.findIndex(u => u === name.familia);
            //console.log(indice)
            if (indice == -1) {
              this.lista_familia.push(name.familia);
              this.ELEMENT_DATA.push(name)
              
            }
          })
          this.dataSource.data = this.ELEMENT_DATA;
          console.log(this.lista_familia)
          console.log('********************************************');

    });
        //this.temporal =JSON.parse(JSON.stringify(response))
        //this.instrumentos.push(response)
      });
    }
    //console.log(this.temporal);
    //this.ELEMENT_DATA.push(JSON.parse(JSON.stringify(this.temporal)))
    this.notification.success('El instrumento se registró exitosamente')
    this.codigos=[]
    form.reset();
    this.verSegundaTabla=false

  }
  onFilesChanged(urls: string | string[]): void {
    this.foto=urls[0];
  }
  generadorQR(valor: number, instrumento: InstrumentoRequest) {
    for (let i = 1; i < valor+1; i++) {
      this.codigos.push(Buffer.from(instrumento.nombre+instrumento.tipo+instrumento.marca+instrumento.descripcion).toString('base64')+','+i.toString())
    }
    console.log(this.codigos)
  }
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
        widths: ['15%','15%','15%','15%','10%','10%','10%', '10%'],
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
        {text: 'LISTADO DE INSTRUMENTAL', style: 'header2'},
       
        {
          style: 'tableExample', margin:[20,20,20,0],
          table: {
            widths: ['15%','15%','15%','15%','10%','10%','10%', '10%'],
            body: [
              ['id', 'nombre', 'tipo','marca',  'descripcion',  'lote', 'cantidad','caducidad'],
            ]
          },layout: 'noBorders'
        },
      ],

      content: [
        
         table(dataSource, ['id', 'nombre', 'tipo','marca',  'descripcion',  'lote', 'cantidad','caducidad'], ),
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
