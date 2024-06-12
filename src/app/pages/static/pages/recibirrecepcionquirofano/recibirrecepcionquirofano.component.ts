import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogService } from '@app/services/dialog/dialog.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { UserResponse } from '@app/store/user';
import { TicketService } from '@app/services/ticket/ticket.service';


import { TurnoService } from '@app/services';
//--------------------pedir tablas set info --------------------------
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
//--------------------pedir tablas set info --------------------------

//--------------------pedir tablas set info --------------------------
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';
//--------------------pedir tablas set info --------------------------

const date = new Date();const año = date.getFullYear();const mes = date.getMonth()+1;const mes2 = date.toLocaleString('default', { month: 'long' });const dia = date.getDate(); const hora = date.getHours();const minutos = date.getMinutes();


const fechaA =dia +'/'+ ('0' + (date.getMonth() + 1)).slice(-2)  +'/'+ año ;

const horaA =   date.getHours()








export interface Recepcion{
 FechaCirugia:String;
 Hora:string;
 DxOperatorio:string;
 NoQx:string;
 Entrega:string;
 IDEntrega:string;
 Recepcion:string;
 IDRecepcion:String;
 Devolucion:string
 IDDevolucion:string;
 NotasAdd:string;
 Cantidad1:number;
 Cantidad2:number;
}


@Component({
  selector: 'app-recibirrecepcionquirofano',
  standalone: true,
  imports: [ MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    CommonModule],
  templateUrl: './recibirrecepcionquirofano.component.html',
  styleUrl: './recibirrecepcionquirofano.component.scss'
})
export class RecibirrecepcionquirofanoComponent implements OnInit {
  @Input()  ticketAEditar!: string;
  form!: FormGroup;

  Instrumental_quirugico:any[] =[] 
  Instrumental_quirugico_sencillo: any[] = [];

  Recepcion = new FormGroup({
    FechaCirugia: new FormControl(''),
    Hora: new FormControl(''),
    DxOperatorio: new FormControl(''),
    NoQx: new FormControl(''),
    Entrega: new FormControl(''),
    IDEntrega: new FormControl(''),
    Recepcion: new FormControl(''),
    IDRecepcion: new FormControl(''),
    Devolucion: new FormControl(''),
    IDDevolucion: new FormControl(''),
    NotasAdd: new FormControl(''),
    Cantidad1: new FormControl(0),
    Cantidad2: new FormControl(0),
  });

  submitted() {
    
    window.alert(JSON.stringify(this.Recepcion.value, null, 2));
  }

  constructor ( 
    private dialogService: DialogService,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private ticketServicio: TicketService,
    
    private store: Store<fromRoot.State>, 

      //--------------------traer tablas set info --------------------------
      private Settraer: TicketsetService,
      //--------------------traer tablas set info --------------------------

      //--------------------traer tablas Inst info --------------------------
      private Insttraer: TicketinstrumentoService,
      //--------------------traer tablas Inst info --------------------------
    
      private turnoService: TurnoService,
  ){
   
    this.dataSource1 = new MatTableDataSource(this.Instrumental_quirugico_sencillo);
    this.dataSource2 = new MatTableDataSource(this.Instrumental_quirugico);


  }



  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));  
        console.log(this.usuario) 
    });
  }
  fechaN:any;
  usuario: UserResponse | null = null;


  Turno1: number = 0;
  TurnoAct:number = 0;

  
  ngOnInit() {
    
//------------------------_______________________-----------------TURNO----------------_______________________-------------------------
        if (horaA >= 7 && horaA < 14 ) {this.Turno1 = 1;}

        if (horaA >=14  && horaA < 21 ) { this.Turno1 = 2;}

        if (horaA >=21  && horaA < 7 ){this.Turno1 = 3;}
     console.log (horaA)
    this.turnoService.traerUNturno(this.Turno1).subscribe (turnoRecibido => {
        let turnoAgregar ={
          Numero: turnoRecibido.id,
          Inicio: turnoRecibido.inicio,
          Fin: turnoRecibido.fin,
          Id: turnoRecibido.id
        }
       this.TurnoAct= turnoRecibido.id
    })
//------------------------_______________________-----------------TURNO----------------_______________________-------------------------
    this.recargar()
   
 
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
        
        console.log(this.formaEdicion.value.FechaCirugia)
        this.formaEdicion?.get('FechaCirugia')?.setValue(data.fecha_cirugia!)
        this.formaEdicion?.get('DxOperatorio')?.setValue(data.diagnostico!)
        this.formaEdicion?.get('NoQx')?.setValue(data.registro!)
        this.ticketC = data.id;
        this.formaEdicion?.get('Recepcion')?.setValue(this.usuario?.nombre!)
        this.formaEdicion?.get('IDRecepcion')?.setValue(this.usuario?.numeroEmpleado!)

        this.turno = data.turno
        this.fechaN = data.fecha_cirugia
        console.log(this.fechaN)

    
      })
    
           
      this.Insttraer.traerticketinstrumento(ticket).subscribe(InstRecibidos=> {
        InstRecibidos.forEach((inst)=>{
          let instAgregar ={
            Id: inst.instrumento.id,
            Instrumental: inst.instrumento.nombre,
            Cantidad: inst.cantidad,
            Marca_Comercial: inst.instrumento.marca,
            Completo:'', 
            Funcional:'', 
            Cantidad_Recibida:''
          }
          this.Instrumental_quirugico_sencillo.push(instAgregar)
        })
        this.dataSource1.data = this.Instrumental_quirugico_sencillo
      })
    
      this.Settraer.traerticketset(ticket).subscribe(setRecibidos=> {
        setRecibidos.forEach((set)=>{
          let setAgregar ={
            Id: set.set.id,
            Instrumental: set.set.nombre,
            Cantidad: set.cantidad,
            Completo:'', 
            Funcional:'', 
            Cantidad_Recibida:''
          }
          this.Instrumental_quirugico.push(setAgregar)
        })
        this.dataSource2.data = this.Instrumental_quirugico
      })

    

  this.formaEdicion = this.fb.nonNullable.group({

    nombre: [''],
    FechaCirugia: [''],
    Hora:  [''],
    DxOperatorio: [''],
    NoQx: [''],
    Entrega: [''],
    IDEntrega: [''],
    Recepcion: [''],
    IDRecepcion: [''],
    Devolucion:  [''],
    IDDevolucion: [''],
 });




  }

  emergente1(){
    this.dialogService.emergente1()
  }

ticketC =100;
fecha=fechaA;
turno=2;
hora=horaA;



dataSource1: MatTableDataSource<Element>;
displayedColumns1: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];
dataSource2: MatTableDataSource<Element>;
displayedColumns2: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];


disabledInput1: boolean = true;


formaEdicion!: FormGroup<TicketForma>;
  




btnActivate(ionicButton:any) {
  if(ionicButton._color === 'accent')
    ionicButton.color =  'warn';
  else
    ionicButton.color = 'accent';
}
}


interface TicketForma {
  nombre: FormControl<string>;
  FechaCirugia: FormControl<string>;
  Hora: FormControl<string>;
  DxOperatorio: FormControl<string>;
  NoQx: FormControl<string>;
  Entrega: FormControl<string>;
  IDEntrega: FormControl<string>;
  Recepcion: FormControl<string>;
  IDRecepcion: FormControl<string>;
  Devolucion: FormControl<string>;
  IDDevolucion: FormControl<string>;
}
