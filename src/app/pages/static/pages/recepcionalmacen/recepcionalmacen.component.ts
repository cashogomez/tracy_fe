import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recepcionalmacen',
  standalone: true,
  imports: [],
  templateUrl: './recepcionalmacen.component.html',
  styleUrl: './recepcionalmacen.component.scss'
})
export class RecepcionalmacenComponent {

  @Input()  codigoQRleido!: string;

  NoQR= 'QR3467 Set de Angiocardio'
  Fecha= '15/12/2023'
  Hora = '13:00'
  turno = 1
  displayedColumns1: string[] = ['Elemento', 'Cantidad', 'Entregados', 'Asignacion'];
  dataSource1 = Tabla1;

  displayedColumns2: string[] = ['Elemento', 'Entregados', 'Accion'];
  dataSource2 = Tabla2;
}

const Tabla1 = [
  {Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:2},
  {Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:2},
  {Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:2},
  {Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:2},
  {Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:2},
  {Elemento: 'SET lamparoscopia', Cantidad:2, Entregados:2},
  
];

const Tabla2 = [
  {Elemento: 'SET lamparoscopia', Entregados:2},
  {Elemento: 'SET lamparoscopia', Entregados:2},
  {Elemento: 'SET lamparoscopia', Entregados:2},
  {Elemento: 'SET lamparoscopia', Entregados:2},
  {Elemento: 'SET lamparoscopia', Entregados:2},
  
];