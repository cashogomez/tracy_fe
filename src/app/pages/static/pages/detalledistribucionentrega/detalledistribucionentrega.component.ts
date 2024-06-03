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

export interface Distribucion_Entrega {
  FechaSolicitud: string;
  Solicitante: string;
  NumeroQR: string;
  Ubicacion: string;
}

export interface TablaAñadir2 {
  ID:any;
  Elemento: any;
  Cantidad:any;
  Entregados: any;

}



;

const date = new Date();const año = date.getFullYear();const mes = date.toLocaleString('default', { month: 'numeric' });const mes2 = date.toLocaleString('default', { month: 'long' });const dia = date.getDate(); const hora = date.getHours();const minutos = date.getMinutes();

@Component({
  selector: 'app-detalledistribucionentrega',
  standalone: true,
  imports: [
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
    MatButtonModule
  ],
  templateUrl: './detalledistribucionentrega.component.html',
  styleUrl: './detalledistribucionentrega.component.scss'
})
export class DetalledistribucionentregaComponent {
  Tabla1:  TablaAñadir2[] = [
    {ID:'001', Elemento: 'SET lamparoscopia', Cantidad:1, Entregados:0},
    {ID:'002', Elemento: 'SET lamparoscopia', Cantidad:1, Entregados:0},
    {ID:'003', Elemento: 'SET lamparoscopia', Cantidad:1, Entregados:0},
    {ID:'004', Elemento: 'SET lamparoscopia', Cantidad:1, Entregados:0},
    {ID:'005', Elemento: 'SET lamparoscopia', Cantidad:1, Entregados:0},
    
  ];


  Distribucion_Entrega = new FormGroup({
    FechaSolicitud:  new FormControl(''),
    Solicitante:  new FormControl(''),
    NumeroQR:  new FormControl(''),
    Ubicacion:   new FormControl(''),  
  });

  
  Distribucion_Entrega2 = new FormGroup({
    QR1:  new FormControl(''),
  });

  fecha = dia + '/' + mes + '/' + año
  today: number = Date.now();
  Ticket=1213;

  displayedColumns: string[] = ['ID', 'Elemento', 'Cantidad' , 'Entregados'];
  dataSource = [...this.Tabla1];


  valueQR1 = '';
  ValorID1="";
  Valorfch1="";
  valorres1="";
  cantidad2: any;
  estado=true;
  @ViewChild('tabla1') table1!: MatTable<TablaAñadir2>;
  

  constructor ( private dialogService: DialogService){}
  emergente3(){
    this.dialogService.ditribucion2emergente3()
  }

  Subir2() {
    
    var Cantidades = this.dataSource.map(data => data.Cantidad )
    var totalcantidades = Cantidades.reduce((a,b) => a+b )
     
     
    var entregados = this.dataSource.map(data => data.Entregados ) 

    var totalentregados = entregados.reduce((a,b) => a+b  ) 

    if(totalcantidades-1==totalentregados){
      this.estado=false
    }



    this.valueQR1 = this.Distribucion_Entrega2.get('QR1')?.value!

    var splitted = this.valueQR1.split(".", 3)
    
    this.ValorID1= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
 
    this.Valorfch1 = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.valorres1 =  splitted[2]
    
    
        let comparable = this.dataSource.filter((IDcomp) => IDcomp.ID.replace(/\n|\r/g, "") == this.ValorID1.replace(/\n|\r/g, ""))
   
        if (comparable.length > 0 ){
          let num = 0;
          this.dataSource.forEach(data =>{
            if (data.ID.replace(/\n|\r/g, "")  == this.ValorID1.replace(/\n|\r/g, "") && data.Entregados < data.Cantidad ) {
              this.dataSource[num].Entregados = this.dataSource[num].Entregados+1
            }
           
            num++
          })
    
           //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
       
           this.Distribucion_Entrega2.value.QR1=''
        
      }

      else{
        this.dataSource.push({
          ID: this.ValorID1,
          Elemento: 'set1',
          Entregados: this.cantidad2,
          Cantidad: undefined
        });
        this.table1.renderRows();
    
      this.Distribucion_Entrega2.value.QR1=''
      }
    }


  
  emergente1(){
    this.dialogService.emergente1()
  }

}
