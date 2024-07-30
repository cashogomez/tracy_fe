import { Component, OnInit, ViewChild } from '@angular/core';
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

import { TicketoaService } from '@app/services/ticketoa/ticketoa.service';
import { from } from 'rxjs';


import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '@app/services/notification/notification.service';
import { CommonModule } from '@angular/common';
import { UserResponse } from '@app/store/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { TicketOA, TicketOARequest } from '@app/models/backend/ticketoa';

import { TicketsetOAService } from '@app/services/ticketsetoa/ticketsetoa.service';
import { SetService } from '@app/services';
import { SetEnviado } from '@app/models/backend/set';
import { id } from '@swimlane/ngx-charts';
import { TicketSetOA, TicketSetOARequest } from '@app/models/backend/ticketsetoa';

const date = new Date();

export interface Distribucion_Otras_1 {
  Prioidad:string;
  Area: string;
  FechaPrestamo: string;
  Recepcion: string;
  Entrega: string;
  NotasAdd: string;
}

export interface Distribucion_Otras_2 {
  QR:string;
}


export interface TablaAñadir {
  id:any;
  Elemento: any;
  Entregados: any;

}




@Component({
  selector: 'app-detalledistribucionotras',
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
  templateUrl: './detalledistribucionotras.component.html',
  styleUrl: './detalledistribucionotras.component.scss'
})
export class DetalledistribucionotrasComponent implements OnInit {

  noSets: SetEnviado[] = [];
  options: User[] = [];
  
  Distribucion_Otras_1 = new FormGroup({
    Prioridad: new FormControl(''),
    Area: new FormControl(''),
    FechaPrestamo:new FormControl(''),
    Recepcion:new FormControl(''),
    Entrega: new FormControl(''),
    NotasAdd: new FormControl(''),
  });

  Distribucion_Otras_2 = new FormGroup({
    QR: new FormControl(''),
  });
 
  respuesta:any;
 nombreEmer:any;
  constructor ( 
    private dialogService: DialogService,
    private TicketOtras : TicketoaService,
    private ticketsetServicio : TicketsetOAService,
    private store: Store<fromRoot.State>, 
    private notification: NotificationService,
    private dataService: DialogService,
    private setElement: SetService,
    private setService: SetService,
    private router: Router,){
      
    this.dataSource = new MatTableDataSource(this.Tabla2);

      this.dataService.data$.subscribe(data => {
        var cortado = data
        var cortado2 = cortado.split(':', 2)
        this.respuesta = cortado2[0]
        this.nombreEmer = cortado2[1]

      if (this.respuesta=='true') {
        switch(this.tipoOperacion) { 
          case 2: { 
            this.tipoOperacion =0;
            this.notification.success("Préstamo Generado!");
            this.router.navigate(['/static/distribucionotrasareas']);
             //statements;
              // ***********************************************************************************
              let tickerCapturado = this.subirTicketOtras ();
              this.TicketOtras.altaticketoa(tickerCapturado).subscribe((ticket: TicketOA) => {
                this.Tabla2.forEach((elemento) => {
                  let setSeleccionado = this.noSets.filter(setseleccionado => setseleccionado.id == elemento.id)
                  console.log(setSeleccionado)
                  let ticketset: TicketSetOARequest = {
                    set: setSeleccionado[0],
                    ticket: ticket,
                    cantidad: elemento.Entregados
                  }
                  this.ticketsetServicio.altaticketsetOA(ticketset).subscribe((ticketset) => {
                    console.log(ticketset)
                  })
                 })
              })

            
              
             break; 
          } 
          case 3: { 
            this.tipoOperacion =0;
            this.dataSource.data=[]
            this.Tabla2=[]
            this.notification.error("Operación cancelada");
            this.router.navigate(['/static/quirofanoinformacion']);
            //statements; 
            break; 
         } 
          default: { 
            this.dataSource.data=[]
            this.Tabla2=[]
            this.tipoOperacion =0;
             //statements; 
             break; 
          } 
       }
        
      }
      else {
         this.dataSource.data=[]
            this.Tabla2=[]
        this.tipoOperacion =0;
        this.notification.error("¡Se canceló la operación");
      } 
    })

    this.noSets = []
    this.options = []
   // ******************** CARGA DE LOS SETS ********************
     this.setService.traersets().subscribe(setRegistrados => {
       setRegistrados.forEach(setregistrado => {
         this.noSets.push(setregistrado)
         this.options.push({name: setregistrado.id.toString()+' '+'(S)'+' '+setregistrado.nombre})
     
       })
     })

    }
    
labelPosition: 1 | 2 | 3 = 3;
  
  ngOnInit(): void {

    this.today = date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + date.getDate()).slice(-2)+ ' 08:00:00';
    console.log(this.today);
    this.recargar();

    this.fechaN = ('0' + date.getDate()).slice(-2) + '/'  + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
    +  date.getFullYear() 

    this.Distribucion_Otras_1?.get('Entrega')?.setValue(this.usuario?.nombre + ' ' + this.usuario?.paterno!)
    this.Distribucion_Otras_1?.get('FechaPrestamo')?.setValue(this.today)

    console.log(this.today)
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

    prioridad=0;
    today:any;




  

    subirTicketOtras(): TicketOARequest {
      const tickerCapturado: TicketOARequest = {
        prioridad: this.labelPosition,
        area_prestamo:  this.Distribucion_Otras_1?.get('Area')?.value!,
        fecha_prestamo:  this.today,
        recepcion_usuario:  this.Distribucion_Otras_1?.get('Recepcion')?.value!,
        recepcion_usuario_recepcion:  '',
        devolucion_usuario: ' ',
        entrega_usuario: this.Distribucion_Otras_1?.get('Entrega')?.value!,
        notas:  this.Distribucion_Otras_1?.get('NotasAdd')?.value!,
        estatus: 'En Espera',


      };
      console.log(tickerCapturado)
      return tickerCapturado;
      // ***********************************************************
    }


    tipoOperacion : number = 0;
    private lazyLoadBeta$ = from(
      import('@app/services/dialog/components/mensajeaceptar/mensajeaceptar.component').then(
        (component) => component.MensajeaceptarComponent
      )
    );
  emergente3(){
    console.log (this.labelPosition)
    this.dialogService.showDialog2(this.lazyLoadBeta$);
    this.tipoOperacion = 2
  }


  submitted() {
    
    window.alert(JSON.stringify(this.Distribucion_Otras_1.value, null, 2));
    window.alert(JSON.stringify(this.Distribucion_Otras_2.value, null, 2));
  }

  fechaN:any;

  Tabla2: TablaAñadir[] = [];
  dataSource: MatTableDataSource<TablaAñadir>;
  displayedColumns: string[] = ['ID', 'Elemento', 'Entregados', 'Accion'];
  

  valueQR = '';
  ValorID="";
  Valorfch="";
  valorres="";

  @ViewChild('tabla2') table!: MatTable<TablaAñadir>;
  cantidad2=1;

  cantidadnuevoset:number=1;
  Subir() {
    //______________

    this.valueQR = this.Distribucion_Otras_2.get('QR')?.value!
    
    var splitted = this.valueQR.split(".", 3)
    
    this.ValorID= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.Valorfch = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.valorres =  splitted[2]
    
    
        let comparable = this.dataSource.data.filter((IDcomp) => IDcomp.id == Number(this.ValorID))
        

          if (comparable.length > 0 ){
            let num = 0;
            this.dataSource.data.forEach(data =>{
              if (data.id == Number(this.ValorID)) {
                this.dataSource.data[num].Entregados= this.dataSource.data[num].Entregados+1

                this.cantidadnuevoset = this.dataSource.data[num].Entregados

              }
              num++

              
            })
      
             //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
      
             this.Distribucion_Otras_2.value.QR=''
          }
    
           //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1

        else{
          var tickets = Number(this.ValorID)
          this.setElement.traerUNset(tickets).subscribe(setRecibidos=> {
      
              let setAgregar ={

                id: setRecibidos.id,
                Elemento: setRecibidos.nombre,
                Entregados: 1,
                Accion: '',
              }
              this.Tabla2.push(setAgregar)
              this.dataSource.data = this.Tabla2
              this.table.renderRows();
            
          })
            this.Distribucion_Otras_2.value.QR=''
        
      }
    }
      
    
      removeAt(index: number) {
        this.dataSource.data.splice(index, 1);
        this.table.renderRows();
      }
}
export interface User {
  name: string;
}