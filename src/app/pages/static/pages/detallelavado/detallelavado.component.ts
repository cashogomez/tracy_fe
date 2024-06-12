import { Component } from '@angular/core';
import { DialogService } from '@app/services/dialog/dialog.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const date = new Date();const año = date.getFullYear();const mes = date.toLocaleString('default', { month: 'short' });const mes2 = date.toLocaleString('default', { month: 'long' });const dia = date.getDate(); const hora = date.getHours();const minutos = date.getMinutes();

const fechaA =dia +'/'+ ('0' + (date.getMonth() + 1)).slice(-2)  +'/'+ año ;

const Tabla1= [
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
];

const Tabla2= [  
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
 
];

const Tabla3= [
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
  {Nombre:'Pinza 20 CM', Cantidad:'1'},
 
];


export interface lavado{
  ciclo1:string;
  ciclo2:string;
  ciclo3:string;
}


function buildTableBody(data: { [x: string]: { toString: () => any; }; }[], columns: (string | number)[]) {
  var body:any = [];


  data.forEach(function(row: { [x: string]: { toString: () => any; }; }) {
      var dataRow: any[] = [];

      columns.forEach(function(column: string | number) {
        dataRow.push({text : row[column].toString(), alignment : 'left', color : 'black', bold:false, fontSize: 9, margin: [20, 10, 0, 0]});
      })

      body.push(dataRow, );
  });

  return body;
}

function table(data: { [x: string]: { toString: () => any; }; }[] | { name: string; age: number; }[], columns: (string | number)[]) {
  return {
    style: 'tableExample',
      table: {
        widths: ['50%','50%'],
          body: buildTableBody(data, columns),
      },layout: 'noBorders'
    
  };
}





function buildTableBody2(data: { [x: string]: { toString: () => any; }; }[], columns: (string | number)[]) {
  var body: any = [];


  data.forEach(function(row: { [x: string]: { toString: () => any; }; }) {
      var dataRow: any[] = [];

      columns.forEach(function(column: string | number) {
        dataRow.push({text : row[column].toString(), alignment : 'left', color : 'black', bold:false, fontSize: 9, margin: [-2, 10, 0, 0]});
      })

      body.push(dataRow, );
  });

  return body;
}

function table2(data: { [x: string]: { toString: () => any; }; }[] | { name: string; age: number; }[], columns: (string | number)[]) {
  return {
    style: 'tableExample',
      table: {
widths:['100%'],
          body: buildTableBody2(data, columns),
      },layout: 'noBorders'
    
  };
}

@Component({
  selector: 'app-detallelavado',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule ,
    ReactiveFormsModule,
  ],
  templateUrl: './detallelavado.component.html',
  styleUrl: './detallelavado.component.scss'
})
export class DetallelavadoComponent {


  VOF1: boolean = false;
  VOF2: boolean = true;

  VOF3: boolean = false;
  VOF4: boolean = true;

  VOF5: boolean = false;
  VOF6: boolean = true;

  constructor ( private dialogService: DialogService){}

  emergente1(){
   this.dialogService.emergente1()
  }


  







  displayedColumns1: string[] = ['Nombre','Cantidad', 'icon'];
  dataSource1 = Tabla1;

  displayedColumns2: string[] = ['Nombre','Cantidad', 'icon'];
  dataSource2 = Tabla2;

  displayedColumns3: string[] = ['Nombre','Cantidad', 'icon'];
  dataSource3 = Tabla3;
  Tiempo= 10;




  numciclo=10;
  value1:any=10;

  value2=10;

  value3=10;
  
  interval:any;



  bloquear1: boolean = false;
  
  hacerSubmit1() {

    this.bloquear1 = true;

    setTimeout( () => {
      // despues de 2 segundos se volverá a habilitar
      this.bloquear1 = false;
    }, 10000);

  }



  bloquear2: boolean = false;
  
  hacerSubmit2() {

    this.bloquear2 = true;

    setTimeout( () => {
      // despues de 2 segundos se volverá a habilitar
      this.bloquear2 = false;
    }, 10000);

  }


  bloquear3: boolean = false;
  
  hacerSubmit3() {

    this.bloquear3 = true;

    setTimeout( () => {
      // despues de 2 segundos se volverá a habilitar
      this.bloquear3 = false;
    }, 10000);

  }


//-----------------------------------------------------------------------------------------------

  display: any =10;
  public timerInterval: any;


  

     



  start() {
    this.timer(this.display);
  }
  stop() {
    clearInterval(this.timerInterval);
  }

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }


//-------------------------------------------------------------------------------------------------



display2: any =10;
public timerInterval2: any;



start2() {
  this.timer2(this.display2);
}
stop2() {
  clearInterval(this.timerInterval2);
}

timer2(minute: number) {
  // let minute = 1;
  let seconds: number = minute * 60;
  let textSec: any = '0';
  let statSec: number = 60;

  const prefix = minute < 10 ? '0' : '';

  this.timerInterval2 = setInterval(() => {
    seconds--;
    if (statSec != 0) statSec--;
    else statSec = 59;

    if (statSec < 10) {
      textSec = '0' + statSec;
    } else textSec = statSec;

    this.display2 = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

    if (seconds == 0) {
      console.log('finished');
      clearInterval(this.timerInterval2);
    }
  }, 1000);
}


//-------------------------------------------------------------------------------------------------


display3: any =10;
public timerInterval3: any;



start3() {
  this.timer3(this.display3);
}
stop3() {
  clearInterval(this.timerInterval3);
}

timer3(minute: number) {
  // let minute = 1;
  let seconds: number = minute * 60;
  let textSec: any = '0';
  let statSec: number = 60;

  const prefix = minute < 10 ? '0' : '';

  this.timerInterval3 = setInterval(() => {
    seconds--;
    if (statSec != 0) statSec--;
    else statSec = 59;

    if (statSec < 10) {
      textSec = '0' + statSec;
    } else textSec = statSec;

    this.display3 = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

    if (seconds == 0) {
      console.log('finished');
      clearInterval(this.timerInterval3);
    }
  }, 1000);
}


//-------------------------------------------------------------------------------------------------
lavado = new FormGroup({
  ciclo1: new FormControl(''),
  ciclo2: new FormControl(''),
  ciclo3: new FormControl(''),
});
btnActivate(ionicButton:any) {
  if(ionicButton._color === 'accent')
    ionicButton.color =  'warn';
  else
    ionicButton.color = 'accent';
}



submitted() {
  
}






nombrejefa= "María Dolores Rodríguez Ramírez";
marca = "BTM";
modelo = "STERIVAP";
numSerie = "23412341234";
tipoCiclo = "Universal";
tiempoCiclo = "10";
fechaInicio = "10/10/2024";
horaInicio = "10:50";
nombreOperador = "Hugo Rodriguez";



getBase64ImageFromURL(url: string) {
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

  async createPDF2(){

  const pdfDefinition: any = {

    
    pageSize: 'LETTER',
    pageMargins: [140, 450, 30, 0],

    background: [
      {
        "image":"logo",
          width: 90,
          margin:[30,35,0,0]
      },

      {
        "image":"logo",
          width: 550,
          margin:[30,80,0,0],
          opacity: 0.1
      }
    ],


    header:[
   
      {text: 'INSTITUTO NACIONAL DE CIENCIAS MÉDICAS Y NUTRICIÓN SALVADOR ZUBIRÁN', style: 'header2'},
      {text: 'SUBDIRECCIÓN DE ENFERMERÍA: '+this.nombrejefa, style: 'header'},
      {text: 'DEPARTAMENTO DE ENFERMERÍA', style: 'header'},
      {text: 'CENTRAL DE EQUIPOS Y ESTERILIZACIÓN', style: 'header'},
      {text: 'Fecha de Impresión: '+dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs', style: 'header3'},
      {text: 'BITÁCORA DE LAVADO AUTOMÁTICO', style: 'header2'},
      
      {text: 'DATOS DE LAVADORA',style: 'content0'},
      {text: 'Marca:',style: 'content1'},
      {text: 'Modelo:',style: 'content2'},  
      {text: 'Número de serie:',style: 'content3'},
      {text: ' '+this.marca,style: 'content1b'},
      {text: ' '+this.modelo  ,style: 'content2b'},  
      {text: ' '+this.numSerie,style: 'content3b'},
    
      {text: 'Tipo de ciclo:',style: 'content1'},
      {text: 'Tiempo de Ciclo:',style: 'content2'},
      {text: ' '+this.tipoCiclo,style: 'content1b'},
      {text: ' '+this.tiempoCiclo  ,style: 'content2b'},

      {text: 'RESPONSABLE DE LAVADO',style: 'content0'},
      {text: 'Fecha:',style: 'content1'},
      {text: 'Hora:',style: 'content2'},  
      {text: 'Nombre operador:',style: 'content3'},
      {text: 'Firma operador:',style: 'content4'},
      {text: ' '+fechaA ,style: 'content1b'},
      {text: ' '+this.horaInicio ,style: 'content2b'},
      {text: ' '+this.nombreOperador,style: 'content3b'},
      
      

      {text: 'MATERIALES LAVADOS ', style: 'header2'},


      
      {
        style: 'tableExample', margin:[178,20,20,0],
        table: {
          widths: ['50%', '50%'],
          body: [
            ['Instrumental', 'Cantidad'],
          ]
        },layout: 'noBorders'
      },

    ],

    content: [
      //----Datos de la bitacora}
    
      
    
      
      

      


// LINO    
//la tabla solo es el nombre del material ------   crees que se podria poner los renglones...*
       table(this.dataSource1, ['Nombre','Cantidad',], ),
  ],
  
images:{
  
  "logo" : await this.getBase64ImageFromURL(
    "../../assets/generales/Logo_nutricion.png")
    
},
  styles: {

    header: {
      fontSize: 11,
      bold: true,
      margin: [40, 7, 10, 0],
      alignment: "center",
      color: 'black',
      position:'fixed',
    },
    header2: {
      fontSize: 11,
      bold: true,
      margin: [0, 40, -20, 0],
      alignment: "center",
      color: 'black',
      position:'fixed',
     
    },
    header3: {
      fontSize: 11,
      bold: true,
      margin: [0, 27, 40, 0],
      alignment: "right",
      color: 'black',
      position:'fixed',
    },
    content0: {
      fontSize: 11,
      bold: true,
      margin: [70, 15, 0,0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },
    content1: {
      fontSize: 11,
      bold: true,
      margin: [40, 1, 0, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },
    content2: {
      fontSize: 11,
      bold: true,
      margin: [130, -12, 0, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },
    content3: {
      fontSize: 11,
      bold: true,
      margin: [200, -12, 0, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },
    content4: {
      fontSize: 11,
      bold: true,
      margin: [320, -12, 0, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },

    content1b: {
      fontSize: 11,
      bold: false,
      margin: [40, 0, 20, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },
    content2b: {
      fontSize: 11,
      bold: false,
      margin: [130, -12, 0, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },
    content3b: {
      fontSize: 11,
      bold: false,
      margin: [200, -12, 0, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },
    content4b: {
      fontSize: 11,
      bold: false,
      margin: [320, -12, 0, 0],
      alignment: "left",
      color: 'black',
      position:'fixed',
    },













    
    footer: {
      fontSize: 10,
      margin: [0, 0, 0, 0],
      alignment: "center",
      color: 'black',
      position:'fixed',
    },
    tableExample: {
      fontSize: 11,
      bold: true,
      margin: [20, -15, 0, 0],
      alignment : 'left',
      color: 'black'
    },
  
  },
  
  footer:[
    
    {text: 'TRACY © '+año, style: 'footer'},
  ]
  }
    
  

  const pdf =  pdfMake.createPdf(pdfDefinition);
  pdf.download('Bitacora Lavado Automatico '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');

  
}



  pruebaBiologica = "1234123"
  lote = "q4343";
  modeloprueba = "34234234";
  fechaFabricacion = "10/02/2023";
  fechaCaducidad = "10/02/2025";
  resultado = "NEGATIVO";
  numCarga = "1232323";
  numCicloDiario = "111";
  fechaFin = "10/10/2024";
  horaFin = "10:50";
  nombreOperadorFin = "Hugo Rodriguez";
  async createPDF(){
 
    const pdfDefinition: any = {

      
      pageSize: 'LETTER',
      pageMargins: [10, 455, 30, 60],

      background: [
        {
          "image":"logo",
            width: 90,
            margin:[30,35,0,0]
        },

        {
          "image":"logo",
            width: 550,
            margin:[30,80,0,0],
            opacity: 0.1
        }
      ],


      header:[
     
        {text: 'INSTITUTO NACIONAL DE CIENCIAS MÉDICAS Y NUTRICIÓN SALVADOR ZUBIRÁN', style: 'header2'},
        {text: 'SUBDIRECCIÓN DE ENFERMERÍA: '+this.nombrejefa, style: 'header'},
        {text: 'DEPARTAMENTO DE ENFERMERÍA', style: 'header'},
        {text: 'CENTRAL DE EQUIPOS Y ESTERILIZACIÓN', style: 'header'},
        {text: 'Fecha de Impresión: '+dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs', style: 'header3'},
        {text: 'BITÁCORA DE LAVADO MANUAL', style: 'header2'},
        
        {text: 'DATOS DE LAVADORA',style: 'content0'},
        {text: 'Marca:',style: 'content1'},
        {text: 'Modelo:',style: 'content2'},  
        {text: 'Número de serie:',style: 'content3'},
        {text: ' '+this.marca,style: 'content1b'},
        {text: ' '+this.modelo  ,style: 'content2b'},  
        {text: ' '+this.numSerie,style: 'content3b'},
      
        {text: 'Tipo de ciclo:',style: 'content1'},
        {text: 'Tiempo de Ciclo:',style: 'content2'},
        {text: ' '+this.tipoCiclo,style: 'content1b'},
        {text: ' '+this.tiempoCiclo  ,style: 'content2b'},

        {text: 'RESPONSABLE DE LAVADO',style: 'content0'},
        {text: 'Fecha:',style: 'content1'},
        {text: 'Hora:',style: 'content2'},  
        {text: 'Nombre operador:',style: 'content3'},
        {text: 'Firma operador:',style: 'content4'},
        {text: ' '+fechaA ,style: 'content1b'},
        {text: ' '+this.horaInicio ,style: 'content2b'},
        {text: ' '+this.nombreOperador,style: 'content3b'},
        
        

        {text: 'MATERIALES LAVADOS ', style: 'header2'},
        
     
        {
          style: 'tableExample', margin:[30,20,30,0],
          table: {
            widths: ['15%','12%','12%','12%','12%','12%','12%','12%',],
            body: [
              ['Instrumental\nNombre', 'Dilución:\nSi/No', 'Pre-remojo:\nSi/No', 'Cepillado:\nSi/No', 'Enjuage:\nSi/No', 'Secado:\nSi/No','Sopleteado:\nSi/No','Inspeccion:\nSi/No'],
            ]
          },layout: 'noBorders'
        },
 
        
      ],

      content: [
        //----Datos de la bitacora}
   
        
        table(this.dataSource1, ['Nombre'], ),
        


// LINO    
//la tabla solo es el nombre del material ------   crees que se podria poner los renglones...*

    ],
    
  images:{
    
    "logo" : await this.getBase64ImageFromURL(
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
        margin: [40, 40, 0, 0],
        alignment: "center",
        color: 'black',
        position:'fixed',
       
      },
      header3: {
        fontSize: 11,
        bold: true,
        margin: [0, 27, 40, 0],
        alignment: "right",
        color: 'black',
        position:'fixed',
      },
      content0: {
        fontSize: 11,
        bold: true,
        margin: [70, 15, 0,0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content1: {
        fontSize: 11,
        bold: true,
        margin: [40, 1, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content2: {
        fontSize: 11,
        bold: true,
        margin: [130, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content3: {
        fontSize: 11,
        bold: true,
        margin: [200, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content4: {
        fontSize: 11,
        bold: true,
        margin: [320, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_1: {
        fontSize: 11,
        bold: false,
        margin: [40, 1, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_2: {
        fontSize: 11,
        bold: false,
        margin: [140, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_3: {
        fontSize: 10,
        bold: false,
        margin: [190, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_4: {
        fontSize: 10,
        bold: false,
        margin: [260, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_5: {
        fontSize: 10,
        bold: false,
        margin: [320, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_6: {
        fontSize: 10,
        bold: false,
        margin: [380, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_7: {
        fontSize: 10,
        bold: false,
        margin: [430, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content_8: {
        fontSize: 10,
        bold: false,
        margin: [490, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },








      content1b: {
        fontSize: 11,
        bold: false,
        margin: [40, 0, 20, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content2b: {
        fontSize: 11,
        bold: false,
        margin: [130, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content3b: {
        fontSize: 11,
        bold: false,
        margin: [200, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },
      content4b: {
        fontSize: 11,
        bold: false,
        margin: [320, -12, 0, 0],
        alignment: "left",
        color: 'black',
        position:'fixed',
      },













      
      footer: {
        fontSize: 10,
        margin: [0, 0, 0, 0],
        alignment: "center",
        color: 'black',
        position:'fixed',
      },
      tableExample: {
        fontSize: 11,
        bold: true,
        margin: [2, 0, 0, 0],
        alignment : 'left',
        color: 'black'
      },
    
    },
    
    footer:[
      
      {text: 'TRACY © '+año, style: 'footer'},
    ]
    }
      
    
 
    const pdf =  pdfMake.createPdf(pdfDefinition);
    pdf.download('Bitacora Lavado manual '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');

    
  }


}