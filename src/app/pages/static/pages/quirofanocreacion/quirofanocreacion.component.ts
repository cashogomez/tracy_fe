import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon, MatIconModule } from '@angular/material/icon';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import 'moment/locale/es';


import { DynamicDialogService } from '@app/services/emergente/emergente.service';
import { from } from 'rxjs';
import { NotificationService, SetService } from '@app/services';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import {Instrumento, InstrumentoRequest} from '@app/models/backend/instrumento';
import { InstrumentoService } from '@app/services/instrumento/instrumento.service';

import { Buffer } from "buffer";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { PopupsModule } from '@app/shared/popups';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SetEnviado, SetRequest } from '@app/models/backend/set';
import { CantidadInstrumentoService } from '@app/services/cantidadinstrumento/cantidadinstrumento.service';

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
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatDivider,
    MatIcon,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    PopupsModule,
    NgOptimizedImage,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule, 
    MatRadioModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './quirofanocreacion.component.html',
  styleUrl: './quirofanocreacion.component.scss'
})
export class QuirofanocreacionComponent {
  myControl = new FormControl<string | User>('');
  public cantidadControl = new FormControl();


  options: User[] = [];

  dataSource: MatTableDataSource<Instrumento>;

  editarRegistro !: Instrumento/*Datosprog*/;
  borrarRegistro !: Instrumento/*Datosprog*/;

  instrumentos: Instrumento/*Datosprog*/[] = [];
  foto : string ="https://firebasestorage.googleapis.com/v0/b/tracy-nutricion.appspot.com/o/instrumento.png?alt=media&token=e73f04cf-b593-45da-ba73-202b5362fe63";
  ELEMENT_DATA: any[] = [];
  ELEMENT_DATA5: any[] = [];
  ELEMENT_DATA6: PeriodicElement[] = [];
  lista_familia: string[] = [];
  codigos: string[]=[];

  filteredOptions!: Observable<User[]>;

  value = 'Set 1';
  value2= this.value;

  value3 = '0';
  value3_1= this.value3;
  
  value4 = '1';
  value4_1= this.value4;
  panelOpenState = false;
  displayedColumns: string[] = ['id', 'Nombre', 'Tipo', 'Descripcion', 'Marca', 'Cantidad'];
  

  dataSource2 = ELEMENT_DATA2;

  dataSource3 = ELEMENT_DATA3;

  dataSource4 = new MatTableDataSource(this.ELEMENT_DATA6);

  nombreElegido: boolean = false
  minmaxElegido: boolean = false

  // ********** Valor para crear set *******************+

  valorMaximo: number = 0 
  valorMinimo: number = 0
  cantidad: number = 0
  nombreSet: string = ''
  instrumentoRecibido!: User;
  envioSet: SetRequest | undefined;
  recibidoSet: SetEnviado | undefined;
  // ****************************************************


  constructor(
    private fb: FormBuilder,
    private instrumentoService : InstrumentoService,
    private notification: NotificationService,
    private setService: SetService,
    private cantidadInstrumentoService: CantidadInstrumentoService
  )
  {
    this.cantidadControl.setValue(0);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA5);
  };
  ngOnInit() {



    // ********************* CARGA DE LOS DATOS *******************
    this.instrumentoService.traerinstrumentos().subscribe(datos => {
      this.instrumentos = datos;
      this.instrumentos.forEach((name, index) => {
        let indice = this.lista_familia.findIndex(u => u === name.familia);
        //console.log(indice)
        if (indice == -1) {
          this.lista_familia.push(name.familia);
          this.ELEMENT_DATA5.push(name)
          console.log(name.id+' '+name.nombre+' ' +name.tipo+' '+name.marca+' '+name.descripcion)
          this.options.push({name: name.id+' '+name.nombre+' ' +name.tipo+' '+name.marca+' '+name.descripcion})
          
        }
      })
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
      //this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.data = this.ELEMENT_DATA5;
      console.log(this.lista_familia)

    });

  }
  nombreSeleccionado(nombre: string) {
    this.nombreElegido = true
    this.nombreSet = nombre
  }
  minmaxSeleccionado(min: string, max: string) {
    this.minmaxElegido = true
    this.valorMaximo = parseInt(max)
    this.valorMinimo =parseInt(min)
  }
  capturarValor() {
    if (this.nombreElegido == true && this.minmaxElegido == true ) 
    {
      this.cantidad = this.cantidadControl?.value
      var splitted = this.instrumentoRecibido.name.split(" ", 5); 

      let encontradoElemento = this.ELEMENT_DATA6.filter(e => e.id == parseInt(splitted[0]));
      let elementoAgregado: PeriodicElement;

      if (encontradoElemento.length > 0) {
        this.ELEMENT_DATA6 = this.ELEMENT_DATA6.filter(e => e.id != encontradoElemento[0].id)
          elementoAgregado = {
          id: parseInt(splitted[0]),
          Nombre: encontradoElemento[0].Nombre,
          Tipo: encontradoElemento[0].Tipo,
          Descripcion: encontradoElemento[0].Descripcion,
          Marca: encontradoElemento[0].Marca,
          Cantidad: this.cantidad + encontradoElemento[0].Cantidad
        }
      }
      else {
        let instrumentoEncontrado = this.ELEMENT_DATA5.filter(e => e.id == parseInt(splitted[0]))
        console.log(instrumentoEncontrado)
          elementoAgregado = {
          id: parseInt(splitted[0]),
          Nombre: instrumentoEncontrado[0].nombre,
          Tipo: instrumentoEncontrado[0].tipo,
          Descripcion: instrumentoEncontrado[0].descripcion,
          Marca: instrumentoEncontrado[0].marca,
          Cantidad: this.cantidad
        }
      }
      console.log(elementoAgregado)
      this.ELEMENT_DATA6.push(elementoAgregado);
      this.dataSource4.data = this.ELEMENT_DATA6
      

      this.notification.success("Se agregó correctamente");
    }
    else {
      if (this.nombreElegido == false && this.minmaxElegido == true ) {
        this.notification.error('Favor de elegir un nombre del set')

      }
      else {
        if (this.nombreElegido == true && this.minmaxElegido == false ) {
          this.notification.error('Favor de elegir un mínimo y máximo de almacén')
        }
        else {
          if (this.nombreElegido == false && this.minmaxElegido == false ) {
            this.notification.error('Favor de elegir un  nombre y un mínimo y máximo de almacén')
          }
        }
      }
    }
    // *********** RESETEAR FORMATO DE CAPTURAR INSTRUMENTO ***************

  }
  onFilesChanged(urls: string | string[]): void {
    this.foto=urls[0];
  }
  
  generadorQR(valor: number, instrumento: InstrumentoRequest) {
    for (let i = 1; i < valor+1; i++) {
      this.codigos.push(Buffer.from(instrumento.nombre+instrumento.tipo+instrumento.marca+instrumento.descripcion).toString('base64')+','+i.toString())
    }
    console.log(this.codigos)
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  editarFila() {

  }
  editarInstrumento() {

  }
  instrumentoElegido(recibido: User) {
    this.instrumentoRecibido = recibido;
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  crearSet() {

    // ELEMENT_DATA6 y DataSource4 tienen los instrumentos que se usaran
    this.envioSet = {
      numero: 1,
      maximo: this.valorMaximo,
      minimo: this.valorMinimo,
      nombre: this.nombreSet,
      foto: this.foto,
      activo: true,
    }
    this.setService.altaset(this.envioSet).subscribe((response: SetEnviado) => {
      console.log(response);
      
      this.dataSource4.data.forEach(dataInstrumento  => {
        let instrumentoreal = this.instrumentos.filter(i => i.id === dataInstrumento.id);
        let cantidadinstrumento = {
          cantidad: dataInstrumento.Cantidad,
          instrumento: instrumentoreal[0].id,
          set: response.id,
        }
        this.cantidadInstrumentoService.altacantidadinstrumento(cantidadinstrumento).subscribe(response => {
            console.log('******************')
            console.log(response)
        });
        // ********************** Aqui crear la cantidad de set en la base de datos **********
      }), 
      this.notification.success('El set fue creado exitosament');
    })
  }

}

export interface PeriodicElement {
  id: number;
  Nombre: string;
  Tipo: string;
  Descripcion: string;
  Marca: string;
  Cantidad:number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza Halsted',   Tipo: 'SOk',     Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2},
  {id: 2, Nombre: 'Pinza de Pean',   Tipo: 'SOk',     Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:3},
  {id: 3, Nombre: 'Pinza Judo-Allis', Tipo: 'SOk',    Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:4},
  {id: 4, Nombre: 'Pinzas Kocher curvas', Tipo: 'SOk', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1},
];

const ELEMENT_DATA2: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza de Kocher', Tipo: 'SOk',     Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:5},
  {id: 2, Nombre: 'Pinza Mosquito',  Tipo: 'SOk',     Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2},
  {id: 3, Nombre: 'Pinza para campo ', Tipo: 'SOk',   Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7},
  {id: 4, Nombre: 'Pinza para tubo',  Tipo: 'SOk',    Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:5},
  {id: 5, Nombre: 'Grosmayer',   Tipo: 'SOk',         Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7},
];

const ELEMENT_DATA3: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza de Tubo',  Tipo: 'SOk',      Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:3},
  {id: 2, Nombre: 'Pinza clamp',  Tipo: 'SOk',        Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:5},
  {id: 3, Nombre: 'Grosmayer',  Tipo: 'SOk',          Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7},
  {id: 4, Nombre: 'Pinza Mosquito', Tipo: 'SOk',      Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2},
  {id: 5, Nombre: 'Atraumático',    Tipo: 'SOk',      Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7},
  {id: 6, Nombre: 'Pinza Judo-Allis', Tipo: 'SOk',    Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:4},
  {id: 7, Nombre: 'Pinzas Kocher curvas', Tipo: 'SOk', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1},
];


const ELEMENT_DATA4: PeriodicElement[] = [
  {id: 1, Nombre: 'Pinza Halsted',  Tipo: 'SOk',      Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:3},
  {id: 2, Nombre: 'Pinza de Pean',   Tipo: 'SOk',       Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:5},
  {id: 3, Nombre: 'Pinza Judo-Allis',   Tipo: 'SOk',         Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7},
  {id: 4, Nombre: 'Pinzas Kocher curvas', Tipo: 'SOk',      Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:2},
  {id: 5, Nombre: 'Pinzas de Kocher', Tipo: 'SOk',         Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:7},
  {id: 6, Nombre: 'Pinza Mosquito', Tipo: 'SOk',    Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM SILVERY', Cantidad:4},
  {id: 7, Nombre: 'Pinza para campo',Tipo: 'SOk', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1},
  {id: 8, Nombre: 'Pinza para tubo', Tipo: 'SOk', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1},
  {id: 9, Nombre: 'Grosmayer', Tipo: 'SOk', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1},
  {id: 10, Nombre: 'Pinza clamp', Tipo: 'SOk', Descripcion: 'pinzas quirúrgicas', Marca: 'HERGOM PREMIUM', Cantidad:1},
];



// **************** Form Control ***********
interface InstrumentoForma {
  NombreSet: FormControl<string>;
  Elemento:FormControl<string>;
  Cantidad: FormControl<number>;
  Minimo:FormControl<number>;
  Maximo:FormControl<number>;
}

export interface User {
  name: string;
}