import { Component, Inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

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
import { NgForm } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import {Instrumento} from '@app/models/backend/instrumento';

@Component({
  selector: 'app-instrumental',
  standalone: false,
  templateUrl: './instrumental.component.html',
  styleUrl: './instrumental.component.scss'
})
export class InstrumentalComponent {
  nombrejefa= "María Dolores Rodríguez Ramírez";
  editarRegistro !: Element;
  borrarRegistro !: Element;
  verSegundaTabla = false;
  foto : string ="/assets/generales/instrumento.png";
  permisos = [
    'completo' , 
    'funcional', 
    'prelavado',
  ];
  selectedRadio : string = '';
  is_completo : boolean = false;
  is_funcional : boolean = false;
  is_prelavado : boolean = false;

  /** Constants used to fill up our data base. */
 ELEMENT_DATA = [
  {id: 1, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false,  Descripcion:'pendiente', Cantidad:10},
  {id: 2, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 3, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 4, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 5, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 6, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 7, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 8, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 9, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 10, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},

  {id: 11, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 12, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 13, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 14, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 15, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 16, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 17, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 18, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 19, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 20, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},

  {id: 21, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 22, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente',Cantidad:10},
  {id: 23, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 24, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 25, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 26, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 27, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 28, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 29, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 30, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},

  {id: 31, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 32, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 33, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 34, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 35, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 36, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 37, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 38, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 39, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 40, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},

  {id: 41, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 42, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 43, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 44, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 45, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 46, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 47, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 48, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 49, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},
  {id: 50, Nombre: 'Pinza', Tipo:'Mayo', Lote:22, Marca:'Miltex', Foto:'Estenosis Aórtica', Caducidad:1, Prelavado: true, Completo: false, Funcional: false, Descripcion:'pendiente', Cantidad:10},

];

// EliminarElementoTabla(key: number) {
//   this.ELEMENT_DATA.forEach((value,index)=>{
//       if(value.id==key) this.ELEMENT_DATA.splice(index,1);
//   });
// } 
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
    
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

        // ****** Recibe datos ******
        this.dataService.data$.subscribe(data => {
          console.log(data);
          if (data==true) {
            console.log('Va bien');
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

  }
  radioButtonChange(data: MatRadioChange) {
    switch (this.selectedRadio)
    {
        case this.permisos[0]:
            this.is_completo = true;
            this.is_funcional = false;
            this.is_prelavado = false;
          break;
        case this.permisos[1]:
            this.is_completo  = false;
            this.is_funcional = true;
            this.is_prelavado = false;

          break;
          case this.permisos[2]:
            this.is_completo  = false;
            this.is_funcional = false;
            this.is_prelavado = true;

          break;
          case this.permisos[3]:
            this.is_completo  = false;
            this.is_funcional = false;
            this.is_prelavado = false;

          break;
      default:
          alert('Default case');
          break;
    }
    //console.log(this.selectedRadio)
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

  displayedColumns = ['id', 'Nombre', 'Tipo', 'Marca', 'Descripcion',  'Lote',  'Caducidad', 'Cantidad','accion' ];

  editarFila(element: Element) {
    this.editarRegistro=element;
  }
  eliminarFila(element: Element) {
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
  registrarUsuario(form: NgForm){
    const userInstrumentoRequest: Instrumento = {
      nombre: form.value.Nombre,
      tipo: form.value.Tipo,
      marca: form.value.Marca,
      cantidad: form.value.Descripcion,
      lote: form.value.Lote,
      caducidad: form.value.Caducidad,
      foto: this.foto,
      descripcion: form.value.Cantidad,
      prelavado: this.is_prelavado,
      completo: this.is_completo,
      funcional : this.is_funcional,
      set: '',
      empaque: '',
      created: Date.now.toString(),
      updated: Date.now.toString(),
    };
    form.reset();
  }
  onFilesChanged(urls: string | string[]): void {
    this.foto=urls[0];
  }
}

export interface Element {
  Nombre: string;
  id: number;
  Tipo: string;
  Lote: number;

  Marca: string;
  Foto: string;
  Caducidad: number;
  Prelavado: boolean;
  Completo: boolean;
  Funcional: boolean;
  Descripcion: string;
  Cantidad: number;
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
              ['id', 'Nombre', 'Tipo','Marca',  'Descripcion',  'Lote', 'Cantidad','Caducidad'],
            ]
          },layout: 'noBorders'
        },
      ],

      content: [
        
         table(dataSource, ['id', 'Nombre', 'Tipo','Marca',  'Descripcion',  'Lote', 'Cantidad','Caducidad'], ),
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
