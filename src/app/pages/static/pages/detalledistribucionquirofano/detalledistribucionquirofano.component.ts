import { Component, ViewChild } from '@angular/core';
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
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Distribucion_1 {
  FechaCirugia: string;
  CirugíaProgramada: string;
  Sala: string;
  AreaRegistro:  string;
  Turno: String;
  Enfermera:  string;
  NotasAdd: string;
  QR1:  string;
}

export interface Distribucion_2 {
QR: string;
}

export interface TablaAñadir2 {
ID:any;
Elemento: any;
Cantidad:any;
Entregados: any;

}


export interface TablaAñadir {
  ID:any;
  Elemento: any;
  Entregados: any;

}

const Tabla2: TablaAñadir[] = [

];

const date = new Date();const año = date.getFullYear();const mes = date.toLocaleString('default', { month: 'numeric' });const mes2 = date.toLocaleString('default', { month: 'long' });const dia = date.getDate(); const hora = date.getHours();const minutos = date.getMinutes();



@Component({
  selector: 'app-detalledistribucionquirofano',
  templateUrl: './detalledistribucionquirofano.component.html',
  styleUrl: './detalledistribucionquirofano.component.scss',
  standalone:true,
  imports:[
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
    MatButtonModule,
    MatDialogModule,
  ]
})
export class DetalledistribucionquirofanoComponent {
  Tabla1:  TablaAñadir2[] = [
    {ID:'001', Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:0},
    {ID:'002', Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:0},
    {ID:'003', Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:0},
    {ID:'004', Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:0},
    {ID:'005', Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:0},
    
  ];

fecha = dia + '/' + mes + '/' + año
  Ticket=1213;
  displayedColumns1: string[] = ['ID','Elemento', 'Cantidad', 'Entregados'];
  dataSource1 = [...this.Tabla1];


  displayedColumns2: string[] = ['ID', 'Elemento', 'Entregados', 'Accion'];
  dataSource2 = [...Tabla2];

  Distribucion_1 = new FormGroup({
    FechaCirugia: new FormControl(''),
    CirugíaProgramada: new FormControl(''),
    Sala: new FormControl(''),
    AreaRegistro: new FormControl(''),
    Turno: new FormControl(''),
    Enfermera:  new FormControl(''),
    NotasAdd: new FormControl(''),
    QR1:  new FormControl(''),
  });

  
  Distribucion_2 = new FormGroup({
    QR:  new FormControl(''),
     
  });

  

  constructor ( private dialogService: DialogService){}

  emergente1(){
    this.dialogService.ditribucion1emergente()
  }
  emergente2(){
  this.dialogService.ditribucion2emergente()
  }




  submitted() {
    
    window.alert(JSON.stringify(this.Distribucion_1.value, null, 2));
  }


  valueQR1 = '';
  ValorID1="";
  Valorfch1="";
  valorres1="";


  valueQR = '';
  ValorID="";
  Valorfch="";
  valorres="";


  @ViewChild('tabla1') table1!: MatTable<TablaAñadir2>;

  @ViewChild('tabla2') table!: MatTable<TablaAñadir>;
  cantidad1=1;
  cantidad2=1;
  estado = false
  estado2 =true

  Subir2() {
    var Cantidades = this.dataSource1.map(data => data.Cantidad )
    var totalcantidades = Cantidades.reduce((a,b) => a+b )
     
     
    var entregados = this.dataSource1.map(data => data.Entregados ) 

    var totalentregados = entregados.reduce((a,b) => a+b  ) 

    if(totalcantidades-1==totalentregados){
      this.estado=true
      this.estado2=false
    }

    this.valueQR1 = this.Distribucion_1.get('QR1')?.value!

    var splitted = this.valueQR1.split(".", 3)
    
    this.ValorID1= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
 
    this.Valorfch1 = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.valorres1 =  splitted[2]
    
    
        let comparable = this.dataSource1.filter((IDcomp) => IDcomp.ID.replace(/\n|\r/g, "") == this.ValorID1.replace(/\n|\r/g, ""))
     
        if (comparable.length > 0 ){
          let num = 0;
          this.dataSource1.forEach(data =>{
            if (data.ID.replace(/\n|\r/g, "")  == this.ValorID1.replace(/\n|\r/g, "") && data.Entregados < data.Cantidad ) {
              this.dataSource1[num].Entregados = this.dataSource1[num].Entregados+1
            }
           
            num++
          })
    
           //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
       
           this.Distribucion_1.value.QR1=''
        
      }

      else{
        this.dataSource1.push({
          ID: this.ValorID1,
          Elemento: 'set1',
          Entregados: this.cantidad2,
          Cantidad: undefined
        });
        this.table1.renderRows();
    
      this.Distribucion_2.value.QR=''
      }
    }



  Subir() {
//______________

this.valueQR = this.Distribucion_2.get('QR')?.value!

var splitted = this.valueQR.split(".", 3)

this.ValorID= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 

this.Valorfch = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 

this.valorres =  splitted[2]


    let comparable = this.dataSource2.filter((IDcomp) => IDcomp.ID == this.ValorID)

    if (comparable.length > 0 ){
      let num = 0;
      this.dataSource2.forEach(data =>{
        if (data.ID == this.ValorID) {
          this.dataSource2[num].Entregados = this.dataSource2[num].Entregados+1
        }
        num++
      })

       //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1

       this.Distribucion_2.value.QR=''
    }

    else{
    this.dataSource2.push({
      ID: this.ValorID,
      Elemento:'set1',
      Entregados: this.cantidad2,
    });
    this.table.renderRows();

  this.Distribucion_2.value.QR=''
  }
}
  

  removeAt(index: number) {
    this.dataSource2.splice(index, 1);
    this.table.renderRows();
  }



}
