import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NotificationService } from '@app/services/notification/notification.service';
import {MatTable, MatTableModule,MatTableDataSource, } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Equipo } from '@app/models/backend/equipo';
import { CiclosequipoService } from '@app/services/ciclosequipo/ciclosequipo.service';
import { EquipoService } from '@app/services/equipo/equipo.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { DialogService } from '@app/services/dialog/dialog.service';
import { CicloService } from '@app/services/ciclo/ciclo.service';
import { Observable, ReplaySubject, Subscription, from, map, startWith } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Ciclo } from '@app/models/backend/ciclo';
import { CommonModule, DatePipe } from '@angular/common';
import { CuentaregresivaService } from '@app/services/cuentaregresiva/cuentaregresiva.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetService, TurnoService } from '@app/services';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { UserResponse } from '@app/store/user';

import { EventoEsterilizacion, EventoEsterilizacionRequest } from '@app/models/backend/eventoesterilizacion';

import { EventoesterilizacionService } from '@app/services/eventoesterilizacion/eventoesterilizacion.service';
import {  MaterialesterilizadorService} from '@app/services/materialesterilizador/materialesterilizador.service';


import {DataSource} from '@angular/cdk/collections';


export interface esterilizadorTable {
  Id: number;
  Paquete: string;
  Cantidad: number;
  Turno: number;
  FechaE: string;
  FechaC: string;
}  



@Component({
  selector: 'app-detalleesterilizador',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonModule, MatTableModule
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './detalleesterilizador.component.html',
  styleUrl: './detalleesterilizador.component.scss'
})



  

export class DetalleesterilizadorComponent implements OnInit {

  @Input()  EquipoADetallar!: string;
  //EquipoADetallar=1;

  @ViewChild(MatTable, {static: false}) table!: MatTable<esterilizadorTable>;
 
  public ELEMENT_DATA:  esterilizadorTable[] = [ ];
  
  displayedColumns: string[] = ['Id', 'Paquete', 'Cantidad', 'Icon','Accion'];

  timerService = inject(CuentaregresivaService);

  activationDeadline: any;
  remainingTime : any;
  subscriptionToTimer!: Subscription;
  myControl = new FormControl<string | listaCiclo>('');
  options: listaCiclo[] = [];
  elementoRecibido!: listaCiclo;
  filteredOptions!: Observable<listaCiclo[]>;
  ciclosDelEquipo!: Ciclo[];
  equipoAOperar!: Equipo;
  cicloVigente!: Ciclo;
  tiempoFinal!: Date;

  respuesta:string='';
  InsidenciaValor:string='';
  InsidenciaComentario:string='';

  constructor ( private dialogService: DialogService,
                private ciclosequipoService: CiclosequipoService,
                private cicloService: CicloService,
                public datePipe: DatePipe,
                private _snackBar: MatSnackBar,
                private setElement: SetService,
                private turnoService: TurnoService,
                private equiposServicio: EquipoService,
                
                private dataService: DialogService,
                private notification: NotificationService,
                private store: Store<fromRoot.State>, 
                private eventoesterilizacion:EventoesterilizacionService,
                private materialEsterilizador: MaterialesterilizadorService
  ){
    this.dataService.data$.subscribe(data => {
      var cortado = data
      var cortado2 = cortado.split(':', 3)
      this.respuesta = cortado2[0]
      this.InsidenciaValor = cortado2[1]
      this.InsidenciaComentario = cortado2[2]


      console.log('hola soy la respuesta:   ' + this.respuesta)
      console.log('hola soy la la insicencia:   ' + this.InsidenciaValor)
      console.log('hola soy la el comentario extra:   ' + this.InsidenciaComentario)
    })
  
  }

dataSource!: MatTableDataSource<esterilizadorTable>;
nombreequipo:string="";
endTime:any;

stop() {
  this.remainingTime=0;
  this.endTime=0;
  this.bloquear=false
  localStorage.removeItem('est'+ this.EquipoADetallar)
  localStorage.removeItem('Usuario'+ this.EquipoADetallar )
  localStorage.removeItem('horaActual'+ this.EquipoADetallar )
  localStorage.removeItem('FechaActual'+ this.EquipoADetallar)
  localStorage.removeItem('TempM'+ this.EquipoADetallar)
  localStorage.removeItem('CicloN'+ this.EquipoADetallar)
}
FechaInicioA='';
FechaFinalA='';
FechaFinalB='';
HoraInicioR=''
HoraInicioR1:any;
HoraFinal='';
UsuarioInicial='';
UsuarioInicial2='';
UsuarioFinal='';
tiempof='';
start() {
  this.CicloCuenta = this.CicloCuenta+1;
  this.bloquear = true;
  let terminado = false
  this.endTime = localStorage.getItem('est'+ this.EquipoADetallar) ?? new Date().toString(); 
  this.activationDeadline = new Date(Date.parse(this.endTime) + 60 * this.valuer1 * 1000);
  this.subscriptionToTimer = this.timerService.getRemainingTimeObservable(this.activationDeadline)
    .subscribe({
      next : time => {
        this.remainingTime = time;
        terminado = false
      //console.log(this.remainingTime)
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log('Observable completed')
        terminado = true
        this.bloquear=false
        this.remainingTime=0;
        localStorage.removeItem('est'+ this.EquipoADetallar )
        this.bloquear2 = false;
        
      }
    })
    if (terminado == false) {
      localStorage.setItem('est'+ this.EquipoADetallar, this.activationDeadline )
   
    }
    else {
      localStorage.removeItem('est'+ this.EquipoADetallar)

    }



    //console.log(this.activationDeadline)

    this.HoraInicioR1 = this.time.toString().split(" ", 5)
    this.HoraInicioR1 = this.HoraInicioR1[4]


    this.FechaInicioA = fechaA

    this.FechaFinalA= this.activationDeadline.toString().split(" ", 5)
    this.HoraFinal = this.FechaFinalA[4]
    this.FechaFinalB = this.FechaFinalA[2]+ '/' + this.FechaFinalA[1] + '/'+ this.FechaFinalA[3]
    this.FechaFinalB = (this.datePipe.transform(this.FechaFinalB, 'dd-MM-yyyy')!).toString()!;
    this.FechaFinalB = this.FechaFinalB.split('-').join('/');
    this.UsuarioInicial2 = this.usuario?.nombre.toString()! + ' ' + this.usuario?.paterno.toString()!

    }



    Turno1: number = 0;
    TurnoAct:number = 0;
    hora=horaA;
    intervalId:any;
    time = new Date();
    tempo1=0;
    tempo2=0;
  ngOnInit(): void {


    this.equiposServicio.traerUNequipo(Number(this.EquipoADetallar)).subscribe((DatosEst)=>{
      let esterilizadorDatos ={
        Estatus: DatosEst.estatus,
        Id: DatosEst.id,
        Marca: DatosEst.marca,
        Modelo: DatosEst.modelo,
        Nombre: DatosEst.nombre,
        Numero: DatosEst.numero,
        NumeroSerie: DatosEst.numero_serie,
        Prueba: DatosEst.prueba
      }

      this.MarcaEst=esterilizadorDatos.Marca;
      this.ModeloEst = esterilizadorDatos.Modelo;
      this.NumeroSreieEst=esterilizadorDatos.NumeroSerie;
      
})



  this.eventoesterilizacion.traereventoesterilizacion(Number(this.EquipoADetallar)).subscribe(InfoEvento=>{
    InfoEvento.forEach((ids)=>{

  if (ids.id > this.tempo1){
    this.tempo1 = ids.id;
  }

  this.eventoesterilizacion.traerUNeventoesterilizacion(this.tempo1).subscribe((datosInicio)=>{
    let datosInicio2 ={
      nombreInicio: datosInicio.perfil_inicio,
      fechaInicio: datosInicio.fecha_inicio,
      horaInicio: datosInicio.hora_inicio,

      nombreFinal: datosInicio.perfil_final,
      fechaFinal: datosInicio.fecha_final,
      horaFinal: datosInicio.hora_final,

      horaCiclo: datosInicio.ciclo.duracion,
      nombreCiclo: datosInicio.ciclo.nombre,
      ciclo:datosInicio.ciclo,

      cuenta: datosInicio.cicloDiario,
    }
    
        this.UsuarioInicial2 = datosInicio2.nombreInicio;
        this.FechaInicioA = datosInicio2.fechaInicio;
        this.HoraInicioR1 = datosInicio2.horaInicio;

        this.UsuarioFinal = datosInicio2.nombreFinal,
        this.FechaFinalB = datosInicio2.fechaFinal
        this.HoraFinal = datosInicio.hora_final;
    
        this.CicloNombre = datosInicio2.ciclo
        if (fechaA == this.FechaInicioA ){
          this.CicloCuenta= datosInicio2.cuenta
        }
        else{
          this.CicloCuenta =0;
        }
       
        
  })

   })

   
  })

  this.materialEsterilizador.traermaterialesterilizador(Number(this.EquipoADetallar)).subscribe(InfoMaterial =>{
      InfoMaterial.forEach((ids2)=>{
        if (ids2.id > this.tempo2)
          {
            this.tempo2=ids2.id
          }
          
       
          this.materialEsterilizador.traerUNmaterialesterilizador(this.tempo2).subscribe(valorT=>{
            let valorT2: esterilizadorTable={
              Id: valorT.setId,
              Paquete: valorT.nombreSet,
              Cantidad: valorT.cantidad,
              Turno: valorT.turno, 
              FechaE:fechaA,
              FechaC: fechaB,
                       
            }
            this.ELEMENT_DATA.push(valorT2)
             
           //// console.log(valorT2)
            var Cantidades = this.ELEMENT_DATA.map(data => data.Cantidad )
            this.NumeroPaquete = Cantidades.reduce((a,b) => a+b )
            console.log('***************************************')
            console.log (this.ELEMENT_DATA)
            this.dataSource.data = this.ELEMENT_DATA 
        })

      })

    
  })
 
//console.log ('valor tempo  '+ this.tempo1)







 
    
    this.recargar()
   
    if (horaA >= 7 && horaA < 14 ) {this.Turno1 = 1;}

    if (horaA >=14  && horaA < 21 ) { this.Turno1 = 2;}

    if (horaA >=21  && horaA < 7 ){this.Turno1 = 3;}
 console.log (horaA)


    this.endTime = localStorage.getItem('est'+ this.EquipoADetallar)
    if (this.endTime != null) {
  this.activationDeadline = new Date(Date.parse(this.endTime) + 60 * this.valuer1 * 1000);
  this.subscriptionToTimer = this.timerService.getRemainingTimeObservable(this.activationDeadline)
    .subscribe({
      next : time => {
        this.remainingTime = time;
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log('Observable completed')
        console.log('Observable completed')
        this.bloquear=false
        this.remainingTime=0;
        localStorage.removeItem('est'+ this.EquipoADetallar )
         this.bloquear2 = false;
      }
    })
  }

    this.ciclosequipoService.traerciclosequipo(Number(this.EquipoADetallar)).subscribe(ciclosdelequipo => {
      this.equipoAOperar=ciclosdelequipo[0].equipo
      ciclosdelequipo.forEach((ciclodelequipo) => {
        let listaciclo: listaCiclo = {
          nombre: ciclodelequipo.ciclo.id.toString()+' '+ciclodelequipo.ciclo.nombre
        }
        this.options.push(listaciclo)
        this.nombreequipo = this.equipoAOperar.nombre
      })
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const nombre = typeof value === 'string' ? value : value?.nombre;
          return nombre ? this._filter(nombre as string) : this.options.slice();
        }),
      );
    })



    this.valuer1 =  Number(localStorage.getItem('TempM'+ this.EquipoADetallar)! )
    if (this.valuer1 >= 1){
      this.bloquear=true;
    }
/*     this.FechaInicioA =  localStorage.getItem('FechaActual'+ this.EquipoADetallar)!
    this.CicloCuenta =  Number(localStorage.getItem('CicloCuenta'+ this.EquipoADetallar))!
    this.CicloNombre =  localStorage.getItem('CicloN'+ this.EquipoADetallar)!
    this.HoraInicioR =  localStorage.getItem('horaActual'+ this.EquipoADetallar)!
    this.UsuarioInicial=  localStorage.getItem('Usuario'+ this.EquipoADetallar)!
    this.FechaFinalA= this.activationDeadline.toString().split(" ", 5)
    this.HoraFinal = this.FechaFinalA[4].split(':').slice(0,2).join(':')
    this.FechaFinalB = this.FechaFinalA[2]+ '/' + this.FechaFinalA[1] + '/'+ this.FechaFinalA[3]
    this.FechaFinalB = (this.datePipe.transform(this.FechaFinalB, 'dd-MM-yyyy')!).toString()!;
    this.FechaFinalB = this.FechaFinalB.split('-').join('/') */;

    
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  }

  private _filter(name: string): listaCiclo[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  
  elementoElegido(recibido: listaCiclo) {
    this.elementoRecibido = recibido;
    let separado = this.elementoRecibido.nombre.split(' ', 3)
    this.cicloService.traerUNciclo(Number(separado[0])).subscribe((cicloelegido)=> {

      var splitted = cicloelegido.duracion.split(':',3)
      
      this.CicloNombre = cicloelegido

      this.cicloVigente = cicloelegido

      //this.valuer1 = Number(splitted[1])

      this.valuer1= (Number(splitted[0]) * 60 )+ Number(splitted[1])

      console.log(cicloelegido)
      this.display= this.valuer1

      this.tiempoFinal = addMinutes(new Date, this.valuer1)
      this.datePipe.transform(this.tiempoFinal, 'mediumDate', '', 'es-MX')
 
    })
    
  }
  displayFn(listaciclo: listaCiclo): string {
    return listaciclo && listaciclo.nombre ? listaciclo.nombre : '';
  }
  valueQR = '';
  ValorID="";
  Valorfch="";
  valorres="";

  numciclo=10;
  valuer1=1;
  valuer=10;
  interval:any;
  bloquear: boolean = false;
  bloquear2: boolean = true;


  display: any =10;
  public timerInterval: any;
  Esterilizador1 = new FormGroup({
    Esterilizador: new FormControl(''),
    Ciclo: new FormControl(''),
    QR: new FormControl(''),
    
  });

  Esterilizador = new FormGroup({
    TicketPrueBio: new FormControl(''),
    NumCarga: new FormControl(''),
    PruebaBio: new FormControl(''),
    PruebaQuim: new FormControl(''),
  });


  NumeroPaquete=0;



 
  Subir() {
    //_____________________________________________________________________________________________________________________________________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________//
    //___________________________________________      cambiar los valores de los splice por los identificadores que eligió     ___________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________//
  
    
       
    
       this.valueQR = this.Esterilizador1?.get('QR')?.value!
      
       var splitted = this.valueQR.split(".", 3)
       
       this.ValorID= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
       
       this.Valorfch = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
       
       this.valorres =  splitted[2]
       
       
           let comparable = this.dataSource.data.filter((IDcomp) => IDcomp.Id == Number(this.ValorID))
           
       
           if (comparable.length > 0 ){
            let num = 0;
            this.dataSource.data.forEach(data =>{
              if (data.Id  == Number(this.ValorID )) {
                this.dataSource.data[num].Cantidad = this.dataSource.data[num].Cantidad+1
              }
              var Cantidades = this.dataSource.data.map(data => data.Cantidad )
              this.NumeroPaquete = Cantidades.reduce((a,b) => a+b )

              num++
              
            })
         
                //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
         
                this.Esterilizador1.value.QR=''
             }
       
              //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
 
           else{
             var tickets = Number(this.ValorID)
             this.setElement.traerUNset(tickets).subscribe(setRecibidos=> {
         
                 let setAgregar ={
                   Id: setRecibidos.id,
                   Paquete: setRecibidos.nombre,
                   Cantidad: 1,
                   Turno:this.Turno1, 
                   FechaE:fechaA,
                   FechaC: fechaB,
                 }
                 
                 this.dataSource.data.push(setAgregar)
                 this.table.renderRows();
               
                 this.NumeroPaquete =  this.NumeroPaquete+1
             })
               this.Esterilizador1.value.QR=''
           
         }

      }

   
  
      removeAt(index: number) {
        this.dataSource.data.splice(index, 1);
        this.table.renderRows();
      }
    
      tipoOperacion : number = 0;
      private lazyLoadBeta$ = from(
        import('@app/services/dialog/components/dialogo/dialogo.component').then(
          (component) => component.DialogoComponent
        )
      );
      emergente1() {
        this.dialogService.showDialog3(this.lazyLoadBeta$);
        this.tipoOperacion = 2
      }
  


      limpiarEsterilizador(){
        this.notification.success("Esterilizador Limpiado!");
        console.log('borrando')
        this.UsuarioInicial2 = ''
        this.FechaInicioA = ''
        this.HoraInicioR1 = ''

        this.UsuarioFinal = ''
        this.FechaFinalB = ''
        this.HoraFinal = ''
    
        this.CicloNombre = null! 

        this.ELEMENT_DATA =[];
        this.dataSource.data=[];

        console.log(this.dataSource.data);

        console.log('////////////////////////////////////////////////////////////////');
        console.log(this.ELEMENT_DATA);
      }
    

      
      removeData() {
        this.dataSource.data.pop();
        console.log('borrando')
        this.table.renderRows();
      }

      // **************************** TIMER *************************



      
    
      timer(minute: number) {
        // let minute = 1;
        let seconds: number = minute * 60;
        let textSec: any = '0';
        let statSec: number = 60;
    
        const prefix = minute < 10 ? '0' : '';
    
        this.timerInterval = setInterval(() => {
          seconds--;
          if (statSec != 0) statSec--;
          else statSec = 59;
    
          if (statSec < 10) {
            textSec = '0' + statSec;
          } else textSec = statSec;
    
          this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
    
          if (seconds == 0) {
            console.log('finished');
            clearInterval(this.timerInterval);
          }
        }, 1000);
      }

   


  usuario: UserResponse | null = null;
  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));  
       // console.log(this.usuario) 
    });}
  //_____________________________________________________________________________________________________________________________________________________________________//
//_____________________________________________________________________________________________________________________________________________________________________//
//______________________________________      valores para el reporte y la prueba biologica y el folio de la prueba quimica     _______________________________________//
//_____________________________________________________________________________________________________________________________________________________________________//
//_____________________________________________________________________________________________________________________________________________________________________//

Valuegen = '';

valor1="";
valor2="";
valor3="";
valor4="";
valor5="";
valor6="";
valor7="";

Avalor1="";
Avalor2="";
Avalor3="";
Avalor4="";
Avalor5="";
Avalor6="";
Avalor7="";

submit(){

  
    // arreglo para el valor del folio
    this.Valuegen=this.Esterilizador?.get('PruebaBio')?.value!;
    const valor1_1 =  this.Valuegen.split("(01)").splice(1)  .join("")
    this.valor1 = valor1_1.split(  "(17)"  ).slice(-10,1).join("")
    this.valor1 = this.valor1.split(  "(11)"  ).slice(-10,1).join("")
    this.valor1 =this.valor1.split(  "(251)"  ).slice(-10,1).join("")
    this.valor1 = this.valor1.split(  "(91)"  ).slice(-10,1).join("")
    this.valor1 = this.valor1.split(  "(240)"  ).slice(-10,1).join("")
    this.valor1 = this.valor1.split(  "(10)"  ).slice(-10,1).join("")


    if (this.valor1 == ''){
    this.Avalor1= 'Sin Definir'

    }else
    {
      this.Avalor1 = this.valor1
    }

    // arreglo para el valor de la caducidad
    const valor2_1 =  this.Valuegen.split("(17)").slice(1).join("")
    this.valor2 = valor2_1.split(  "(11)"  ).slice(-10,1).join("")
    this.valor2 = this.valor2.split ( "(01)").slice(-10,1).join("")
    this.valor2 = this.valor2.split ("(10)").slice(-10,1).join("")
    this.valor2 = this.valor2.split ("(240)").slice(-10,1).join("")
    this.valor2 = this.valor2.split ("(251)").slice(-10,1).join("")
    this.valor2 = this.valor2.split ("(91)").slice(-10,1).join("")


    if (this.valor2 == ''){
    this.Avalor2= 'S/N'

    }else
    {
      this.Avalor2 = this.valor2[4]+ this.valor2[5]+ "/"+this.valor2[2]+this.valor2[3]+ "/20"+this.valor2[0]+this.valor2[1]
    }


    // arreglo para el valor de la fabricacion
    const valor3_1 =  this.Valuegen.split("(11)").slice(1).join("")
    this.valor3 = valor3_1.split(  "(251)"  ).slice(-10,1).join("")
    this.valor3 = this.valor3.split ( "(01)").slice(-10,1).join("")
    this.valor3 = this.valor3.split ("(10)").slice(-10,1).join("")
    this.valor3 = this.valor3.split ("(240)").slice(-10,1).join("")
    this.valor3 = this.valor3.split ("(17)").slice(-10,1).join("")
    this.valor3 = this.valor3.split ("(91)").slice(-10,1).join("")

    if (this.valor3 == ''){
    this.Avalor3= 'S/N'

    }else
    {
      this.Avalor3 = this.valor3[4]+ this.valor3[5]+ "/"+this.valor3[2]+this.valor3[3]+ "/20"+this.valor3[0]+this.valor3[1]
    }


    // arreglo para el valor de la marca
    const valor4_1 =  this.Valuegen.split("(251)").slice(1).join("")
    this.valor4 = valor4_1.split(  "(11)"  ).slice(-10,1).join("")
    this.valor4 = this.valor4.split ( "(01)").slice(-10,1).join("")
    this.valor4 = this.valor4.split ("(10)").slice(-10,1).join("")
    this.valor4 = this.valor4.split ("(240)").slice(-10,1).join("")
    this.valor4 = this.valor4.split ("(17)").slice(-10,1).join("")
    this.valor4 = this.valor4.split ("(91)").slice(-10,1).join("")

    if (this.valor4 == ''){
    this.Avalor4= 'Sin Definir'

    }else
    {
      this.Avalor4 = this.valor4
    }

    // arreglo para el valor de la marca2
    const valor5_1 =  this.Valuegen.split("(91)").slice(1).join("")
    this.valor5 = valor5_1.split(  "(11)"  ).slice(-10,1).join("")
    this.valor5 = this.valor5.split ( "(01)").slice(-10,1).join("")
    this.valor5 = this.valor5.split ("(10)").slice(-10,1).join("")
    this.valor5 = this.valor5.split ("(240)").slice(-10,1).join("")
    this.valor5 = this.valor5.split ("(17)").slice(-10,1).join("")
    this.valor5 = this.valor5.split ("(251)").slice(-10,1).join("")

    if (this.valor5 == ''){
    this.Avalor5= 'Sin Definir'

    }else
    {
      this.Avalor5 = this.valor5
    }

    // arreglo para el valor del Modelo
    const valor6_1 =  this.Valuegen.split("(240)").slice(1).join("")
    this.valor6 = valor6_1.split(  "(11)"  ).slice(-10,1).join("")
    this.valor6 = this.valor6.split ( "(01)").slice(-10,1).join("")
    this.valor6 = this.valor6.split ("(10)").slice(-10,1).join("")
    this.valor6 = this.valor6.split ("(91)").slice(-10,1).join("")
    this.valor6 = this.valor6.split ("(17)").slice(-10,1).join("")
    this.valor6 = this.valor6.split ("(251)").slice(-10,1).join("")

    if (this.valor6 == ''){
    this.Avalor6= 'Sin Definir'

    }else
    {
      this.Avalor6 = this.valor6
    }

    // arreglo para el valor del Lote
    const valor7_1 =  this.Valuegen.split("(10)").slice(-1).join("")
    this.valor7 = valor7_1.split(  "(11)"  ).slice(-10,1).join("")
    this.valor7 = this.valor7.split ( "(01)").slice(-10,1).join("")
    this.valor7 = this.valor7.split ("(240)").slice(-10,1).join("")
    this.valor7 = this.valor7.split ("(91)").slice(-10,1).join("")
    this.valor7 = this.valor7.split ("(251)").slice(-10,1).join("")
    this.valor7 = this.valor7.split ("(17)").slice(-10,1).join("")
    this.valor7 = this.valor7.split ("(251)").slice(-10,1).join("")

    if (this.valor7 == ''){
    this.Avalor7= 'Sin Definir'

    }else
    {
      this.Avalor7 = this.valor7
    }


    }



    editarEventoLavado():EventoEsterilizacion{
      const tickerCapturado: EventoEsterilizacion = {
      id: this.tempo1,
      perfil_inicio: this.UsuarioInicial2,
      hora_inicio: this.HoraInicioR1,
      fecha_inicio: this.FechaInicioA,
      perfil_final: this.usuario?.nombre! + ' ' + this.usuario?.paterno!,
      hora_final: this.HoraFinal,
      fecha_final: this.FechaFinalB,
      ciclo: this.CicloNombre,
      cicloDiario: this.CicloCuenta,
      id_esterilizador: Number(this.EquipoADetallar),
      
      };
      return tickerCapturado;
    }
    //_____________________________________________________________________________________________________________________________________________________________________//
//_____________________________________________________________________________________________________________________________________________________________________//
//_______________________________________      Datos que aparecerán por defecto, estos pueden venir desde la base de datos     ________________________________________//
//_____________________________________________________________________________________________________________________________________________________________________//
//_____________________________________________________________________________________________________________________________________________________________________//

  cantidadPaquetes="5";
  nombrejefa= "María Dolores Rodríguez Ramírez";
  numSerie = '25616521';
  fechaCaducidad = '12/10/2023';
  fechaFabricacion = '10/08/2023';
  marca = 'BTM';
  modelo = 'STERIVAP';
  lote = 'SD';
  tipoCiclo = "Universal";
  tiempoCiclo = "10";
  fechaInicio = "10/10/2024";
  horaInicio = "10:50";
  nombreOperador = "Hugo Rodriguez";
  pruebaBiologica = ""
  modeloprueba = 'Sin Definir';
  resultado = "N/A";
  numCarga = "";
  numCicloDiario = "111";
  fechaFin = "10/10/2024";
  horaFin = "10:50";
  nombreOperadorFin = "Hugo Rodriguez";

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });
  }

  MarcaEst='';
  ModeloEst = '';
  NumeroSreieEst='';
  CicloNombre!:Ciclo;
  CicloCuenta=0;
  async createPDF(){
/* 
    let datosAeditar= this.editarEventoLavado();

    this.eventoesterilizacion.editareventoesterilizacion(datosAeditar, datosAeditar.id).subscribe((valores)=>{
      console.log('////////////////')
      console.log(valores)
      console.log('////////////////')
    }) */
    //_____________________________________________________________________________________________________________________________________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________//
    //__________________________________________      Aquí cambiara los datos por los que generamos en la parte del verificado    _________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________// 


/*     localStorage.removeItem('est'+ this.EquipoADetallar)
    localStorage.removeItem('Usuario'+ this.EquipoADetallar )
    localStorage.removeItem('horaActual'+ this.EquipoADetallar )
    localStorage.removeItem('FechaActual'+ this.EquipoADetallar)
    localStorage.removeItem('TempM'+ this.EquipoADetallar)
    localStorage.removeItem('CicloN'+ this.EquipoADetallar)
 */
    /////------------------------------- datos esterilizador
          this.cantidadPaquetes=this.NumeroPaquete!.toString();
          this.marca = this.MarcaEst;
          this.modelo = this.ModeloEst;
          this.numSerie = this.NumeroSreieEst;
          this.tiempoCiclo = this.CicloNombre.duracion;
          this.tipoCiclo = this.CicloNombre.nombre;
          this.numCicloDiario = this.CicloCuenta.toString();
    /////------------------------------- datos pruebas
    
    
          this.UsuarioFinal = this.usuario?.nombre.toString()! + ' ' + this.usuario?.paterno.toString()!,
          this.modeloprueba=this.Avalor6;
          this.fechaCaducidad=this.Avalor3;
          this.lote=this.Avalor7;
          this.numCarga = this.numCarga=this.Esterilizador?.get('NumCarga')?.value!;
          this.pruebaBiologica = this.pruebaBiologica=this.Esterilizador?.get('TicketPrueBio')?.value!;
    

  /////------------------------------- ciclo de inicio
          this.horaInicio= this.HoraInicioR1;
          this.fechaInicio = this.FechaInicioA;
          this.fechaFabricacion=this.Avalor3;
          this.nombreOperador = this.UsuarioInicial2.toString()!
 /////------------------------------- ciclo de fin
          this.fechaFin = this.FechaFinalB;
          this.horaFin = this.HoraFinal
          this.nombreOperadorFin = this.UsuarioFinal;




        const pdfDefinition: any = {
    
          
          pageSize: 'LETTER',
          pageMargins: [0, 620, 30, 60],
    
          background: [
            {
              "image":"logo",
                width: 90,
                margin:[30,35,0,0]
            },
    
            {
              "image":"logo",
                width: 550,
                margin:[30,80,0,0],
                opacity: 0.1
            }
          ],
    
          header:[
         
            {text: 'INSTITUTO NACIONAL DE CIENCIAS MÉDICAS Y NUTRICIÓN SALVADOR ZUBIRÁN', style: 'header2'},
            {text: 'SUBDIRECCIÓN DE ENFERMERÍA: '+this.nombrejefa, style: 'header'},
            {text: 'DEPARTAMENTO DE ENFERMERÍA', style: 'header'},
            {text: 'CENTRAL DE EQUIPOS Y ESTERILIZACIÓN', style: 'header'},
            {text: 'Fecha de Impresión: '+dia +' de '+ mes2 +' del '+ año +', '+ hora + ':' + minutos + 'hrs', style: 'header3'},
            {text: 'BITÁCORA DE ESTERILIZACIÓN ', style: 'header2'},
            
    
          //----Datos de la bitacora}
          {text: 'DATOS DE ESTERILIZADOR',style: 'content0'},
          {text: 'Marca:',style: 'content1'},
          {text: 'Modelo:',style: 'content2'},  
          {text: 'Número de serie:',style: 'content3'},
          {text: ' '+this.marca,style: 'content1b'},
          {text: ' '+this.modelo  ,style: 'content2b'},  
          {text: ' '+this.numSerie,style: 'content3b'},
    
          {text: 'Tipo de ciclo:',style: 'content1'},
          {text: 'Tiempo de Ciclo:',style: 'content2'},
          {text: ' '+this.tipoCiclo,style: 'content1b'},
          {text: ' '+this.tiempoCiclo  ,style: 'content2b'},
    
          {text: 'INICIO DE CICLO DE ESTERILIZACIÓN',style: 'content0'},
          {text: 'Fecha:',style: 'content1'},
          {text: 'Hora:',style: 'content2'},  
          {text: 'Nombre operador:',style: 'content3'},
          {text: ' '+this.fechaInicio ,style: 'content1b'},
          {text: ' '+this.horaInicio ,style: 'content2b'},
          {text: ' '+this.nombreOperador,style: 'content3b'},

          
          {text: 'FIN DE CICLO DE ESTERILIZACIÓN',style: 'content0'},
          {text: 'Fecha:',style: 'content1'},
          {text: 'Hora:',style: 'content2'},  
          {text: 'Nombre operador:',style: 'content3'},
          {text: 'Firma del  operador:',style: 'content4'},
          {text: ' '+this.fechaFin ,style: 'content1b'},
          {text: ' '+this.horaFin,style: 'content2b'},
          {text: ' '+this.nombreOperadorFin,style: 'content3b'},

          {text: 'Número de Paquetes Esterilizados: '+ this.cantidadPaquetes ,style: 'content5'},

          {text: 'Lote:',style: 'content1'},
          {text: 'Modelo:',style: 'content2'},  
          {text: 'Fecha de fabricación:',style: 'content3'},
          {text: 'Fecha de caducidad:',style: 'content4'},
          {text: ' '+this.lote,style: 'content1b'},
          {text: ' '+this.modeloprueba  ,style: 'content2b'},  
          {text: ' '+this.fechaFabricacion,style: 'content3b'},
          {text: ' '+this.fechaCaducidad,style: 'content4b'},
    
    
          {text: 'Número de ticket de prueba biológica: ' +this.pruebaBiologica ,style: 'content5'},
    
          {text: 'Resultado de la prueba biológica: ' +this.resultado ,style: 'content5'},
    
          {text: 'Núm. Carga:',style: 'content1'},
          {text: 'Número de ciclo diario:',style: 'content2'},
          {text: ' '+this.numCarga,style: 'content1b'},
          {text: ' '+this.numCicloDiario  ,style: 'content2b'},
    
     
    
          
    
          {text: 'MATERIALES ESTERILIZADOS ', style: 'header2'},
    
          {
            style: 'tableExample', margin:[0,20,30,0],
            table: {
              widths: ['20%','20%','15%','15%','15%','15%'],
              body: [
                ['ID', 'Paquete','cantidad', 'Turno', 'Fecha de Elaboración', 'Fecha de Caducidad'],
              ]
            },layout: 'noBorders'
          },
    
          ],
    
          content: [
            
    
    
             table(this.dataSource.data, ['Id', 'Paquete','Cantidad', 'Turno', 'FechaE','FechaC'], ),
        ],
        
      images:{
        
        "logo" : await this.getBase64ImageFromURL(
            "../../assets/generales/Logo_nutricion.png")
          
      },
        styles: {
    
          header: {
            fontSize: 11,
            bold: true,
            margin: [40, 7, 0, 0],
            alignment: "center",
            color: 'black',
            position:'fixed',
          },
          header2: {
            fontSize: 11,
            bold: true,
            margin: [40, 20, 0, 0],
            alignment: "center",
            color: 'black',
            position:'fixed',
           
          },
          header3: {
            fontSize: 11,
            bold: true,
            margin: [0, 27, 40, 0],
            alignment: "right",
            color: 'black',
            position:'fixed',
          },
          content0: {
            fontSize: 11,
            bold: true,
            margin: [80, 15, 0,0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content1: {
            fontSize: 11,
            bold: true,
            margin: [50, 1, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content2: {
            fontSize: 11,
            bold: true,
            margin: [125, -12, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content3: {
            fontSize: 11,
            bold: true,
            margin: [210, -12, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content4: {
            fontSize: 11,
            bold: true,
            margin: [330, -12, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content5: {
            fontSize: 11,
            bold: true,
            margin: [50, 10, 0, 10],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content1b: {
            fontSize: 11,
            bold: false,
            margin: [50, 0, 20, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content2b: {
            fontSize: 11,
            bold: false,
            margin: [125, -12, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content3b: {
            fontSize: 11,
            bold: false,
            margin: [210, -12, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          content4b: {
            fontSize: 11,
            bold: false,
            margin: [330, -12, 0, 0],
            alignment: "left",
            color: 'black',
            position:'fixed',
          },
          
          footer: {
            fontSize: 10,
            margin: [0, 0, 0, 0],
            alignment: "center",
            color: 'black',
            position:'fixed',
          },
          tableExample: {
            fontSize: 11,
            bold: true,
            margin: [0, -15, 0, 0],
            alignment : 'center',
            color: 'black'
          },
        
        },
        
        footer:[
          
          {text: 'TRACY © '+año, style: 'footer'},
        ]
        }
          
        
     
        const pdf =  pdfMake.createPdf(pdfDefinition);
        //pdf.download('Bitacora de Esterilizacion '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
        pdf.open()
        
      }



      openSnackBar() {
        this.notification.success("Condirmado!");
      }

      openSnackBar2() {
        this.notification.error("Rechazado!");
      }




      SubirDatosEsterilizador(){
        this.notification.success("Datos Guardados!");

        let eventoEsterilizacion: EventoEsterilizacionRequest = {
          perfil_inicio: this.usuario?.nombre.toString() + ' ' + this.usuario?.paterno.toString(),
          hora_inicio: this.HoraInicioR1,
          fecha_inicio: this.FechaInicioA,
          perfil_final: '',
          hora_final: this.HoraFinal,
          fecha_final: this.FechaFinalB,
          ciclo: this.CicloNombre,
          cicloDiario: this.CicloCuenta,
          id_esterilizador: Number(this.EquipoADetallar) ,
        }



       this.eventoesterilizacion.altaeventoesterilizacion(eventoEsterilizacion, this.CicloNombre.id).subscribe((respuesta)=>{
       // console.log(respuesta)
          this.ELEMENT_DATA =  this.dataSource.data
          this.ELEMENT_DATA.forEach(e=>{
            let Valores ={
              setId: Number(e.Id),
              nombreSet: e.Paquete,
              cantidad: Number(e.Cantidad),
              turno: Number(this.Turno1), 
              eventoesterilizador:  Number(respuesta.id),
              id_esterilizador: Number(this.EquipoADetallar) 
            }
            this.materialEsterilizador.altamaterialesterilizador(Valores).subscribe(dataMterial => {
          
            console.log(Valores)
          })

     
         
          
         })

        })

      }









}


export interface listaCiclo {
  nombre: string;
}


const date = new Date();

const año = date.getFullYear();
const mes = date.toLocaleString('default', { month: 'numeric' });
const mes2 = date.toLocaleString('default', { month: 'long' });
const dia = date.getDate(); 
const hora = date.getHours();
const minutos = date.getMinutes();
const horaA =   date.getHours()
const horaA1 =   date.getHours() +':'+ ('0' + (date.getMinutes())).slice(-2) 
const fechaA =dia +'/'+ ('0' + (date.getMonth() + 1)).slice(-2)  +'/'+ año ;
const fechaB =dia +'/'+ ('0' + (date.getMonth() + 3)).slice(-2)  +'/'+ año ;



function table(data: { [x: string]: { toString: () => any; }; }[] | { Id:number; Paquete:string; Cantidad:number; Turno:number; FechaE:string; FechaC:string; }[], columns: (string | number)[]) {
  return {
    style: 'tableExample',
      table: {
        widths: ['20%','20%','15%','15%','15%','15%'],
          body: buildTableBody(data, columns),
      },layout: 'noBorders'
    
  };




  
  
}


function buildTableBody(data: { [x: string]: { toString: () => any; }; }[], columns: (string | number)[]) {
  var body: any[][] = [];


  data.forEach(function(row: { [x: string]: { toString: () => any; }; }) {
      var dataRow: any[] = [];

      columns.forEach(function(column: string | number) {
        dataRow.push({text : row[column].toString(), alignment : 'center', color : 'black', bold:false, fontSize: 9, margin: [0, 10, 0, 0]});
      })

      body.push(dataRow, );
  });

  return body;
}
function addMinutes(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}







