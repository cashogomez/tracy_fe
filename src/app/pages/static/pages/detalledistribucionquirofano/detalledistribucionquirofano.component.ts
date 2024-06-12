import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@app/services/dialog/dialog.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';
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
import { TicketService } from '@app/services/ticket/ticket.service';

import { CommonModule } from '@angular/common';
import { UserResponse } from '@app/store/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';


import { SetService } from '@app/services/set/set.service';

//--------------------pedir tablas set info --------------------------
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
//--------------------pedir tablas set info --------------------------

//--------------------pedir tablas set info --------------------------
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';
import { InstrumentoService } from '@app/services/instrumento/instrumento.service';

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

export interface PeriodicElement {
  ID: string;
  Elemento: string;
  Cantidad: number;
  Descripcion: string;
  Tipo: string;
}

const date = new Date();const año = date.getFullYear();const mes = date.toLocaleString('default', { month: 'numeric' });const mes2 = date.toLocaleString('default', { month: 'long' });const dia = date.getDate(); const hora = date.getHours();const minutos = date.getMinutes();

const fechaA =dia +'/'+ ('0' + (date.getMonth() + 1)).slice(-2)  +'/'+ año ;

@Component({
  selector: 'app-detalledistribucionquirofano',
  templateUrl: './detalledistribucionquirofano.component.html',
  styleUrl: './detalledistribucionquirofano.component.scss',
  standalone:true,
  imports:[
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
    MatButtonModule,
    MatDialogModule,
  ]
})





export class DetalledistribucionquirofanoComponent implements OnInit{
  @Input()  ticketAEditar!: string;
  Tabla1:  TablaAñadir2[] = [ ];
  Tabla2: PeriodicElement[] = [];
  

fecha = fechaA
fechaN:any;
  ticketC:any;
  displayedColumns1: string[] = ['ID','Elemento', 'Cantidad', 'Entregados'];
  dataSource1 = [...this.Tabla1];


  displayedColumns2: string[] = ['ID', 'Elemento', 'Cantidad', 'Accion'];
  dataSource2 = [...this.Tabla2];


  
  Distribucion_2 = new FormGroup({
    QR:  new FormControl(''),
     
  });

  

  constructor ( private dialogService: DialogService,

    private fb: FormBuilder,
    private ticketService: TicketService,
    private ticketServicio: TicketService,
    private store: Store<fromRoot.State>, 

    //--------------------pedir tablas set info --------------------------

   //--------------------traer tablas set info --------------------------
   private Settraer: TicketsetService,
   //--------------------traer tablas set info --------------------------

   //--------------------traer tablas Inst info --------------------------
   private Insttraer: TicketinstrumentoService,
   //--------------------traer tablas Inst info --------------------------
    



    //--------------------traer tablas Inst info --------------------------
   private setElement: SetService,
   private instElement:InstrumentoService,
   //--------------------traer tablas Inst info --------------------------
  ){


  }


  formaEdicion!: FormGroup<TicketForma>;

  ngOnInit(): void {

    this.recargar();
    let ticket = Number(this.ticketAEditar)
    // Assign the data to the data source for the table to render
this.ticketServicio.traerUNticket(ticket).subscribe(data => {
  
        let elementoAgregar = {
          id: data.id,
          Fecha: data.fecha_cirugia,
          Ticket: data.id,
          Paciente: data.paciente,
          Edad: data.edad,
          Diagnostico: data.diagnostico,
          Cirugia: data.cirugia,
          Sala: data.sala,
          Turno: data.turno,
          Estatus: data.estatus,

          
        }
       
        this.formaEdicion?.get('FechaCirugia')?.setValue(data.fecha_cirugia!)
        this.formaEdicion?.get('CirugíaProgramada')?.setValue(data.cirugia!)
        this.formaEdicion?.get('NotasAdd')?.setValue(data.notas!)
        this.formaEdicion?.get('Sala')?.setValue(data.sala.toString()!)
        this.formaEdicion?.get('AreaRegistro')?.setValue(data.area_registro!)
        this.formaEdicion?.get('Turno')?.setValue(data.turno.toString()!)
        this.formaEdicion?.get('Enfermera')?.setValue(data.enfermero!)
        this.ticketC = data.id;
        this.fechaN = data.fecha_cirugia
      })
    
//__________________________-----------------------------------------------__________________________________________----------------------------------------
      this.Settraer.traerticketset(ticket).subscribe(setRecibidos=> {
        setRecibidos.forEach((set)=>{
          let setAgregar ={

            ID:set.set.id,
            Elemento: set.set.nombre,
            Cantidad: set.cantidad,
            Entregados: 0,
          }
          this.Tabla1.push(setAgregar)
        })

      })
    
      this.Insttraer.traerticketinstrumento(ticket).subscribe(InstRecibidos=> {
        InstRecibidos.forEach((inst)=>{
          let instAgregar ={
            ID:inst.instrumento.id,
            Elemento: inst.instrumento.nombre,
            Cantidad:inst.cantidad,
            Entregados: 0,
          }
          this.Tabla1.push(instAgregar)
        })
        this.dataSource1 = this.Tabla1
      })
//__________________________-----------------------------------------------__________________________________________----------------------------------------
      
    


  this.formaEdicion = this.fb.nonNullable.group({

    FechaCirugia: [''],
    CirugíaProgramada: [''],
    Sala: [''],
    AreaRegistro: [''],
    Turno: [''],
    Enfermera:  [''],
    NotasAdd: [''],
    QR1: [''],
 });

  }

  usuario: UserResponse | null = null;
  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));  
        console.log(this.usuario) 
    });
  }

  emergente1(){
    this.dialogService.ditribucion1emergente()
  }
  emergente2(){
  this.dialogService.ditribucion2emergente()
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

    this.valueQR1 = this.formaEdicion.get('QR1')?.value!

    var splitted = this.valueQR1.split(".", 3)
    
    this.ValorID1= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
 
    this.Valorfch1 = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.valorres1 =  splitted[2]
    
    
        let comparable = this.dataSource1.filter((IDcomp) => IDcomp.ID == this.ValorID1)
     
        if (comparable.length > 0 ){
          let num = 0;
          this.dataSource1.forEach(data =>{
            if (data.ID  == this.ValorID1&& data.Entregados < data.Cantidad ) {
              this.dataSource1[num].Entregados = this.dataSource1[num].Entregados+1
            }
           
            num++
          })
    
           //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
       
        
      }

      
      this.formaEdicion.value.QR1=''
  
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
                this.dataSource2[num].Cantidad = this.dataSource2[num].Cantidad+1
              }
              num++
            })
      
             //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
      
             this.Distribucion_2.value.QR=''
          }
      
          else{
            var tickets = Number(this.ValorID)
            this.setElement.traerUNset(tickets).subscribe(setRecibidos=> {
        
                let setAgregar ={
                  ID: setRecibidos.id.toString(),
                  Elemento: setRecibidos.nombre,
                  Cantidad: 1,
                  Descripcion: '',
                  Tipo: '',
              

                }
                this.dataSource2.push(setAgregar)
                this.table.renderRows();
        
            })

            this.instElement.traerUNinstrumentos(tickets).subscribe(setRecibidos=> {
        
              let setAgregar ={
    
                ID: setRecibidos.id.toString(),
                Elemento: setRecibidos.nombre,
                Cantidad: 1,
                Descripcion: '',
                Tipo: '',
            
              }
              this.dataSource2.push(setAgregar)
              this.table.renderRows();
          })
              this.Distribucion_2.value.QR=''
          
    
        }
      }
        
      
        removeAt(index: number) {
          this.dataSource2.splice(index, 1);
          this.table.renderRows();
        }
      
      
}


interface TicketForma {
  FechaCirugia: FormControl<string>;
  CirugíaProgramada: FormControl<string>;
  Sala: FormControl<string>;
  AreaRegistro: FormControl<string>;
  Turno: FormControl<string>;
  Enfermera:  FormControl<string>;
  NotasAdd: FormControl<string>;
  QR1: FormControl<string>;
}