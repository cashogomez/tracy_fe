import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogService } from '@app/services/dialog/dialog.service';


const Instrumental_quirugico_sencillo = [
  {Id: 3829	, Instrumental: 'Mango de Bisturi', Cantidad: 2, Marca_Comercial: 'N/A', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: 9034, Instrumental: 'Tijeras', Cantidad: 1, Marca_Comercial: 'LISTER', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: 3984, Instrumental: 'Pinzas', Cantidad: 3, Marca_Comercial: 'GUTTEK', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
 
];

const Instrumental_quirugico = [
  {Id:' 0001'	, Instrumental: 'Pinza Halsted', Cantidad: 1, Marca_Comercial: 'N/A', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: '0002', Instrumental: 'Tijeras rectas', Cantidad: 2, Marca_Comercial: 'LISTER', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: '0003', Instrumental: 'Pinzas Kelly', Cantidad: 4, Marca_Comercial: 'GUTTEK', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
  {Id: '0004', Instrumental: 'Succión', Cantidad:8, Marca_Comercial: 'LISTER', Prelavado:'', Completo:'', Funcional:'', Cantidad_Recibida:''},
 
];


@Component({
  selector: 'app-recibirrecepcionotras',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './recibirrecepcionotras.component.html',
  styleUrl: './recibirrecepcionotras.component.scss'
})
export class RecibirrecepcionotrasComponent {
  constructor ( private dialogService: DialogService){}

  emergente1(){
    this.dialogService.emergente1()
  }

ticket =100;
fecha='17/05/2023';
turno=2;
hora='13:11';



displayedColumns1: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];
dataSource1 = Instrumental_quirugico_sencillo;


displayedColumns2: string[] = ['Id', 'Instrumental', 'Cantidad', 'Marca_Comercial', 'Prelavado', 'Completo', 'Funcional', 'Cantidad_Recibida','insidencia'];
dataSource2 = Instrumental_quirugico;

disabledInput1: boolean = true;

btnActivate(ionicButton:any) {
  if(ionicButton._color === 'accent')
    ionicButton.color =  'warn';
  else
    ionicButton.color = 'accent';
}


selectedValue: string='';

foods = [
  {value: 'Urgencias', viewValue: 'Urgencias'},
  {value: 'UCI', viewValue: 'UCI'},
  {value: 'Pediatría', viewValue: 'Pediatría'},
];



}
