import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AdmonempaquesService } from '@app/services/admonempaques/admonempaques.service';

@Component({
  selector: 'app-admonempaques',
  standalone: false,
  templateUrl: './admonempaques.component.html',
  styleUrl: './admonempaques.component.scss'
})
export class AdmonempaquesComponent  {

  formaEdicion!: FormGroup<empaquesForma>;
  Historico: MaterialEmpaques[]  = [];
  dataSource = new MatTableDataSource(this.Historico);


  constructor(
    private admonempaquesService : AdmonempaquesService, 
    private fb: FormBuilder,
  ){

  }
  numero1: string='1' ;
  numero2!:string ;
  resultado!:string ;
 
 // today: Date;
//  finally: Date;
ngOnInit() {
  this.admonempaquesService.traeradmonempaques().subscribe(respuesta => {
    console.log(respuesta)
    respuesta.forEach((tipoempaque) => { 
      let materialempaque = {
        nombre: tipoempaque.nombre,
        marca: tipoempaque.marca,
        tiempo_vida: tipoempaque.tiempo_vida,
        unidad: tipoempaque.unidad
      }
      this.Historico.push(materialempaque)
    })
    this.dataSource.data = this.Historico
    console.log(this.dataSource.data)
  })
  this.formaEdicion = this.fb.nonNullable.group({
    nombre:  [''],
    marca: [''],
    tiempo_vida: [0],
    unidad:  [''],
 });

}
  onSumar():void {
    let materialEmpaque = {
      nombre : this.formaEdicion?.get('nombre')?.value!,
      marca: this.formaEdicion?.get('marca')?.value!,
      tiempo_vida: this.formaEdicion?.get('tiempo_vida')?.value!,
      unidad:this.formaEdicion?.get('unidad')?.value!,
    }
    this.Historico = []
    this.admonempaquesService.altaadmonempaques(materialEmpaque).subscribe(respuesta => {
      this.admonempaquesService.traeradmonempaques().subscribe(respuesta2 => {
        respuesta2.forEach((tipoempaque) => { 
          let materialempaque = {
            nombre: tipoempaque.nombre,
            marca: tipoempaque.marca,
            tiempo_vida: tipoempaque.tiempo_vida,
            unidad: tipoempaque.unidad
          }
          this.Historico.push(materialempaque)
          this.dataSource.data = this.Historico
        })
      })
    })
  }
  displayedColumns: string[] = ['nombre', 'marca', 'tiempo_vida', 'unidad'];
}


// const Historico = [
//   {nombre: 'Polipropileno', marca:'N/A', tiempov: '3 meses'},
//   {nombre: 'Bolsa Tyver', marca:'N/A', tiempov: '1 año'},
// ];
export interface MaterialEmpaques {
  nombre: string;
  marca:string;
  tiempo_vida: number;
  unidad: string;
}
interface empaquesForma {
  nombre: FormControl<string>;
  marca:FormControl<string>;
  tiempo_vida: FormControl<number>;
  unidad: FormControl<string>;
}