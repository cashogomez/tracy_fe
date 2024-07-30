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

import { Instrumento } from '@app/models/backend/instrumento';
import { Ticket, TicketRequest } from '@app/models/backend/ticket';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '@app/services/notification/notification.service';
import { CommonModule } from '@angular/common';
import { UserResponse } from '@app/store/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';


import { SetService } from '@app/services/set/set.service';
import { TicketSet, TicketSetRequest } from '@app/models/backend/ticketset';
//--------------------pedir tablas set info --------------------------
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
//--------------------pedir tablas set info --------------------------

//--------------------pedir tablas set info --------------------------
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';
import { InstrumentoService } from '@app/services/instrumento/instrumento.service';
import { from } from 'rxjs';
import { Console } from 'node:console';
import { SetEnviado } from '@app/models/backend/set';
import { CantidadInstrumentoService } from '@app/services/cantidadinstrumento/cantidadinstrumento.service';
import { CantidadInstrumentoEnviado } from '@app/models/backend';

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
  ID: any;
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

  dataSource1: MatTableDataSource<any>;


  displayedColumns2: string[] = ['ID', 'Elemento', 'Cantidad', 'Accion'];
  dataSource2 = [...this.Tabla2];

  noSets: SetEnviado[] = [];
  instrumentos: Instrumento/*Datosprog*/[] = [];


  Distribucion_2 = new FormGroup({
    QR:  new FormControl(''),
     
  });

  
  respuesta:any;
  nombreEmer: any;
  constructor ( private dialogService: DialogService,
 
    private TraerInstSet: CantidadInstrumentoService,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private ticketServicio: TicketService,
    private ticketsetServicio: TicketsetService,
    private setService: SetService,
    private store: Store<fromRoot.State>, 
    private notification: NotificationService,
    private router: Router,
    //--------------------pedir tablas set info --------------------------

   //--------------------traer tablas set info --------------------------
   private Settraer: TicketsetService,
   //--------------------traer tablas set info --------------------------

   //--------------------traer tablas Inst info --------------------------
   private Insttraer: TicketinstrumentoService,
   //--------------------traer tablas Inst info --------------------------
    
   private ticketinstrumentoServicio: TicketinstrumentoService,
   private dataService: DialogService,

    //--------------------traer tablas Inst info --------------------------
   private setElement: SetService,
   private instElement:InstrumentoService,
   //--------------------traer tablas Inst info --------------------------
  ){


    this.dataSource1 = new MatTableDataSource(this.Tabla1);

    this.dataService.data$.subscribe(data => {
      var cortado = data
      var cortado2 = cortado.split(':', 2)
      this.respuesta = cortado2[0]
      this.nombreEmer = cortado2[1]

      if (this.respuesta=='true') {
        switch(this.tipoOperacion) { 
          case 2: { 
            this.tipoOperacion =0;
          
            this.notification.success("Material enviado");
            this.router.navigate(['/static/recepcionquirofano']);
             //statements;
              // ***********************************************************************************
              let tickerCapturado = this.capturarProgCirug();
              this.ticketServicio.editarticket(tickerCapturado, tickerCapturado.id).subscribe((ticket) => {
              })

              this.Actualizarset();
            
              
             break; 
          } 
          case 3: { 
            this.tipoOperacion =0;
            this.notification.error("Operación cancelada");
            this.router.navigate(['/static/quirofanoinformacion']);
            //statements; 
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


  formaEdicion!: FormGroup<TicketForma>;


  capturarProgCirug(): Ticket {
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
      recepcion_usuario: this.nombreEmer,
      recepcion_usuario_recepcion: '',
      devolucion_usuario: '',
      entrega_usuario: this.usuario?.nombre + ' ' + this.usuario?.paterno,
    };
    //console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
  }



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
          Prioridad: data.prioridad

          
        }
       
        this.formaEdicion?.get('FechaCirugia')?.setValue(data.fecha_cirugia!)
        this.formaEdicion?.get('CirugíaProgramada')?.setValue(data.cirugia!)
        this.formaEdicion?.get('NotasAdd')?.setValue(data.notas!)
        this.formaEdicion?.get('Sala')?.setValue(data.sala.toString()!)
        this.formaEdicion?.get('AreaRegistro')?.setValue(data.area_registro!)
        this.formaEdicion?.get('Turno')?.setValue(data.turno.toString()!)
        this.formaEdicion?.get('Enfermera')?.setValue(data.enfermero!),
        this.formaEdicion?.get('Prioridad')?.setValue(data.prioridad!)
        this.ticketC = data.id;
        this.fechaN = data.fecha_cirugia
      })
    
//__________________________-----------------------------------------------__________________________________________----------------------------------------
      this.Settraer.traerticketset(ticket).subscribe(setRecibidos=> {
        console.log(setRecibidos)
        setRecibidos.forEach((set)=>{
          let setAgregar ={

            ID:set.set.id,
            Elemento: set.set.nombre,
            Cantidad: set.cantidad,
            Entregados: set.entregados,
          }
          this.Tabla1.push(setAgregar)
        })
        this.dataSource1.data=this.Tabla1
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
    Prioridad: [''],
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


  tipoOperacion : number = 0;
  private lazyLoadBeta$ = from(
    import('@app/services/dialog/components/mensajeaceptar/mensajeaceptar.component').then(
      (component) => component.MensajeaceptarComponent
    )
  );
  private lazyLoadBetas$ = from(
    import('@app/services/dialog/components/aceptarfalt/aceptarfalt.component').then(
      (component) => component.AceptarfaltComponent
    )
  );
  
  Finalizar() {
    this.dialogService.showDialog(this.lazyLoadBetas$);
    this.tipoOperacion = 2
  }


  Guardar() {
    this.dialogService.showDialog(this.lazyLoadBeta$);
    this.tipoOperacion = 2
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
    var Cantidades = this.dataSource1.data.map(data => data.Cantidad )
    var totalcantidades = Cantidades.reduce((a,b) => a+b )
     
     
    var entregados = this.dataSource1.data.map(data => data.Entregados ) 

    var totalentregados = entregados.reduce((a,b) => a+b  ) 

    if(totalcantidades-1==totalentregados){
      this.estado=true
      this.estado2=false
    }
    else{
      this.estado=false
      this.estado2=true
    }

    this.valueQR1 = this.formaEdicion.get('QR1')?.value!

    var splitted = this.valueQR1.split(".", 3)
    
    this.ValorID1= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
 
    this.Valorfch1 = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.valorres1 =  splitted[2]
    
    
        let comparable = this.dataSource1.data.filter((IDcomp) => IDcomp.ID == Number(this.ValorID1))
     
        if (comparable.length > 0 ){
          let num = 0;
          this.dataSource1.data.forEach(data =>{
            if (data.ID  == Number(this.ValorID1 )&& data.Entregados < data.Cantidad ) {
              this.dataSource1.data[num].Entregados = this.dataSource1.data[num].Entregados+1
            }
           
            num++
          })
    
           //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
       
        
      }

      
      this.formaEdicion.value.QR1=''
  
    }


      cantidadnuevoset:number=1;
      Entregarnuevoset2:number=1;

    Subir() {
      //______________
      
      this.valueQR = this.Distribucion_2.get('QR')?.value!
      
      var splitted = this.valueQR.split(".", 3)
      
      this.ValorID= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
      
      this.Valorfch = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
      
      this.valorres =  splitted[2]
      
      
          let comparable = this.dataSource2.filter((IDcomp) => IDcomp.ID == Number(this.ValorID))
          

            if (comparable.length > 0 ){
              let num = 0;
              this.dataSource2.forEach(data =>{
                if (data.ID == Number(this.ValorID)) {
                  this.dataSource2[num].Cantidad = this.dataSource2[num].Cantidad+1
                  this.cantidadnuevoset = this.dataSource2[num].Cantidad
                  this.Entregarnuevoset2 = this.cantidadnuevoset
                }
                num++

                
              })
        
               //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
        
               this.Distribucion_2.value.QR=''
            }
      
             //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1

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
              this.Distribucion_2.value.QR=''
          
        }
      }
        
      
        removeAt(index: number) {
          this.dataSource2.splice(index, 1);
          this.table.renderRows();
        }
      
/*       
  subirset(){
        let ticket = Number(this.ticketAEditar)
        this.Settraer.traerticketset(ticket).subscribe(setRecibidoss=> {

          setRecibidoss.forEach((set)=>{
            let setAgregar ={
              ID:set.set.id,
              Elemento: set.set.nombre,
              Cantidad: set.cantidad,
              Entregados: set.entregados,
            }
            let comparable = this.dataSource2.filter((IDcomp) => IDcomp.ID == setAgregar.ID)
            console.log(comparable.length)
            if (comparable.length >= 1 ){
              let num = 0;
              this.dataSource2.forEach(data =>{
                if (data.ID == Number(setAgregar.ID)) {
                  
                  this.dataSource2[num].Cantidad = this.dataSource2[num].Cantidad

                  set.entregados= this.dataSource2[num].Cantidad + this.dataSource1.data[num].Entregados
                  set.cantidad= this.dataSource2[num].Cantidad + this.dataSource1.data[num].Cantidad
                  
                  this.Settraer.editarticketset(set , set.id).subscribe((ticketSet)=>{
                    console.log ('-------------------------------------------------------')
                    console.log (ticketSet)
                    console.log ('-------------------------------------------------------')
                  })

                  

                }
      
                else{
                  

                  this.setService.traerUNset(Number(this.ValorID)).subscribe((setencontrado)=>{
    
    
                    let ticketSetSubir:TicketSetRequest ={
                      set: setencontrado,
                      ticket: set.ticket,
                      cantidad: this.cantidadnuevoset,
                      entregados: this.Entregarnuevoset2
                    }
    
                    this.Settraer.editarticketset(set , set.id).subscribe(subidos=>{
                      console.log(subidos)
                    })
                  })
                }
                  

                num++
              })
        
               this.Distribucion_2.value.QR=''
            }
          
              
            else{
                  

              this.setService.traerUNset(Number(this.ValorID)).subscribe((setencontrado)=>{


                let ticketSetSubir:TicketSetRequest ={
                  set: setencontrado,
                  ticket: set.ticket,
                  cantidad: this.cantidadnuevoset,
                  entregados: this.cantidadnuevoset,
                }

                this.Settraer.altaticketset(ticketSetSubir).subscribe(subidos=>{
                  console.log(subidos)
                })
              })







            }

          })
  
        })
       
        
      }
 */
// falta resolver que al guardar en la tabla, esta modifica los datos que existen, sube mal por separado el set que no encuentra y así mismo, sube mal cuando quremos actualizar
// un dato que ya está sin poner el que falta
      subirset(){
        this.notification.success("Material Agregado a la solicitud");
        let ticket = Number(this.ticketAEditar)
        var listaNOencontrados:number[]=[]
        var listafinal:number[]=[]
        this.Settraer.traerticketset(ticket).subscribe(setRecibidoss=> {
        
          


          setRecibidoss.forEach((ticketset)=>{
            let setAgregar ={
              ID:ticketset.set.id,
              Elemento: ticketset.set.nombre,
              Cantidad: ticketset.cantidad,
              Entregados: ticketset.entregados,
            }
            
            let comparable = this.dataSource2.filter((IDcomp) => IDcomp.ID == setAgregar.ID)
            console.log(setAgregar)
            
            if (comparable.length > 0 ){
              let num = 0;
              this.dataSource2.forEach(data =>{
                if (data.ID == Number(setAgregar.ID)) {
                
                  this.dataSource2[num].Cantidad = this.dataSource2[num].Cantidad

                  ticketset.cantidad= this.dataSource2[num].Cantidad + this.dataSource1.data[num].Cantidad
                  ticketset.entregados = this.dataSource2[num].Cantidad + this.dataSource1.data[num].Entregados
                  this.dataSource1.data.push(ticketset)
                  this.Settraer.editarticketset(ticketset , ticketset.id).subscribe((ticketSet2)=>{
                    console.log ('-------------------------------------------------------')
                    console.log (ticketSet2)
                    console.log ('-------------------------------------------------------')
                  })

                }

                num++
              })
        
               //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
        
               this.Distribucion_2.value.QR=''
            }
       
          })


          this.dataSource2.forEach(data =>{listaNOencontrados.push(data.ID)})
          console.log (listaNOencontrados)
          listaNOencontrados.forEach((idset) => {
            let comparable = listafinal.filter((IDcomp) => IDcomp != idset)
            if (comparable.length <= 0) {
              listafinal.push(idset)
            }


          })
          console.log(listafinal)
           if (listafinal.length > 0){
            listafinal.forEach((number) =>{
              this.setService.traerUNset(Number(number)).subscribe((setencontrado)=>{


                let ticketSetSubir:TicketSetRequest ={
                  set: setencontrado,
                  ticket: setRecibidoss[0].ticket,
                  cantidad: this.cantidadnuevoset,
                  entregados: this.cantidadnuevoset
                }

                 this.Settraer.altaticketset(ticketSetSubir).subscribe(subidos=>{
                  console.log(subidos)
                })
 
                console.log(ticketSetSubir)
              })
            })
           }
                 

         
        })
      }


      Actualizarset(){
        let ticket = Number(this.ticketAEditar)

        this.Settraer.traerticketset(ticket).subscribe(setRecibidos=> {
          let nn=0
          let CantidadFinal: number[]=[]
          this.dataSource1.data.forEach((data)=>{
            CantidadFinal[nn] = data.Entregados
            nn++
               }) 

      let nnn=0
            console.log(CantidadFinal)
       setRecibidos.forEach((inst)=>{
        let instrumental:TicketSet  ={
          id: inst.id,
          cantidad : inst.cantidad,
          set : inst.set,
          ticket: inst.ticket,
          entregados: CantidadFinal[nnn],
        
        } 
    
      nnn++
      console.log(instrumental)
       this.Settraer.editarticketset(instrumental, inst.id).subscribe(data=>{
        console.log(data)
       })   
      }) 
    
    
    }) 
    
    
    
    
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
  Prioridad:  FormControl<any>;
}