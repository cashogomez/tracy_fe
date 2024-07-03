import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@app/services/dialog/dialog.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTable, MatTableModule,MatTableDataSource, } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';



import { ReporteincidenciaService } from '@app/services/reporteincidencia/reporteincidencia.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-detallereporteincidencia',
  standalone:  true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule],
  templateUrl: './detallereporteincidencia.component.html',
  styleUrl: './detallereporteincidencia.component.scss'
})
export class DetallereporteincidenciaComponent implements OnInit {

 
  @Input()  ticketAEditar!: string;

fechaN=''
NumeroReporte=0
  
Datoos = new FormGroup({
  id: new FormControl(0),
  lugar: new FormControl(''),
  fecha: new FormControl(''),
  usuario: new FormControl(''),
  turno:new FormControl(0),
  incidencia:new FormControl(''),
  comentario:new FormControl(''),
});

constructor(
  private Reportes:ReporteincidenciaService
){
  
}

ngOnInit(): void {
  
  this.Reportes.traerUNReporte(Number(this.ticketAEditar)).forEach(reporte =>{
    
  
    this.fechaN =  reporte.fecha
    this.NumeroReporte = reporte.id

    this.Datoos?.get('id')?.setValue(reporte.id!)
    this.Datoos?.get('lugar')?.setValue(reporte.lugar!)
    this.Datoos?.get('usuario')?.setValue(reporte.usuario!)
    this.Datoos?.get('turno')?.setValue(reporte.turno!)
    this.Datoos?.get('incidencia')?.setValue(reporte.incidencia!)
    this.Datoos?.get('comentario')?.setValue(reporte.comentario!)
  })
}
}
