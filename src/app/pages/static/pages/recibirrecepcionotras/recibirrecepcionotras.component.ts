import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DialogService } from '@app/services/dialog/dialog.service';
import { TicketoaService } from '@app/services/ticketoa/ticketoa.service';


import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { UserResponse } from '@app/store/user';
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';
import { TicketsetOAService } from '@app/services/ticketsetoa/ticketsetoa.service';
import { CantidadInstrumentoService } from '@app/services/cantidadinstrumento/cantidadinstrumento.service';
import { SetEnviado } from '@app/models/backend/set';
import { TicketOA } from '@app/models/backend/ticketoa';
import { from } from 'rxjs';
import { NotificationService } from '@app/services/notification/notification.service';
import { Router } from '@angular/router';

 



export interface Recepcion{
  Area:string;
  FechaPrestamo:string;
  Recepcion:string;
  Entrega:string;
  Devolucion:string;
  NotasAdd:string;
 }


@Component({
  selector: 'app-recibirrecepcionotras',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './recibirrecepcionotras.component.html',
  styleUrl: './recibirrecepcionotras.component.scss'
})
export class RecibirrecepcionotrasComponent implements OnInit  {

  SetTraidos: any =[]

  dataSource_set: MatTableDataSource<any>;
  respuesta:any;
  nombreEmer: any;
  @Input()  ticketAEditar!: string;
  constructor ( 
    private dialogService: DialogService,
    private ticketServicio: TicketoaService,
    private store: Store<fromRoot.State>, 
    private Settraer: TicketsetOAService,
    private dataService: DialogService,
    private Insttraer: TicketinstrumentoService,
    private notification: NotificationService,
    private router: Router,
   private TraerInstSet: CantidadInstrumentoService,
  ){


    this.dataSource = new MatTableDataSource(this.Instrumental_quirugico);
    this.dataSource_set = new MatTableDataSource(this.noSets);


    this.dataService.data$.subscribe(data => {
      var cortado = data
      var cortado2 = cortado.split(':', 2)
      this.respuesta = cortado2[0]
      this.nombreEmer = cortado2[1]

      if (this.respuesta=='true') {
        switch(this.tipoOperacion) { 
          case 2: { 
            this.notification.success("Recibido!");
            this.router.navigate(['/static/welcome']);
             //statements;
              // ***********************************************************************************
              let tickerCapturado = this.capturarProgCirug();
              this.ticketServicio.editarticket(tickerCapturado, tickerCapturado.id).subscribe((ticket) => {})

         
              
             break; 
          } 
          case 3: { 
            this.notification.error("Operación cancelada");
            this.router.navigate(['/static/welcome']);
            //statements; 
            break; 
         } 
          default: { 
             //statements; 
             break; 
          } 
       }
        
      }
      else {
        this.notification.error("¡Se canceló la operación");
      } 
    });
  }

  Turno1=0
  fechaN = ''

//--------------------------------comienza auto generador --------------------------------
step = 0;

setStep(index: number) {
  this.step = index;
}
cantidadset=1;
noSets: any = [];
dataSource: MatTableDataSource<any>;

valor = true;
valor2 = false;
//-------------------------------- finaliza auto generador --------------------------------
 nombreSet='';
  ngOnInit(): void {

    if (horaA >= 7 && horaA < 14 ) {this.Turno1 = 1;}

    if (horaA >=14  && horaA < 21 ) { this.Turno1 = 2;}

    if (horaA < 7 && horaA >=21   ){this.Turno1 = 3;}

    this.recargar()
   

    let ticket = Number(this.ticketAEditar)
    // Assign the data to the data source for the table to render
this.ticketServicio.traerUNticket(ticket).subscribe(data => {
  console.log(data)
        let elementoAgregar = {
          Area: data.area_prestamo,
          FechaPrestamo: data.fecha_prestamo,
          Recepcion: this.usuario?.nombre + ' ' + this.usuario?.paterno,
          Entrega: data.recepcion_usuario,
          NotasAdd: data.notas,
          Prioridad: data.prioridad,
          EntregaUsuario: data.entrega_usuario
        }
        this.ticket = data.id;
        this.Recepcion?.get('EntregaUsuario')?.setValue(elementoAgregar.EntregaUsuario!)
        this.Recepcion?.get('Prioridad')?.setValue(elementoAgregar.Prioridad.toString()!)
        this.Recepcion?.get('Area')?.setValue(elementoAgregar.Area!)
        this.Recepcion?.get('FechaPrestamo')?.setValue(elementoAgregar.FechaPrestamo!)
        this.Recepcion?.get('Entrega')?.setValue(elementoAgregar.Entrega!)
        this.Recepcion?.get('Recepcion')?.setValue(this.usuario?.nombre! + ' ' + this.usuario?.paterno!)
        this.Recepcion?.get('NotasAdd')?.setValue(elementoAgregar.NotasAdd!)
        this.fechaN = elementoAgregar.FechaPrestamo
      })
       
//ya no regreses
//alto!!
//    
//
//
       this.Settraer.traerticketsetOA(ticket).subscribe(setRecibidos=> {
        setRecibidos.forEach((set)=>{
            this.noSets.push(set)
            this.cantidadset = set.cantidad

        
        })
      
      }) 


  }



  actualizarInstrumento(setADesplegar: SetEnviado) {
    this.Instrumental_quirugico=[]
    this.TraerInstSet.traercantidadinstrumento(setADesplegar.id).subscribe(InstrumentalSet=>{
      console.log (InstrumentalSet)
      InstrumentalSet.forEach((inst,index)=>{
        let instrumental ={
          Id: inst.instrumento.id, 
          Instrumental: inst.instrumento.nombre, 
          Cantidad: inst.cantidad * this.cantidadset, 
          Marca_Comercial:inst.instrumento.marca, 
          Prelavado:'', 
          Completo:'', 
          Funcional:'', 
          Cantidad_Recibida:'',
          insidencia:''
        }
        this.Instrumental_quirugico.push(instrumental)
    })

    this.dataSource.data = this.Instrumental_quirugico
  })


  }


  capturarProgCirug(): TicketOA {
    const tickerCapturado: TicketOA = {
      id: Number(this.ticketAEditar),
      prioridad: Number(this.Recepcion?.get('Prioridad')?.value!),
      area_prestamo:  this.Recepcion?.get('Area')?.value!,
      fecha_prestamo:  this.Recepcion?.get('FechaPrestamo')?.value!,
      recepcion_usuario: this.Recepcion?.get('Entrega')?.value!,
      recepcion_usuario_recepcion:  this.Recepcion?.get('Recepcion')?.value!,
      devolucion_usuario: this.Recepcion?.get('Devolucion')?.value!,
      entrega_usuario: this.Recepcion?.get('EntregaUsuario')?.value!,
      notas:  this.Recepcion?.get('NotasAdd')?.value!,
      estatus: 'recibido',
    };
   
    console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
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
    this.dialogService.emergente1()
  }



  tipoOperacion : number = 0;
  private lazyLoadBeta$ = from(
    import('@app/services/dialog/components/recibir/recibir.component').then(
      (component) => component.RecibirComponent
    )
  );

  onBetaClicked() {
    this.dialogService.showDialog2(this.lazyLoadBeta$);
    this.tipoOperacion = 2
  }


ticket =100;
fecha=fechaA;
turno=2;
hora=horaAA;



Instrumental_quirugico:any =[]

displayedColumns: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];


disabledInput1: boolean = true;

btnActivate(ionicButton:any) {
  if(ionicButton._color === 'accent')
    ionicButton.color =  'warn';
  else
    ionicButton.color = 'accent';
}


submitted() {
    
  window.alert(JSON.stringify(this.Recepcion.value, null, 2));
}




Recepcion = new FormGroup({
  Area:new FormControl(''),
  FechaPrestamo:new FormControl(''),
  Recepcion:new FormControl(''),
  Entrega:new FormControl(''),
  Devolucion: new FormControl(''),
  NotasAdd:new FormControl(''),
  Prioridad: new FormControl(''),
  EntregaUsuario: new FormControl(''),
});


}
const date = new Date();const año = date.getFullYear();const mes = date.getMonth()+1;const mes2 = date.toLocaleString('default', { month: 'long' });const dia = date.getDate(); const hora = date.getHours();const minutos = date.getMinutes();


const fechaA =dia +'/'+ ('0' + (date.getMonth() + 1)).slice(-2)  +'/'+ año ;

const horaAA = date.getHours() + ':' + date.getMinutes()
const horaA = date.getHours() 