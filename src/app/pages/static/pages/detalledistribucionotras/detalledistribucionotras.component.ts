import { Component, ViewChild } from '@angular/core';
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

export interface Distribucion_Otras_1 {
  Prioidad:string;
  Area: string;
  FechaPrestamo: string;
  Recepcion: string;
  Entrega: string;
  NotasAdd: string;
}

export interface Distribucion_Otras_2 {
  QR:string;
}


export interface TablaAñadir {
  ID:any;
  Elemento: any;
  Entregados: any;

}

const Tabla2: TablaAñadir[] = [

];



@Component({
  selector: 'app-detalledistribucionotras',
  standalone: true,
  imports: [
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
  templateUrl: './detalledistribucionotras.component.html',
  styleUrl: './detalledistribucionotras.component.scss'
})
export class DetalledistribucionotrasComponent {


  Distribucion_Otras_1 = new FormGroup({
    Prioridad: new FormControl(''),
    Area: new FormControl(''),
    FechaPrestamo:new FormControl(''),
    Recepcion:new FormControl(''),
    Entrega: new FormControl(''),
    NotasAdd: new FormControl(''),
  });

  Distribucion_Otras_2 = new FormGroup({
    QR: new FormControl(''),
  });

  constructor ( private dialogService: DialogService){}
  emergente3(){
    this.dialogService.ditribucion2emergente2()
  }


  submitted() {
    
    window.alert(JSON.stringify(this.Distribucion_Otras_1.value, null, 2));
    window.alert(JSON.stringify(this.Distribucion_Otras_2.value, null, 2));
  }


  labelPosition: 'Media' | 'Alta' = 'Alta';
  displayedColumns: string[] = ['ID', 'Elemento', 'Entregados', 'Accion'];
  dataSource = [...Tabla2];

  valueQR = '';
  ValorID="";
  Valorfch="";
  valorres="";

  @ViewChild('tabla2') table!: MatTable<TablaAñadir>;
  cantidad2=1;

  Subir() {
    //______________
    
    this.valueQR = this.Distribucion_Otras_2.get('QR')?.value!
    
    var splitted = this.valueQR.split(".", 3)
    
    this.ValorID= atob(splitted[0])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.Valorfch = atob(splitted[1])// aqui cortamos convertimos la parte cortada del qr de base64 a lenguaje común 
    
    this.valorres =  splitted[2]
    
    
        let comparable = this.dataSource.filter((IDcomp) => IDcomp.ID == this.ValorID)
    
        if (comparable.length > 0 ){
          let num = 0;
          this.dataSource.forEach(data =>{
            if (data.ID == this.ValorID) {
              this.dataSource[num].Entregados = this.dataSource[num].Entregados+1
            }
            num++
          })
    
           //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
    
           this.Distribucion_Otras_2.value.QR=''
    
        }
    
        else{
        this.dataSource.push({
          ID: this.ValorID,
          Elemento:'set1',
          Entregados: this.cantidad2,
        });
        this.table.renderRows();
    
      this.Distribucion_Otras_2.value.QR=''
      }
    }
      
    
      removeAt(index: number) {
        this.dataSource.splice(index, 1);
        this.table.renderRows();
      }
}
