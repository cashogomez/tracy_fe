import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
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
import { tick } from '@angular/core/testing';

const Instrumental_quirugico_sencillo = [
  {Id: 3829	, Instrumental: 'Mango de Bisturi', Cantidad: 2, Marca_Comercial: 'N/A', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: 9034, Instrumental: 'Tijeras', Cantidad: 1, Marca_Comercial: 'LISTER', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: 3984, Instrumental: 'Pinzas', Cantidad: 3, Marca_Comercial: 'GUTTEK', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
 
];


const Instrumental_quirugico = [
  {Id:' 0001'	, Instrumental: 'Pinza Halsted', Cantidad: 1, Marca_Comercial: 'N/A', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: '0002', Instrumental: 'Tijeras rectas', Cantidad: 2, Marca_Comercial: 'LISTER', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: '0003', Instrumental: 'Pinzas Kelly', Cantidad: 4, Marca_Comercial: 'GUTTEK', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: '0004', Instrumental: 'Succión', Cantidad:8, Marca_Comercial: 'LISTER', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
 
];


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
    private store: Store<fromRoot.State>, 
    
  ){
   /*  let ticket = Number(this.ticketAEditar)

    ticketService.traertickets().subscribe(ticketsRecibidos => {
      ticketsRecibidos.forEach((ticket) => {
        let elementoAgregar = {
          id: ticket.id,
          Fecha: ticket.fecha_cirugia,
          Ticket: ticket.id,
          Paciente: ticket.paciente,
          Edad: ticket.edad,
          Diagnostico: ticket.diagnostico,
          Cirugia: ticket.cirugia,
          Sala: ticket.sala,
          Turno: ticket.turno,
          Estatus: ticket.estatus,
        }
        this.formaEdicion?.get('Hora')?.setValue(ticket.fecha_cirugia!)
        this.formaEdicion?.get('FechaCirugia')?.setValue(ticket.fecha_cirugia!)
        this.formaEdicion?.get('DxOperatorio')?.setValue(ticket.diagnostico!)
        this.formaEdicion?.get('NoQx')?.setValue(ticket.registro!)
        this.ticketC = ticket.id;
      })
    }) */

  }



  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));  
        console.log(this.usuario) 
    });
  }

  usuario: UserResponse | null = null;
  ngOnInit(): void {
    this.recargar()
   

    


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

 this.formaEdicion?.get('Recepcion')?.setValue(this.usuario?.nombre!)
 this.formaEdicion?.get('IDRecepcion')?.setValue(this.usuario?.numeroEmpleado!)


  }

  emergente1(){
    this.dialogService.emergente1()
  }

ticketC =100;
fecha='17/05/2023';
turno=2;
hora='13:11';



displayedColumns1: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];
dataSource1 = Instrumental_quirugico_sencillo;


displayedColumns2: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];
dataSource2 = Instrumental_quirugico;

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
