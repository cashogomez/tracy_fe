import { DatePipe } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { DynamicDialogService } from '@app/services/emergente/emergente.service';
import { TicketService } from '@app/services/ticket/ticket.service';
import 'moment/locale/es';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-distribucionquirofano',
  standalone: false,
  templateUrl: './distribucionquirofano.component.html',
  styleUrl: './distribucionquirofano.component.scss'
})
export class DistribucionquirofanoComponent {
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
nuevoP =''
  constructor(private notification: NotificationService,
    private router:Router,
    private _adapter: DateAdapter<any>,
    private ticketService: TicketService,
    private dataService: DynamicDialogService,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) { // Assign the data to the data source for the table to render
   



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
    this.router.navigate(['/static/detalledistribucionquirofano'])
  }

  ngOnInit() {
    this.updateCloseButtonLabel('Cerrar Calendario');


    this.ticketService.traertickets().subscribe(ticketsRecibidos => {
        
      ticketsRecibidos.forEach((ticket) => {
        if (ticket.prioridad == 1){
          this.nuevoP = 'baja'
        }
        if (ticket.prioridad == 2){
          this.nuevoP = 'media'
        }
        if (ticket.prioridad == 3){
          this.nuevoP = 'alta'
        }
        let elementoAgregar = {
          id: ticket.id,
          Fecha:new Date(ticket.fecha_cirugia),
          Ticket: ticket.id,
          Paciente: ticket.paciente,
          Edad: ticket.edad,
          Diagnostico: ticket.diagnostico,
          Cirugia: ticket.cirugia,
          Sala: ticket.sala,
          Turno: ticket.turno,
          Estatus: ticket.estatus,
          Prioridad: this.nuevoP
          
        

        }
        
        
      
          

    console.log (ticket.id +'   '+ticket.prioridad)
        this.ELEMENT_DATA.push(elementoAgregar)
      })
      this.dataSource.data = this.ELEMENT_DATA
    })
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

  displayedColumns = ['prioridad', 'ticket', 'cirugia', 'fecha',  'sala', 'turno', 'estatus', 'accion' ];



  editar: boolean = false;
  ticketAEditar: string = '';

  editarFila(element: Element) {
    this.editarRegistro=element;
    this.editar = true;
    this.ticketAEditar = element.Ticket.toString();
    //console.log(this.ticketAEditar);   
  }

  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }


}

export interface Element {
Prioridad: string;
Ticket: number;
Cirugia: string;
Fecha: string;
Sala: number;
Turno: number;
}

// ****************************   Impresion ***********************+
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
        widths: ['17%','17%','19%','17%','17%','13%','13%',],
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
      {text: 'DISTRIBUCIÓN MATERIAL DE QUIRÓFANO', style: 'header2'},
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


      {
        style: 'tableExample', margin:[20,20,20,0],
        table: {
          widths: ['17%','17%','19%','17%','17%','13%','13%',],
          body: [
            ['Prioridad', 'Ticket', 'Tipo de Cirugia', 'Fecha de Cirugía', 'Sala', 'Turno'],
          ]
        },layout: 'noBorders'
      },

      
    ],

    content: [
      
       table(dataSource, ['Prioridad', 'Ticket', 'Cirugia', 'Fecha', 'Sala', 'Turno'], ),
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
  //pdf.download('Reporte Almacén General '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
pdf.open()
  
}


