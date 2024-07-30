import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { NotificationService } from '@app/services/notification/notification.service';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';


import 'moment/locale/ja';
import 'moment/locale/fr';
import 'moment/locale/es';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Estatus } from '@app/models/backend/estatus';
import { EstatusService } from '@app/services/estatus/estatus.service';
import { EquipoService } from '@app/services/equipo/equipo.service';
import { Equipo } from '@app/models/backend/equipo';
import { BowieService } from '@app/services/bowie/bowie.service';
import { Bowie } from '@app/models/backend/bowie';

const date = new Date();


@Component({
  selector: 'app-esterilizacion',
  standalone: false,
  templateUrl: './esterilizacion.component.html',
  styleUrl: './esterilizacion.component.scss'
})
export class EsterilizacionComponent implements OnInit  {
  EquipoADetallar!: string;
  editar: boolean = false;
  disabledInput: boolean = false;
  disabledInput2: boolean = false;
  numciclo=10;
  value1=10;
  value=10;
  displayedColumns: string[] = ['Id', 'Paquete', 'Icon'];
  dataSource = ELEMENT_DATA;
  estatus: Estatus[] = [];
  esterilizadores: Equipo[] = [];
  selected: string[] = []
  btnSiguiente: boolean[] = [];
  folio: string[] = []

  interval:any;

  bloquear: boolean = false;


  bloquearInput=false;


  
  hacerSubmit() {

    this.bloquear = true;

    setTimeout( () => {
      // despues de 2 segundos se volverá a habilitar
      this.bloquear = false;
    }, 10000);

  }

  display: any =10;
  public timerInterval: any;

  constructor(
    private notificacionService: NotificationService,
    private estatusServicio: EstatusService,
    private equiposServicio: EquipoService,
    private bowie:BowieService,
  ) {
      this.estatusServicio.traerestatus().subscribe(data => {
        this.estatus = data
      })
      this.equiposServicio.traerequipos().forEach(datos => {
        this.esterilizadores = datos
        this.esterilizadores.forEach(esterilizador => {
          this.selected.push(esterilizador.estatus)
          this.btnSiguiente.push(true)
        })
   
      })

  }

  UltimoTicket=0;
  FechaTicket:any;
  today:any;

  clavesPrueba:number[]=[]
  ngOnInit(): void {
    
 
    
    this.today = date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + date.getDate()).slice(-2)


    this.bowie.traerBowie().subscribe(data => {
      data.forEach(id=>{

        if (id.id > this.UltimoTicket){
          this.UltimoTicket = id.id;
        }

    this.bowie.traerUNBowie(this.UltimoTicket).subscribe(Bowie=>{
      let datosBowie ={
        id: Bowie.id,
        idesterilizador: Bowie.idesterilizador,
        fecha: Bowie.fecha,
        clave: Bowie.clave,
        verificador: Bowie.verificador,
      }
      this.clavesPrueba = [Number(datosBowie.idesterilizador)]

      this.FechaTicket =  datosBowie.fecha.split(" ",2)
      this.FechaTicket = this.FechaTicket[0].split("T",2)
      this.FechaTicket = this.FechaTicket[0]

      this.FechaTicket = this.FechaTicket

     
      console.log (this.clavesPrueba)  
      console.log (this.Esterilizador)

      this.Esterilizador?.get('id')?.setValue(datosBowie.id)
      this.Esterilizador?.get('idesterilizador')?.setValue(datosBowie.idesterilizador)
      this.Esterilizador?.get('fecha')?.setValue(datosBowie.fecha)
      this.Esterilizador?.get('PruebaBrDk1')?.setValue(datosBowie.clave)
      this.Esterilizador?.get('verificador')?.setValue(datosBowie.verificador)
   

     
    })
  

      })
    })


    

  }

  respuestaVerif: boolean[] = [];
  respuestaIdEster=0



  irEsterilizador(num: number) {
    this.EquipoADetallar = this.esterilizadores[num].id.toString()
    this.editar=true
  }
  start() {
    this.timer(this.display);
  }
  stop() {
    clearInterval(this.timerInterval);
  }
  changeEstatus(valor: string,numeroEquipo: number){
    this.selected[numeroEquipo]= valor
  }
  noPaso(num: number): Bowie  {
    let prueba = this.folio[num]
    if (prueba != null) {
      if (prueba.length > 0) {
        this.btnSiguiente[num] = true
        this.selected[num] = 'mantenimiento'
        this.notificacionService.error('Se registró que el equipo fallo la prueba')
        this.respuestaVerif[num]=false

      }
       else {
        this.btnSiguiente[num] = true
        this.notificacionService.error('Favor de colocar el numero de la prueba o ID')
        this.respuestaVerif[num]=false
       }
    }
    else {
      this.btnSiguiente[num] = true
      this.notificacionService.error('Favor de colocar el numero de la prueba o ID') 
      this.respuestaVerif[num]=false
    }
    const tickerCapturado: Bowie = {
      id:this.Esterilizador?.get('id')?.value!,
      idesterilizador: num,
      fecha: this.Esterilizador?.get('fecha')?.value!,
      clave:  this.folio[num],
      verificador:  this.respuestaVerif[num],
    };
   
    console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************

    
  }  
  siPaso(num: number): Bowie  {
    let prueba = this.folio[num]
    if (prueba != null) {
      if (prueba.length > 0) {
        this.selected[num] = 'disponible'
        this.btnSiguiente[num] = false
        this.notificacionService.success('Se registró que el equipo pasó la prueba')
        this.respuestaVerif[num]=true
      }
      else {
        this.btnSiguiente[num] = true
        this.notificacionService.error('Favor de colocar el numero de la prueba o ID')
        this.respuestaVerif[num]=false
      }
    }
    else {
      this.btnSiguiente[num] = true
      this.notificacionService.error('Favor de colocar el numero de la prueba o ID') 
      this.respuestaVerif[num]=false
    }


    const tickerCapturado: Bowie = {
      id:this.Esterilizador?.get('id')?.value!,
      idesterilizador: num,
      fecha: this.Esterilizador?.get('fecha')?.value!,
      clave:  this.folio[num],
      verificador:  this.respuestaVerif[num],
    };
   
    console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************

 }  
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


  Esterilizador = new FormGroup({
    PruebaBrDk1: new FormControl({value: '', disabled: false}),
    id:  new FormControl({value: 0, disabled: false}),
    idesterilizador:  new FormControl({value: 0, disabled: false}),
    fecha:  new FormControl({value: '', disabled: false}),
    verificador:  new FormControl({value: false, disabled: false}),
  });
  
  submitted() { }
  changeTexto(evento: any, numeroEquipo: number) { 
    this.folio[numeroEquipo]=evento.target.value;

    
  }
}

const ELEMENT_DATA = [
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  {Id: 198939, Paquete: 'Set de Angiocardio',},
  
];