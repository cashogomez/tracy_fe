import { Component, ViewChild } from '@angular/core';
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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DialogService } from '@app/services/dialog/dialog.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export interface TablaAñadir {
Nombre:string,
Fecha:string,
Hora:string,
Evento:String
Turno:string,
Operador:string;
}

export interface QR {
  QR:  string;
}
@Component({
  selector: 'app-historicoqr',
  standalone: true,
  imports: [ MatCheckboxModule,
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
    MatButtonModule,
  ],
  templateUrl: './historicoqr.component.html',
  styleUrl: './historicoqr.component.scss'
})
export class HistoricoqrComponent {

  Tabla1:  TablaAñadir[] = [

  ];



  QRnumber='';
  today: number = Date.now();
  fecha= this.today 
  displayedColumns: string[] = ['Nombre', 'Fecha', 'Hora', 'Evento', 'Turno', 'Operador'];
  dataSource = [...this.Tabla1];


  valueQR = '';
  ValorID="";
  Valorfch="";
  valorres="";

  @ViewChild('tabla1') table!: MatTable<TablaAñadir>;
  Subir() {
    //______________
    this.QRnumber= this.QR.get('QR')?.value!

    this.valueQR = this.QR.get('QR')?.value!
    
    var splitted = this.valueQR.split(".", 3)
    
    this.ValorID= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.Valorfch = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.valorres =  splitted[2]
    
    
      
        this.dataSource.push({
          Nombre: this.ValorID,
          Fecha: this.Valorfch,
          Hora: '',
          Evento: '',
          Turno: '',
          Operador: ''
        });
        this.table.renderRows();
        this.QR.value.QR=''
    

     
    }
      
    
      removeAt(index: number) {
        this.dataSource.splice(index, 1);
        this.table.renderRows();
      }

      QR = new FormGroup({
        QR:  new FormControl('')
      })


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
        });
      }
      Nombre='' ;
      Set='';
      preparacion='';
      caducidad='';
      codigo2='';

      async createPDF(){
     
        const pdfDefinition: any = {
        pageSize: {
        width: 196,
        height: 98,
        },
          pageMargins: [ 0, 25, 0, 0 ],
          pageOrientation: 'landscape',   
     
    
          header:[
         
          {text: 'INSTITUTO NACIONAL DE CIENCIAS MÉDICAS Y ', style: 'header2'},
          {text: 'NUTRICIÓN SALVADOR ZUBIRÁN', style: 'header'},
          ],
    
          content: [
          {text: 'Nombre:', style: 'titulo1'},
          {text: this.Nombre, style: 'titulo2'},
     
          {text: 'Set:', style: 'titulo1'},
          {text: this.Set, style: 'titulo2'},
          
          {text: 'Fecha de Preparación:', style: 'titulo1'},
          {text: this.preparacion, style: 'titulo2'},
    
    
          {text: 'Fecha de Caducidad:', style: 'titulo1'},
          {text: this.caducidad, style: 'titulo2'},
    
  
          { qr: this.QRnumber, fit: '70', eccLevel: 'L', position:'fixed', mode: 'octet',  margin: [48, -45, 0, 0],},
          {text: this.QRnumber, style: 'titulo3'},
        ],
        
      images:{
        
          
      },
        styles: {
    
          header: {
            fontSize: 6,
            bold: true,
            margin: [27, 2, 0, 0],
            alignment: "center",
            color: 'black',
            position:'fixed',
          },
          header2: {
            fontSize: 6,
            bold: true,
            margin: [27, 8, 0, 0],
            alignment: "center",
            color: 'black',
            position:'fixed',
          },
    
          titulo1: {
            fontSize: 4,
            bold: true,
            margin: [120, 6, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
    
           titulo2: {
            fontSize: 3.5,
            bold: false,
            margin: [120, 1, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
  
          titulo3: {
            fontSize: 3.0,
            bold: false,
            margin: [45, 2, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
     
        },
    
        }
          
        const pdf =  pdfMake.createPdf(pdfDefinition);
        pdf.print();
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
  
  const area = 'Almacén CEyE'
  const turno = 1;