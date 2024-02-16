import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuirofanocreacionRoutingModule } from './quirofanocreacion-routing.module';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-quirofanocreacion',
  standalone: true,
  imports: [
    CommonModule,
    QuirofanocreacionRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './quirofanocreacion.component.html',
  styleUrl: './quirofanocreacion.component.scss'
})
export class QuirofanocreacionComponent {
  value = 'Set 1';
  value2= this.value;

  value3 = '0';
  value3_1= this.value3;
  
  value4 = '1';
  value4_1= this.value4;
  panelOpenState = false;
  displayedColumns: string[] = ['id', 'Nombre', 'Descripcion', 'Marca', 'Cantidad', 'Caducidad'];
  
  
  dataSource = ELEMENT_DATA;

  dataSource2 = ELEMENT_DATA2;

  dataSource3 = ELEMENT_DATA3;

  dataSource4: any;
  

  

}



export interface PeriodicElement {
  id: number;
  Nombre: string;
  Descripcion: string;
  Marca: string;
  Cantidad:number;
  Caducidad: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza Halsted',        Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2, Caducidad:'14/11/2023'},
  {id: 2, Nombre: 'Pinza de Pean',        Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:3, Caducidad:'16/11/2023'},
  {id: 3, Nombre: 'Pinza Judo-Allis',     Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:4, Caducidad:'19/11/2023'},
  {id: 4, Nombre: 'Pinzas Kocher curvas', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1, Caducidad:'18/11/2023'},
];

const ELEMENT_DATA2: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza de Kocher',      Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:5, Caducidad:'20/11/2023'},
  {id: 2, Nombre: 'Pinza Mosquito',       Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2, Caducidad:'13/11/2023'},
  {id: 3, Nombre: 'Pinza para campo ',    Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7, Caducidad:'13/11/2023'},
  {id: 4, Nombre: 'Pinza para tubo',      Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:5, Caducidad:'18/11/2023'},
  {id: 5, Nombre: 'Grosmayer',            Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7, Caducidad:'24/11/2023'},
];

const ELEMENT_DATA3: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza de Tubo',        Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:3, Caducidad:'23/11/2023'},
  {id: 2, Nombre: 'Pinza clamp',          Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:5, Caducidad:'30/11/2023'},
  {id: 3, Nombre: 'Grosmayer',            Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7, Caducidad:'24/11/2023'},
  {id: 4, Nombre: 'Pinza Mosquito',       Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2, Caducidad:'13/11/2023'},
  {id: 5, Nombre: 'Atraumático',          Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7, Caducidad:'14/11/2023'},
  {id: 6, Nombre: 'Pinza Judo-Allis',     Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:4, Caducidad:'19/11/2023'},
  {id: 7, Nombre: 'Pinzas Kocher curvas', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1, Caducidad:'18/11/2023'},
];


const ELEMENT_DATA4: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza Halsted',        Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:3, Caducidad:'23/11/2023'},
  {id: 2, Nombre: 'Pinza de Pean',          Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:5, Caducidad:'30/11/2023'},
  {id: 3, Nombre: 'Pinza Judo-Allis',            Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7, Caducidad:'24/11/2023'},
  {id: 4, Nombre: 'Pinzas Kocher curvas',       Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2, Caducidad:'13/11/2023'},
  {id: 5, Nombre: 'Pinzas de Kocher',          Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7, Caducidad:'14/11/2023'},
  {id: 6, Nombre: 'Pinza Mosquito',     Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:4, Caducidad:'19/11/2023'},
  {id: 7, Nombre: 'Pinza para campo', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1, Caducidad:'18/11/2023'},
  {id: 8, Nombre: 'Pinza para tubo', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1, Caducidad:'18/11/2023'},
  {id: 9, Nombre: 'Grosmayer', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1, Caducidad:'18/11/2023'},
  {id: 10, Nombre: 'Pinza clamp', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1, Caducidad:'18/11/2023'},
];