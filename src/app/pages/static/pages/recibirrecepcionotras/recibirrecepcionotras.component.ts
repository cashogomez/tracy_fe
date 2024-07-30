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
import { CantidadInstrumentoEnviado } from '@app/models/backend';
import { TicketSetOA } from '@app/models/backend/ticketsetoa';
import { ReporteincidenciaService } from '@app/services/reporteincidencia/reporteincidencia.service';
import { ReporteIncidenciaRequest } from '@app/models/backend/resporteincidencia';

 



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
respuesta:string='';
nombreEmer:string='';
//-------------------------------- finaliza auto generador --------------------------------

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
    private instrumentosenset:TicketinstrumentoService,
   private TraerInstSet: CantidadInstrumentoService,
   private ReporteIncidencia: ReporteincidenciaService,
  ){


    this.dataSource = new MatTableDataSource(this.Instrumental_quirugico);


    this.dataService.data$.subscribe(data => {
      var cortado = data
      var cortado2 = cortado.split(':', 3)
      this.respuesta = cortado2[0]
      this.Incidencia = cortado2[1]
      this.comentario = cortado2[2]



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
          this.notification.success("Materiales Recibidos!");
          //statements; 
          let tickerCapturado = this.Finzalizado();
          this.ticketServicio.editarticket(tickerCapturado, tickerCapturado.id).subscribe((ticket) => {})

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


 nombreSet='';
  ngOnInit(): void {
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
          Area: data.area_prestamo,
          FechaPrestamo: data.fecha_prestamo,
          Recepcion: this.usuario?.nombre + ' ' + this.usuario?.paterno,
          Entrega: data.recepcion_usuario,
          NotasAdd: data.notas,
          Prioridad: data.prioridad,
          EntregaUsuario: data.entrega_usuario,
          Devolucion: data.devolucion_usuario
        }
        this.ticket = data.id;
        this.Recepcion?.get('EntregaUsuario')?.setValue(elementoAgregar.EntregaUsuario!)
        this.Recepcion?.get('Prioridad')?.setValue(elementoAgregar.Prioridad.toString()!)
        this.Recepcion?.get('Devolucion')?.setValue(elementoAgregar.Devolucion!)
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
            this.cantidades = [set.cantidad]
           })
          }) 

  }

  nuevarecibida=0;
enviar:any=[]
cantidades:number[]=[]
comentario=''
today:any;
ReporteIncidencias(): ReporteIncidenciaRequest {
  const tickerCapturado: ReporteIncidenciaRequest = {
    lugar: 'Recepcion Otras Áreas Hospitalarias',
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

  actualizarInstrumento(setADesplegar: SetEnviado, setADesplegar2: TicketSetOA ) {
    this.Instrumental_quirugico=[]

    this.TraerInstSet.traercantidadinstrumento(setADesplegar.id).subscribe(InstrumentalSet=>{
      InstrumentalSet.forEach((inst,index)=>{
        let instrumental ={
          Id: inst.instrumento.id, 
          Instrumental: inst.instrumento.nombre, 
          Cantidad: inst.cantidad * setADesplegar2.cantidad, 
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


  Guardado(): TicketOA {
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
      estatus: 'En Espera',
    };
   
    console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
  }

  Finzalizado(): TicketOA {
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


ticket =100;
fecha=fechaA;
turno=2;
hora=horaAA;



Instrumental_quirugico:any =[]



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