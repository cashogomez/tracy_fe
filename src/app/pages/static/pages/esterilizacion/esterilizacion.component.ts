import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-esterilizacion',
  standalone: false,
  templateUrl: './esterilizacion.component.html',
  styleUrl: './esterilizacion.component.scss'
})
export class EsterilizacionComponent {
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
    private equiposServicio: EquipoService) {
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
  noPaso(num: number) {
    let prueba = this.folio[num]
    if (prueba != null) {
      if (prueba.length > 0) {
        this.btnSiguiente[num] = true
        this.selected[num] = 'mantenimiento'
        this.notificacionService.error('Se registró que el equipo fallo la prueba')
      }
       else {
        this.btnSiguiente[num] = true
        this.notificacionService.error('Favor de colocar el numero de la prueba o ID')
       }
    }
    else {
      this.btnSiguiente[num] = true
      this.notificacionService.error('Favor de colocar el numero de la prueba o ID') 
    }
  }  
  siPaso(num: number) {
    let prueba = this.folio[num]
    if (prueba != null) {
      if (prueba.length > 0) {
        this.selected[num] = 'disponible'
        this.btnSiguiente[num] = false
        this.notificacionService.success('Se registró que el equipo pasó la prueba')
      }
      else {
        this.btnSiguiente[num] = true
        this.notificacionService.error('Favor de colocar el numero de la prueba o ID')
      }
    }
    else {
      this.btnSiguiente[num] = true
      this.notificacionService.error('Favor de colocar el numero de la prueba o ID') 
    }
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
  });
  
  submitted() {
    
    window.alert(JSON.stringify(this.Esterilizador.value, null, 2));
  }
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