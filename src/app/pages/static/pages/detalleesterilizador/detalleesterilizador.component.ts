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
import {MatTable, MatTableModule,MatTableDataSource, } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Equipo } from '@app/models/backend/equipo';
import { CiclosequipoService } from '@app/services/ciclosequipo/ciclosequipo.service';
import { EquipoService } from '@app/services/equipo/equipo.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { DialogService } from '@app/services/dialog/dialog.service';
import { CicloService } from '@app/services/ciclo/ciclo.service';
import { Observable, Subscription, map, startWith } from 'rxjs';
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

export interface TablaAñadir2 {
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
    MatAutocompleteModule
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './detalleesterilizador.component.html',
  styleUrl: './detalleesterilizador.component.scss'
})



  

export class DetalleesterilizadorComponent implements OnInit {
  @Input()  EquipoADetallar!: string;


  ELEMENT_DATA:  any[] = [ ];
  dataSource = [...this.ELEMENT_DATA];
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

  constructor ( private dialogService: DialogService,
                private ciclosequipoService: CiclosequipoService,
                private cicloService: CicloService,
                public datePipe: DatePipe,
                private _snackBar: MatSnackBar,
                private setElement: SetService,
                private turnoService: TurnoService,
                    
                private store: Store<fromRoot.State>, 
  ){

    
  }

nombreequipo:string="";
endTime:any;

stop() {
  this.remainingTime=0;
  this.endTime=0;
  localStorage.removeItem('est'+ this.EquipoADetallar )
}


tiempof=0;
start() {
  let terminado = false
  this.endTime = localStorage.getItem('est'+ this.EquipoADetallar) ?? new Date().toString(); 
  this.activationDeadline = new Date(Date.parse(this.endTime) + 60 * this.valuer1 * 1000);
  this.subscriptionToTimer = this.timerService.getRemainingTimeObservable(this.activationDeadline)
    .subscribe({
      next : time => {
        this.remainingTime = time;
        terminado = false
      console.log(this.remainingTime)
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log('Observable completed')
        terminado = true
        this.bloquear=false
        this.remainingTime=0;
        localStorage.removeItem('est'+ this.EquipoADetallar )
        
      }
    })
    if (terminado == false) {
      localStorage.setItem('est'+ this.EquipoADetallar, this.activationDeadline )
    }
    else {
      localStorage.removeItem('est'+ this.EquipoADetallar)
    }



    console.log(this.activationDeadline)
    }



    Turno1: number = 0;
    TurnoAct:number = 0;
    hora=horaA;

  ngOnInit(): void {
    this.recargar()
   
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



  @ViewChild(MatTable) table!: MatTable<any>;
  

  removeAt(index: number) {
    this.dataSource.splice(index, 1);
    this.table!!!!!!!!.renderRows();
    console.log('borrando')
  }
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
       
       
           let comparable = this.dataSource.filter((IDcomp) => IDcomp.Id == Number(this.ValorID))
           
 
           if (comparable.length > 0 ){
            let num = 0;
            this.dataSource.forEach(data =>{
              if (data.Id  == Number(this.ValorID )) {
                this.dataSource[num].Cantidad = this.dataSource[num].Cantidad+1
              }
             
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
                 this.dataSource.push(setAgregar)
                 this.table.renderRows();
               
             })
               this.Esterilizador1.value.QR=''
           
         }

      
      }

      emergente1(){
        this.dialogService.emergente1()
      }
  



    
      removeData() {
        this.dataSource.pop();
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

    hacerSubmit() {
      this.bloquear = true;
  }


  usuario: UserResponse | null = null;
  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));  
        console.log(this.usuario) 
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
  async createPDF(){
    //_____________________________________________________________________________________________________________________________________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________//
    //__________________________________________      Aquí cambiara los datos por los que generamos en la parte del verificado    _________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________//
    //_____________________________________________________________________________________________________________________________________________________________________// 
          this.modeloprueba=this.Avalor6;
          this.fechaCaducidad=this.Avalor3;
          this.lote=this.Avalor7;
          this.numCarga = this.numCarga=this.Esterilizador?.get('NumCarga')?.value!;
          this.pruebaBiologica = this.pruebaBiologica=this.Esterilizador?.get('TicketPrueBio')?.value!;
    

  /////------------------------------- ciclo de inicio
          this.horaInicio=horaA1.toString()
          this.fechaInicio = fechaA
          this.fechaFabricacion=this.Avalor3;
          this.nombreOperador = this.usuario?.nombre.toString()!
 /////------------------------------- ciclo de fin
          this.fechaFin = fechaA;
          this.horaFin = horaB.toString();
          this.nombreOperadorFin = "Hugo Rodriguez";




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
    
          {text: 'Número de ticket de prueba biológica: ' +this.pruebaBiologica ,style: 'content5'},
    
          {text: 'Lote:',style: 'content1'},
          {text: 'Modelo:',style: 'content2'},  
          {text: 'Fecha de fabricación:',style: 'content3'},
          {text: 'Fecha de caducidad:',style: 'content4'},
          {text: ' '+this.lote,style: 'content1b'},
          {text: ' '+this.modeloprueba  ,style: 'content2b'},  
          {text: ' '+this.fechaFabricacion,style: 'content3b'},
          {text: ' '+this.fechaCaducidad,style: 'content4b'},
    
          {text: 'Resultado de la prueba biológica: ' +this.resultado ,style: 'content5'},
    
          {text: 'Número de carga:',style: 'content1'},
          {text: 'Número de ciclo diario:',style: 'content2'},
          {text: ' '+this.numCarga,style: 'content1b'},
          {text: ' '+this.numCicloDiario  ,style: 'content2b'},
    
          {text: 'FIN DE CICLO DE ESTERILIZACIÓN',style: 'content0'},
          {text: 'Fecha:',style: 'content1'},
          {text: 'Hora:',style: 'content2'},  
          {text: 'Nombre operador:',style: 'content3'},
          {text: 'Firma del  operador:',style: 'content4'},
          {text: ' '+this.fechaFin ,style: 'content1b'},
          {text: ' '+this.horaFin,style: 'content2b'},
          {text: ' '+this.nombreOperadorFin,style: 'content3b'},
    
          {text: 'Número de Paquetes Esterilizados: '+ this.cantidadPaquetes ,style: 'content5'},
    
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
            
    
    
             table(this.dataSource, ['Id', 'Paquete','Cantidad', 'Turno', 'FechaE','FechaC'], ),
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
            margin: [140, -12, 0, 0],
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
            margin: [140, -12, 0, 0],
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
        pdf.download('Bitacora de Esterilizacion '+ dia + '/'+mes2+'/'+año + ' ('+ hora + '/'+ minutos + 'hr)');
    
        
      }



      openSnackBar() {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
          duration: 1000,
          panelClass: ['aceptado']
        });
      }

      openSnackBar2() {
        this._snackBar.openFromComponent(PizzaPartyComponent2, {
          duration: 1000,
          panelClass: ['rechazado']
        });
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
const horaA1 =   date.getHours() +':'+ date.getMinutes()
const horaB =   (date.getHours()+1) +':'+ date.getMinutes()
const fechaA =dia +'/'+ ('0' + (date.getMonth() + 1)).slice(-2)  +'/'+ año ;
const fechaB =dia +'/'+ ('0' + (date.getMonth() + 3)).slice(-2)  +'/'+ año ;
export interface esterilizadorTable {
  Id: string;
  Paquete: string;
  Turno: string;
  FechaE: string;
  FechaC: string;
}



export interface esterilizador {
  Esterilizador:string;
  Ciclo:string;
  QR: string;
  TicketPrueBio:string;
  NumCarga:string;
  PruebaBio:string;
  PruebaQuim:string;
}

function table(data: { [x: string]: { toString: () => any; }; }[] | { name: string; age: number; }[], columns: (string | number)[]) {
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







@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'confirmar.html',
  styleUrl: './detalleesterilizador.component.scss',
  standalone: true,
})
export class PizzaPartyComponent {}



@Component({
  selector: 'snack-bar-component-example-snack2',
  templateUrl: 'rechazar.html',
  styleUrl: './detalleesterilizador.component.scss',
  standalone: true,
})
export class PizzaPartyComponent2 {}