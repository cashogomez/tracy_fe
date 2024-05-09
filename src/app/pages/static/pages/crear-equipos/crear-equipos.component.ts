import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciclo, CicloRequest } from '@app/models/backend/ciclo';
import { Estatus } from '@app/models/backend/estatus';
import { CicloService } from '@app/services/ciclo/ciclo.service';


@Component({
  selector: 'app-crear-equipos',
  standalone: false,
  templateUrl: './crear-equipos.component.html',
  styleUrl: './crear-equipos.component.scss'
})
export class CrearEquiposComponent {
  opciones: Opcion[]=[];

  constructor(private cicloServicio: CicloService) {
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
    let estatusL = {
      nombre: 'pendiente'
    }
    if (this.varCiclo==false) {
      let ciclosL: CicloRequest = {
        nombre: this.Esterilizador?.get('Cicloest')?.value!,
        duracion: this.Esterilizador?.get('TiempCiclo')?.value!,
        temperatura: Number(this.Esterilizador?.get('Temperatura')?.value!),
      }
      this.cicloServicio.altaciclo(ciclosL).subscribe(cicloR => {
        this.varCiclo = true
        let esterilizador = {
          nombre: this.Esterilizador?.get('Nombre')?.value!,
          marca: this.Esterilizador?.get('Marca')?.value!,
          modelo: this.Esterilizador?.get('Modelo')?.value!,
          numero_serie: this.Esterilizador?.get('NumSerie')?.value!,
          ciclos: cicloR,
          estatus: estatusL,
        }
      })
    }
    else {
      let esterilizador = {
        nombre: this.Esterilizador?.get('Nombre')?.value!,
        marca: this.Esterilizador?.get('Marca')?.value!,
        modelo: this.Esterilizador?.get('Modelo')?.value!,
        numero_serie: this.Esterilizador?.get('NumSerie')?.value!,
        ciclos: this.ciclosL,
        estatus: estatusL,
      }
    }
    console.log(this.selectedValue);
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
    let ciclosL : CicloRequest= {
      nombre: this.Esterilizador?.get('Cicloest')?.value!,
      duracion: this.Esterilizador?.get('TiempCiclo')?.value!,
      temperatura: Number(this.Esterilizador?.get('Temperatura')?.value!),
    }
    this.cicloServicio.altaciclo(ciclosL).subscribe(ciclo => {
      this.varCiclo = true
    })
  }
}

export interface esterilizador {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  estatus: Estatus;
  ciclos: Ciclo; 
}
export interface Opcion {
  nombre: string;
}