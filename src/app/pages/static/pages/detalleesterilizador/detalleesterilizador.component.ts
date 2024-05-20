import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Equipo } from '@app/models/backend/equipo';
import { CiclosequipoService } from '@app/services/ciclosequipo/ciclosequipo.service';
import { EquipoService } from '@app/services/equipo/equipo.service';

@Component({
  selector: 'app-detalleesterilizador',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule ,
    ReactiveFormsModule,
  ],
  templateUrl: './detalleesterilizador.component.html',
  styleUrl: './detalleesterilizador.component.scss'
})
export class DetalleesterilizadorComponent {
  @Input()  EquipoADetallar!: string;
  
  numciclo=10;
  value1=10;
  value=10;
  displayedColumns: string[] = ['Id', 'Paquete', 'Icon'];
  dataSource = ELEMENT_DATA;
  equipoOperar!: Equipo;

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
    private EquipoService: EquipoService,
    private ciclosequipoService: CiclosequipoService,
  ) {
    // this.timer(2);
    
  }
  ngOnInit() {
    console.log(this.EquipoADetallar)
    this.EquipoService.traerUNequipo(Number(this.EquipoADetallar)).subscribe(equipoRecibido => {
      this.equipoOperar=equipoRecibido
      this.ciclosequipoService.traerciclosequipo(this.equipoOperar.id).subscribe(ciclosEquipoRecibido => {
        
      })
    })
  }

  start() {
    this.timer(this.display);
  }
  stop() {
    clearInterval(this.timerInterval);
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
    Esterilizador:new FormControl(''),
    Ciclo:new FormControl(''),
    QR: new FormControl(''),
    TicketPrueBio: new FormControl(''),
    NumCarga: new FormControl(''),
    PruebaBio: new FormControl(''),
    PruebaQuim: new FormControl(''),
    
  });
  
  submitted() {
    
    window.alert(JSON.stringify(this.Esterilizador.value, null, 2));
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

export interface esterilizador {
  Esterilizador:string;
  Ciclo:string;
  QR: string;
  TicketPrueBio:string;
  NumCarga:string;
  PruebaBio:string;
  PruebaQuim:string;
}