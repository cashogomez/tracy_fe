import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-recepcionalmacen',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    FormsModule ,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
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