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


import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CantidadInstrumentoService, NotificationService, TurnoService } from '@app/services';
//--------------------pedir tablas set info --------------------------
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
//--------------------pedir tablas set info --------------------------

//--------------------pedir tablas set info --------------------------
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';
import { from } from 'rxjs';
import { Ticket } from '@app/models/backend/ticket';
import { SetEnviado } from '@app/models/backend/set';

import { CantidadInstrumentoEnviado } from '@app/models/backend';
//--------------------pedir tablas set info --------------------------

import { ReporteincidenciaService } from '@app/services/reporteincidencia/reporteincidencia.service';
import { ReporteIncidenciaRequest } from '@app/models/backend/resporteincidencia';


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

//--------------------------------comienza auto generador --------------------------------

step = 0;

setStep(index: number) {
  this.step = index;
}
cantidadset=1;
noSets: any = [];
dataSource: MatTableDataSource<any>;
displayedColumns: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];

totalcantidades = 0;
totalcantidades2 = 0;
valor = true;
valor2 = false;
visibles = true;
visibles2 = true;
visibles3 = false;
cantidadfinal=0;
Incidencia='';
comentario=''
respuesta:string='';
nombreEmer:string='';
//-------------------------------- finaliza auto generador --------------------------------

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
      private dataService: DialogService,
      private turnoService: TurnoService,
    private notification: NotificationService,
    private router: Router,


    private TraerInstSet: CantidadInstrumentoService,

    private ReporteIncidencia: ReporteincidenciaService,

  )
  {
   
    this.dataSource = new MatTableDataSource(this.Instrumental_quirugico);


    this.dataService.data$.subscribe(data => {
      var cortado = data
      var cortado2 = cortado.split(':', 3)
      this.respuesta = cortado2[0]
      this.Incidencia = cortado2[1]
      this.comentario = cortado2[2]
      
      
      console.log ('hola soy la respuesta:     ' + this.respuesta)
      console.log ('hola soy la la incidencia:     ' + this.Incidencia)
      console.log ('hola soy el comentario:     ' + this.comentario)

      if (this.respuesta=='true') {
        console.log ('////////////////////////////////')
        console.log (this.tipoOperacion)
        console.log ('////////////////////////////////')
        switch(this.tipoOperacion) { 
          
          case 1: { 
            let reporte = this.ReporteIncidencias();
            this.ReporteIncidencia.altaReporteIncidencia(reporte).subscribe(data =>{
              console.log(data)
            })
  
            this.tipoOperacion=0;
            this.notification.success("Reporte de Incidencia Enviado!");

            var Cantidades = this.dataSource.data.map(data => data.Cantidad )
            var totalcantidades = Cantidades.reduce((a,b) => a+b )
    
    
            var Cantidades2 = this.dataSource.data.map(data => data.Cantidad_Recibida )
            var totalcantidades2 = Cantidades2.reduce((a,b) => a+b )
    
            if ( totalcantidades2 ==  totalcantidades)
              {
                this.visibles=true;
                this.visibles2=true;
                this.visibles3=false;
              }
            else{
              this.visibles=false;
              this.visibles2=false;
              this.visibles3=true;
            }
    
            console.log(totalcantidades + '/' + totalcantidades2)
          
       



             break; 
          } 
          case 2: { 
            this.tipoOperacion=0;
            this.notification.success("Recibido!");
            this.router.navigate(['/static/welcome']);
             //statements;
              // ***********************************************************************************
              let tickerCapturado = this.Guardado();
              this.ticketServicio.editarticket(tickerCapturado, tickerCapturado.id).subscribe((ticket) => {})

         
              
             break; 
          } 
          case 3: { 
          this.tipoOperacion=0;
          this.router.navigate(['/static/welcome']);
          this.notification.success("Guardado!");
          //statements; 
          let tickerCapturado = this.Finzalizado();
          this.ticketServicio.editarticket(tickerCapturado, tickerCapturado.id).subscribe((ticket) => {})

          break; 
          } 

          default: { 
            this.tipoOperacion =0;
             //statements; 
             break; 
          } 
       }
        
      }
      else {
        this.tipoOperacion =0;
        this.notification.error("¡Se canceló la operación");
      } 
    });
   
  }

  
  subirset(setADesplegar: SetEnviado){
    this.notification.success("Guardado!");

    this.TraerInstSet.traercantidadinstrumento(setADesplegar.id).subscribe(InstrumentalSet=>{
      let nn=0
      let CantidadFinal: number[]=[]
      this.dataSource.data.forEach((data)=>{
        CantidadFinal[nn] = data.Cantidad_Recibida
        nn++
  }) 
  let nnn=0
  InstrumentalSet.forEach((inst)=>{
    let instrumental:CantidadInstrumentoEnviado  ={
      id:  inst.instrumento.id, 
      cantidad : inst.cantidad, 
      cantidad_recibida :  CantidadFinal[nnn],
      instrumento : inst.instrumento,
      set: setADesplegar,
    } 

  nnn++
   this.TraerInstSet.editarset(instrumental, inst.id).subscribe(data=>{
    console.log(data)
   })   
  }) 
 

  var Cantidades = this.dataSource.data.map(data => data.Cantidad )
  var totalcantidades = Cantidades.reduce((a,b) => a+b )


  var Cantidades2 = this.dataSource.data.map(data => data.Cantidad_Recibida )
  var totalcantidades2 = Cantidades2.reduce((a,b) => a+b )

  if ( totalcantidades2 ==  totalcantidades)
    {
      this.visibles=true;
      this.visibles2=true;
      this.visibles3=false;
    }
  else{
    this.visibles=false;
    this.visibles2=false;
    this.visibles3=true;
  }

  console.log(totalcantidades + '/' + totalcantidades2)


}) 

  }


  ReporteIncidencias(): ReporteIncidenciaRequest {
    const tickerCapturado: ReporteIncidenciaRequest = {
      lugar: 'Recepcion Quirófano',
      fecha: this.today,
      usuario: this.usuario?.nombre + ' ' + this.usuario?.paterno,
      turno: this.Turno1,
      incidencia:this.Incidencia ,
      comentario: this.comentario,
    };
    console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
  }



  actualizarInstrumento(setADesplegar: SetEnviado) {
    this.Instrumental_quirugico=[]

    this.TraerInstSet.traercantidadinstrumento(setADesplegar.id).subscribe(InstrumentalSet=>{
      InstrumentalSet.forEach((inst,index)=>{
        let instrumental ={
          Id: inst.instrumento.id, 
          Instrumental: inst.instrumento.nombre, 
          Cantidad: inst.cantidad , 
          Cantidad_Recibida: inst.cantidad_recibida, 
          Marca_Comercial:inst.instrumento.marca, 
          Prelavado:'', 
          Completo:'', 
          Funcional:'', 
          insidencia:''
        }
        this.Instrumental_quirugico.push(instrumental)
    })
    this.dataSource.data = this.Instrumental_quirugico


   
   
      var Cantidades = this.dataSource.data.map(data => data.Cantidad )
      var totalcantidades = Cantidades.reduce((a,b) => a+b )


      var Cantidades2 = this.dataSource.data.map(data => data.Cantidad_Recibida )
      var totalcantidades2 = Cantidades2.reduce((a,b) => a+b )

      if ( totalcantidades2 ==  totalcantidades)
        {
          this.visibles=true;
          this.visibles2=true;
          this.visibles3=false;
        }
      else{
        this.visibles=false;
        this.visibles2=false;
        this.visibles3=true;
      }

      console.log(totalcantidades + '  ' + totalcantidades2)

    })

}


  Guardado(): Ticket {
    const tickerCapturado: Ticket = {
      id: Number(this.ticketAEditar),
      fecha_cirugia: this.formaEdicion?.get('Fechacirugia')?.value!,
      paciente: this.formaEdicion?.get('Paciente')?.value!,
      registro: this.formaEdicion?.get('Registro')?.value!,
      edad: this.formaEdicion?.get('Edad')?.value!,
      fecha_nacimiento: this.formaEdicion?.get('Nacimiento')?.value!,
      habitacion: this.formaEdicion?.get('Habitacion')?.value!,
      sala: Number(this.formaEdicion?.get('Sala')?.value!),
      turno: Number(this.formaEdicion?.get('Turno')?.value!),
      diagnostico: this.formaEdicion?.get('Diagnostico')?.value!,
      cirugia: this.formaEdicion?.get('Cirugia')?.value!,
      solicita: this.formaEdicion?.get('Solicita')?.value!,
      cirujano: this.formaEdicion?.get('Cirujano')?.value!,
      anestesiologo: this.formaEdicion?.get('Anestesiologo')?.value!,
      anestesia: this.formaEdicion?.get('Anestesia')?.value!,
      residente: this.formaEdicion?.get('Ayudante')?.value!,
      area_registro: this.formaEdicion?.get('AreaRegistro')?.value!,
      enfermero: this.formaEdicion?.get('Enfermera')?.value!,
      notas: this.formaEdicion?.get('Notas')?.value!,
      estatus: 'En Espera',
      prioridad: this.formaEdicion?.get('Prioridad')?.value!,
      activo: true,
      recepcion_usuario:this.formaEdicion?.get('Entrega')?.value!,
      recepcion_usuario_recepcion: this.formaEdicion?.get('Recepcion')?.value!,
      devolucion_usuario: this.formaEdicion?.get('Devolucion')?.value!,
      entrega_usuario: this.formaEdicion?.get('EntregaUsuario')?.value!,
    };
    //console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
  }

  Finzalizado(): Ticket {
    const tickerCapturado: Ticket = {
      id: Number(this.ticketAEditar),
      fecha_cirugia: this.formaEdicion?.get('Fechacirugia')?.value!,
      paciente: this.formaEdicion?.get('Paciente')?.value!,
      registro: this.formaEdicion?.get('Registro')?.value!,
      edad: this.formaEdicion?.get('Edad')?.value!,
      fecha_nacimiento: this.formaEdicion?.get('Nacimiento')?.value!,
      habitacion: this.formaEdicion?.get('Habitacion')?.value!,
      sala: Number(this.formaEdicion?.get('Sala')?.value!),
      turno: Number(this.formaEdicion?.get('Turno')?.value!),
      diagnostico: this.formaEdicion?.get('Diagnostico')?.value!,
      cirugia: this.formaEdicion?.get('Cirugia')?.value!,
      solicita: this.formaEdicion?.get('Solicita')?.value!,
      cirujano: this.formaEdicion?.get('Cirujano')?.value!,
      anestesiologo: this.formaEdicion?.get('Anestesiologo')?.value!,
      anestesia: this.formaEdicion?.get('Anestesia')?.value!,
      residente: this.formaEdicion?.get('Ayudante')?.value!,
      area_registro: this.formaEdicion?.get('AreaRegistro')?.value!,
      enfermero: this.formaEdicion?.get('Enfermera')?.value!,
      notas: this.formaEdicion?.get('Notas')?.value!,
      estatus: 'recibido',
      prioridad: this.formaEdicion?.get('Prioridad')?.value!,
      activo: true,
      recepcion_usuario:this.formaEdicion?.get('Entrega')?.value!,
      recepcion_usuario_recepcion: this.formaEdicion?.get('Recepcion')?.value!,
      devolucion_usuario: this.formaEdicion?.get('Devolucion')?.value!,
      entrega_usuario: this.formaEdicion?.get('EntregaUsuario')?.value!,
    };
    //console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
  }


  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));  
        console.log(this.usuario) 
    });
  }


  private lazyLoadBetas$ = from(
    import('@app/services/dialog/components/dialogo/dialogo.component').then(
      (component) => component.DialogoComponent
    )
  );

  tipoOperacion : number = 0;
  private lazyLoadBeta$ = from(
    import('@app/services/dialog/components/recibir/recibir.component').then(
      (component) => component.RecibirComponent
    )
  );
  IncidenciaR(){
    this.dialogService.showDialog3(this.lazyLoadBetas$)
    this.tipoOperacion = 1
    
  }
  Guardar() {
    this.dialogService.showDialog2(this.lazyLoadBeta$);
    this.tipoOperacion = 2
  }
  Finalizar() {
    this.dialogService.showDialog2(this.lazyLoadBeta$);
    this.tipoOperacion = 3
  }

  fechaN:any;
  usuario: UserResponse | null = null;


  Turno1: number = 0;
  TurnoAct:number = 0;

  today:any;
  ngOnInit() {

    this.today = date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + date.getDate()).slice(-2)+ 'T' +date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
   


    

    if (horaA >= 7 && horaA < 14 ) {this.Turno1 = 1;}

    if (horaA >=14  && horaA < 21 ) { this.Turno1 = 2;}

    if (horaA < 7 && horaA >=21   ){this.Turno1 = 3;}

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
        
        this.formaEdicion?.get('FechaCirugia')?.setValue(data.fecha_cirugia!)
        this.formaEdicion?.get('CirugíaProgramada')?.setValue(data.cirugia!)
        this.formaEdicion?.get('NotasAdd')?.setValue(data.notas!)
        this.formaEdicion?.get('Sala')?.setValue(data.sala.toString()!)
        this.formaEdicion?.get('AreaRegistro')?.setValue(data.area_registro!)
        this.formaEdicion?.get('Turno')?.setValue(data.turno.toString()!)
        this.formaEdicion?.get('Enfermera')?.setValue(data.enfermero!),
        this.formaEdicion?.get('Prioridad')?.setValue(data.prioridad!)


        console.log(this.formaEdicion.value.FechaCirugia)
        this.formaEdicion?.get('FechaCirugia')?.setValue(data.fecha_cirugia!)
        this.formaEdicion?.get('DxOperatorio')?.setValue(data.diagnostico!)
        this.formaEdicion?.get('NoQx')?.setValue(data.registro!)
        this.ticketC = data.id;
        this.formaEdicion?.get('Recepcion')?.setValue(this.usuario?.nombre! + ' ' + this.usuario?.paterno! )
        this.formaEdicion?.get('Entrega')?.setValue(data.recepcion_usuario!)

        this.formaEdicion?.get('Devolucion')?.setValue(data.devolucion_usuario!)
        this.formaEdicion?.get('EntregaUsuario')?.setValue(data.entrega_usuario!)
        this.turno = data.turno
        this.fechaN = data.fecha_cirugia
        console.log(this.fechaN)

    
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
        CirugíaProgramada: [''],
        Sala: [''],
        AreaRegistro: [''],
        Turno: [''],
        Enfermera:  [''],
        NotasAdd: [''],
        Prioridad: [''],
        EntregaUsuario: [''],
     });
    
 
      this.Settraer.traerticketset(ticket).subscribe(setRecibidos=> {
        console.log(setRecibidos);
        setRecibidos.forEach((set)=>{
            this.noSets.push(set)
            this.cantidadset = set.cantidad

        
        })

        
      
      }) 

  }


 

ticketC =100;
fecha=fechaA;
turno=2;
hora=horaA;



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
  CirugíaProgramada: FormControl<string>;
  Sala: FormControl<string>;
  AreaRegistro: FormControl<string>;
  Turno: FormControl<string>;
  Enfermera:  FormControl<string>;
  NotasAdd: FormControl<string>;
  Prioridad:  FormControl<any>;
  EntregaUsuario:FormControl<any>;
}
