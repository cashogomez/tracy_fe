import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { DialogService } from '../../dialog.service';

import {MatButtonModule} from '@angular/material/button';
import {Subject} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {WebcamModule} from 'ngx-webcam';
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
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-insidencias',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule, MatDialogModule, FormsModule, WebcamModule,
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
    MatButtonModule
  ],
  templateUrl: './insidencias.component.html',
  styleUrl: './insidencias.component.scss'
})
export class InsidenciasComponent {
  valorI:string ='';
  
  comentario:string ='';
  comentario2:string ='';
  valor=''
  constructor(
    private dataService: DialogService,
    public dialogRef: MatDialogRef<InsidenciasComponent>,
    @Inject(MAT_DIALOG_DATA) public dynamicComponents$: Observable<any>  ) {

 

    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}` +':'  + this.valorI + ':' + this.comentario);
      this.dataService.sendData(result +':' + this.valorI + ':' + this.comentario);
    });
  }
  

  incidencias= new FormGroup({
    valor: new FormControl(''),
    comentario: new FormControl('')
  })
}