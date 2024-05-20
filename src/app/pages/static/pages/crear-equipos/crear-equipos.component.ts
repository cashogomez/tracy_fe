import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciclo, CicloRequest } from '@app/models/backend/ciclo';
import { CiclosEquipo, CiclosEquipoRequest } from '@app/models/backend/ciclosequipo';
import { Equipo, EquipoRequest } from '@app/models/backend/equipo';
import { Estatus } from '@app/models/backend/estatus';
import { CicloService } from '@app/services/ciclo/ciclo.service';
import { CiclosequipoService } from '@app/services/ciclosequipo/ciclosequipo.service';
import { EquipoService } from '@app/services/equipo/equipo.service';
import { NotificationService } from '@app/services/notification/notification.service';
import { ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-crear-equipos',
  standalone: false,
  templateUrl: './crear-equipos.component.html',
  styleUrl: './crear-equipos.component.scss'
})
export class CrearEquiposComponent {
  opciones: Opcion[]=[];
  ciclosEquipo: Ciclo[] = [];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private equipoService: EquipoService,
    private cicloServicio: CicloService,
    private ciclosequipoServicio: CiclosequipoService) {
    this.cicloServicio.traerciclos().subscribe(ciclos => {
      this.ciclosReales = ciclos;
      ciclos.forEach((cicloRe) => {
        this.opciones.push({nombre: cicloRe.id.toString() +' '+cicloRe.nombre })
      })
    })
  }
  selectedValue: string = '';
  varCiclo: boolean = false;
  ciclosL: CicloRequest = {
    nombre: ' ',
    duracion: ' ',
    temperatura: 0,
  };
  
  ciclosReales!: Ciclo[]; 
  Esterilizador = new FormGroup({
    Nombre: new FormControl(''),
    nombreCrear: new FormControl(''),
    TiempoCicloCrear: new FormControl(''),
    TemperaturaCrear: new FormControl(''),
    Marca: new FormControl(''),
    Modelo: new FormControl(''),
    NumSerie: new FormControl(''),
    Cicloest: new FormControl(''),
    TiempCiclo: new FormControl(''),
    Temperatura: new FormControl(''),
    TiempoActBD: new FormControl(''),    
  });
  
  capturarValores () {
    let esterilizadorR: EquipoRequest;
    if (this.varCiclo==false) {
      this.notificationService.error('Favor de establecer ciclos paa el equipo')
      this.varCiclo=false
    }
    else {
      esterilizadorR = {
        numero: 1,
        nombre: this.Esterilizador?.get('Nombre')?.value!,
        marca: this.Esterilizador?.get('Marca')?.value!,
        modelo: this.Esterilizador?.get('Modelo')?.value!,
        numero_serie: this.Esterilizador?.get('NumSerie')?.value!,
        prueba: this.Esterilizador?.get('TiempoActBD')?.value!,
        estatus:  'disponible',
      }
      
      this.equipoService.altaequipo(esterilizadorR).subscribe(equipoCreado => {
        console.log(this.ciclosEquipo)
        this.ciclosEquipo.forEach((ciclo) => {
          console.log(ciclo)
          let cicloequipo: CiclosEquipoRequest = {
            ciclo: ciclo,
            equipo: equipoCreado,
          }
          this.ciclosequipoServicio.altaciclosequipo(cicloequipo).subscribe( cicloequipocreado => {
            console.log(cicloequipocreado)
          })
        })
        
      })
      console.log(this.selectedValue);
      this.yaVamonos()
    }

  }
  showPlayers(evento: any) {
    console.log(evento.value)
    var splitted = evento.value.split(" ", 2); 
    let cicloElegido = this.ciclosReales.filter(ciclosReal => ciclosReal.id === Number(splitted[0]))
    console.log(cicloElegido)
    this.Esterilizador?.get('TiempCiclo')?.setValue(cicloElegido[0].duracion.toString())
    this.Esterilizador?.get('Temperatura')?.setValue(cicloElegido[0].temperatura.toString())
  }
  submitted() {
    
    window.alert(JSON.stringify(this.Esterilizador.value, null, 2));
  }

  agregarCiclo() {
    let ciclosL : CicloRequest= {
      nombre: this.Esterilizador?.get('nombreCrear')?.value!,
      duracion: this.Esterilizador?.get('TiempoCicloCrear')?.value!,
      temperatura: Number(this.Esterilizador?.get('TemperaturaCrear')?.value!),
    }
    this.cicloServicio.altaciclo(ciclosL).subscribe(ciclo => {
      this.varCiclo = true
      this.opciones=[]
      this.cicloServicio.traerciclos().subscribe(ciclos => {
        this.ciclosReales = ciclos;
        ciclos.forEach((cicloRe) => {
          this.opciones.push({nombre: cicloRe.id.toString() +' '+cicloRe.nombre })
        })
      })
      this.Esterilizador?.get('nombreCrear')?.setValue('');
      this.Esterilizador?.get('TiempoCicloCrear')?.setValue('');
      this.Esterilizador?.get('TemperaturaCrear')?.setValue('');
    })

  }
  agregarCicloE() {
    let cadena = this.Esterilizador?.get('Cicloest')?.value!
    var splitted = cadena.split(" ", 2); 
    let valorId = Number(splitted[0])
    let ciclosL : Ciclo= {
      id: valorId,
      nombre: splitted[1],
      duracion: this.Esterilizador?.get('TiempCiclo')?.value!,
      temperatura: Number(this.Esterilizador?.get('Temperatura')?.value!),
    }
    this.ciclosEquipo.push(ciclosL);
    console.log(this.ciclosEquipo)
    this.varCiclo=true
  }
  yaVamonos () {
    this.router.navigate(['/']);
}
}

// export interface esterilizador {
//   id: number;
//   nombre: string;
//   marca: string;
//   modelo: string;
//   numero_serie: string;
//   estatus: Estatus;
//   ciclos: Ciclo; 
// }
export interface Opcion {
  nombre: string;
}