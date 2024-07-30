import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@app/services/dialog/dialog.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTable, MatTableModule,MatTableDataSource, } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';



import { ReporteincidenciaService } from '@app/services/reporteincidencia/reporteincidencia.service';
import { CommonModule } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import { style } from '@angular/animations';



@Component({
  selector: 'app-detallereporteincidencia',
  standalone:  true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule],
  templateUrl: './detallereporteincidencia.component.html',
  styleUrl: './detallereporteincidencia.component.scss'
})
export class DetallereporteincidenciaComponent implements OnInit {

 
  @Input()  ticketAEditar!: string;

fechaN=''
NumeroReporte=0
  
Datoos = new FormGroup({
  id: new FormControl(0),
  lugar: new FormControl(''),
  fecha: new FormControl(''),
  usuario: new FormControl(''),
  turno:new FormControl(0),
  incidencia:new FormControl(''),
  comentario:new FormControl(''),
});

constructor(
  private Reportes:ReporteincidenciaService
){
  
}

fechaReport:any;
horaReporte:any;

ngOnInit(): void {
  
  this.Reportes.traerUNReporte(Number(this.ticketAEditar)).forEach(reporte =>{
    
  
    this.fechaN =  reporte.fecha
    this.NumeroReporte = reporte.id

    this.fechaReport=this.fechaN.split('T',2)
    this.fechaReport=this.fechaReport[0].split('-').join('/')
    this.horaReporte= this.fechaN.split('T',2)
    this.horaReporte= this.horaReporte[1]

    this.Datoos?.get('id')?.setValue(reporte.id!)
    this.Datoos?.get('lugar')?.setValue(reporte.lugar!)
    this.Datoos?.get('usuario')?.setValue(reporte.usuario!)
    this.Datoos?.get('turno')?.setValue(reporte.turno!)
    this.Datoos?.get('incidencia')?.setValue(reporte.incidencia!)
    this.Datoos?.get('comentario')?.setValue(reporte.comentario!)
  })
}


nombrejefa= "María Dolores Rodríguez Ramírez";



async createPDF(){

  const pdfDefinition: any = {

    
    pageSize: 'A4',
    pageMargins: [20, 220, 20, 60],

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
      {text: 'SUBDIRECCIÓN DE ENFERMERÍA: '+this.nombrejefa, style: 'header'},
      {text: 'DEPARTAMENTO DE ENFERMERÍA', style: 'header'},
      {text: 'CENTRAL DE EQUIPOS Y ESTERILIZACIÓN', style: 'header'},
      {text: 'Fecha de Impresión: '+dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs', style: 'header3'},
      {text: 'REPORTE DE INCIDENCIA', style: 'header2'},
    ],

    content: [
      {
        alignment: 'Center',
        style:'textos',
        columns: [
          {
            text: 'Fecha:'
          },
          {
            text: this.fechaReport
          },
          {
            text: 'Hora:'
          },
          {
            text: this.horaReporte
          },
        ]
      },

      {
        alignment: 'Center',
        style:'textos',
        columns: [
          {
            text: 'Módulo:' 
          },
          {
            text: this.Datoos?.get('lugar')?.value!,
          },
          {
            text: 'Usuario:'
          },
          {
            text: this.Datoos?.get('usuario')?.value!,
          },
        ]
      },


      {
        alignment: 'Center',
        style:'textos',
        columns: [
          {
            text: 'Tipo de Incidencia:' 
          },
          {
            text: this.Datoos?.get('incidencia')?.value!,
          },
          {
            text: 'Turno:'
          },
          {
            text: this.Datoos?.get('turno')?.value!,
          },
        ]
      },
      
      {
        alignment: 'center',
        style:'textos2',
        text: 'Comentarios del reporte: ' + this.NumeroReporte,
      },
      {
        alignment: 'center',
        style:'textos3',
        text: this.Datoos?.get('comentario')?.value!,
      },
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
    textos:{
      margin: [0, 20, 0, 0],
    },
    textos2:{
      margin: [0, 40, 0, 0],
    },
    textos3:{
      margin: [0, 10, 0, 0],
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
  //pdf.download('Reporte Incidencia '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
  pdf.open();
  
}



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

