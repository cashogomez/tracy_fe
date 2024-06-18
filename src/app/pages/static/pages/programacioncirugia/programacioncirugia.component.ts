import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '@app/services/notification/notification.service';
import { DynamicDialogService } from '@app/services/emergente/emergente.service';
import { Observable, from, map, startWith } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { TicketRequest } from '@app/models/backend/ticket';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SetEnviado } from '@app/models/backend/set';
import { SetService } from '@app/services/set/set.service';
import { InstrumentoService } from '@app/services/instrumento/instrumento.service';
import { Instrumento } from '@app/models/backend/instrumento';
import { TicketService } from '@app/services/ticket/ticket.service';
import moment from 'moment';
import 'moment/locale/es';
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';


const date = new Date();const minutos=date.getMinutes();const segundos = date. getSeconds();



const horaA =   date.getHours()


@Component({
  selector: 'app-programacioncirugia',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideMomentDateAdapter(),
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, 
    FormsModule,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDivider,
    MatTooltipModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './programacioncirugia.component.html',
  styleUrl: './programacioncirugia.component.scss'
})
export class ProgramacioncirugiaComponent implements OnInit {
  myControl = new FormControl<string | User>('');
  formaEdicion!: FormGroup<TicketForma>;

  borrarRegistro !: Element;
  materialElegido !: Element;


  valorElegido : string=''
  prioridad: number = 0;
  tipoOperacion : number = 0;
  fechaElegida: Date = new Date();
  fechaNacimiento: Date = new Date();
  options: User[] = [];


  elementoRecibido!: User;
  filteredOptions!: Observable<User[]>;
  noSets: SetEnviado[] = [];
  lista_familia: string[] = [];
  ELEMENT_DATA5: Element[] = [];
  
  instrumentos: Instrumento/*Datosprog*/[] = [];
  instrumentos_lista: Instrumento[] = [];
  
  constructor(
    private   ticketsetServicio : TicketsetService,
    private   ticketinstrumentoServicio : TicketinstrumentoService,
    private fb: FormBuilder,
    private router: Router,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    private notification: NotificationService,
    private dataService: DynamicDialogService,
    private ticketService: TicketService,
    private setService: SetService,
    private instrumentoService : InstrumentoService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA5);
        
        // ****** Recibe datos ******
        this.dataService.data$.subscribe(data => {
          // console.log(data);
          
          if (data==true) {
            switch(this.tipoOperacion) { 
              case 1: { 
                if (this.borrarRegistro!= undefined) {
                  this.ELEMENT_DATA5 = this.ELEMENT_DATA5.filter((data) => data.id != this.borrarRegistro.id)
                  this.dataSource.data = this.ELEMENT_DATA5;
                  this.notification.success("Registro Borrado exitosamente");
                }
                else {
                  this.notification.error("Registro no encontrado");
                }
                
                 break; 
              } 
              case 2: { 
                this.notification.success("Ticket generado");
                this.router.navigate(['/static/quirofanoinformacion']);
                 //statements;
                  // ***********************************************************************************
                  let tickerCapturado = this.capturarProgCirug();
                  this.ticketService.altaticket(tickerCapturado).subscribe((ticket) => {
                    console.log(ticket)
                    this.ELEMENT_DATA5.forEach((elemento) => {
                      switch(elemento.Tipo) { 
                        case '(I)': { 
                          let instrumentoSeleccionado = this.instrumentos.filter(instrumento => instrumento.id == elemento.id)
                            let ticketinstrumento = {
                              instrumento: instrumentoSeleccionado[0],
                              ticket: ticket,
                              cantidad: elemento.Cantidad
                            }
                            this.ticketinstrumentoServicio.altaticketinstrumento(ticketinstrumento).subscribe((ticketinstrumento) => {
                              console.log(ticketinstrumento)
                            })
                           //statements; 
                           break; 
                        } 
                        case '(S)': { 
                           //statements; 
                           let setSeleccionado = this.noSets.filter(setseleccionado => setseleccionado.id == elemento.id)
                           let ticketset = {
                             set: setSeleccionado[0],
                             ticket: ticket,
                             cantidad: elemento.Cantidad
                           }
                           this.ticketsetServicio.altaticketset(ticketset).subscribe((ticketset) => {
                             console.log(ticketset)
                           })
                           break; 
                        } 
                        default: { 
                           //statements; 
                           break; 
                        } 
                     }
                    })
                  })
                  
                 break; 
              } 
              case 3: { 
                this.notification.error("Operación cancelada");
                this.router.navigate(['/static/quirofanoinformacion']);
                //statements; 
                break; 
             } 
              default: { 
                 //statements; 
                 break; 
              } 
           }
            
          }
          else {
            this.notification.error("¡Se canceló la operación");
          }
        });
// ************************************************+*****************************
        this.noSets = []
        this.options = []
       // ******************** CARGA DE LOS SETS ********************
         this.setService.traersets().subscribe(setRegistrados => {
           setRegistrados.forEach(setregistrado => {
             this.noSets.push(setregistrado)
             this.options.push({name: setregistrado.id.toString()+' '+'(S)'+' '+setregistrado.nombre})
         
           })
         })
     
         // ********************* CARGA DE LOS DATOS *******************
         this.instrumentoService.traerinstrumentos().subscribe(datos => {
           this.instrumentos = datos;
           this.instrumentos.forEach((name, index) => {
             let indice = this.lista_familia.findIndex(u => u === name.familia);
             //console.log(indice)
             if (indice == -1) {
               this.lista_familia.push(name.familia);
               //this.ELEMENT_DATA5.push({Elemento: name.id.toString()+' '+name.nombre, Cantidad: name.cantidad, Descripcion: name.descripcion })
               console.log(name.id+' '+name.nombre+' ' +name.tipo+' '+name.marca+' '+name.descripcion)
               this.options.push({name: name.id.toString()+' '+'(I)'+' '+name.nombre+' ' +name.tipo+' '+name.marca+' '+name.descripcion})
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
     
         });
       
     
      
  }

  labelPosition: 'baja' |'media' | 'alta' = 'alta';
  value = 'Clear me';
  cantidadCapturada: string='';
  cantidad: number = 0;
  tempo: Element[] = [];;


  displayedColumns: string[] = ['Elemento', 'Cantidad', 'Descripcion', 'icon'];
  dataSource: MatTableDataSource<Element>;
  //dataSource!: MatTableDataSource<Element>;
// **********************************************************

  hora = horaA;
  ngOnInit() {
    
    this.updateCloseButtonLabel('Cerrar Calendario');

    this.formaEdicion = this.fb.nonNullable.group({

      Paciente:  [''],
      Registro: [''],
      Edad: [0],
      Nacimiento:  [''],
      Habitacion:[0],
      Sala:[0],
      Turno:[0],
      Diagnostico: [''],
      Cirugia: [''],
      Solicita: [''],
      Cirujano: [''],
      Anestesiologo: [''],
      Anestesia: [''],
      Ayudante: [''],
      AreaRegistro: [''],
      Enfermera: [''],
      Notas: [''],
      Prioridad: [''],

   });

  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  french() {
    this._locale = 'es-ES';
    this._adapter.setLocale(this._locale);
    this.updateCloseButtonLabel('Cerrar el calendario');
  }

  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }

  getDateFormatString(): string {
    if (this._locale === 'es-ES') {
      return 'DD-MM-AAAA';
    }
    return '';
  }
  showNacimiento(naci: any) {
    this.fechaNacimiento = naci.value._d
    console.log(this.fechaNacimiento.toString())
    const date =this.fechaNacimiento;
    this.today2 = date.getFullYear() + '-'
             + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2) + ' 08:00:00';
             console.log(this.today2);
  }
  showDate(valor: any) {
    console.log('Cambio la fecha')
    this.fechaElegida = valor.value._d
    console.log(this.fechaElegida.toString())
    const date =this.fechaElegida;
    this.today = date.getFullYear() + '-'
             + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2)+ ' 08:00:00';
             console.log(this.today);

  }

 today:any;
 today2:any;

  Prioridades(){
    console.log(this.today)
    console.log(this.today2)
    console.log(this.prioridad)
  switch(this.labelPosition) { 
    case 'baja': { 
       this.prioridad = 1
       break; 
    } 
    case 'media': { 
      this.prioridad = 2
       break; 
    } 
    case 'alta': { 
      this.prioridad = 3
      break; 
   } 
    default: { 
      this.prioridad = 1
       break; 
    } 
 } 

}

  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  // EliminarElementoTabla(elemento: string) {
  //   this.dataSource.data = this.dataSource.data.filter((u) => u.Elemento !== elemento);
  //   this.notification.success("¡El registro se borro exitosamente!");
  // }
  private lazyLoadBeta$ = from(
    import('@app/services/emergente/components/mensajecontinuar/mensajecontinuar.component').then(
      (component) => component.MensajecontinuarComponent
    )
  );
  private lazyLoadAceptar$ = from(
    import('@app/services/emergente/components/mensajeaceptar/mensajeaceptar.component').then(
      (component) => component.MensajeaceptarComponent
    )
  );
  private lazyLoadCancelar$ = from(
    import('@app/services/emergente/components/mensajecancelar/mensajecancelar.component').then(
      (component) => component.MensajecancelarComponent
    )
  );
  onBetaClicked() {
    this.dataService.showDialog(this.lazyLoadBeta$);
    this.tipoOperacion = 1
  }
  onAceptarClicked() {
    this.dataService.showDialog(this.lazyLoadAceptar$);
    this.tipoOperacion = 2
  }
  onCancelarClicked() {
    this.dataService.showDialog(this.lazyLoadCancelar$);
    this.tipoOperacion = 3
  }
changeMaterial(valor: Element) { 
    this.materialElegido = valor;
}
cambioCantidad() {
  this.cantidad = Number(this.cantidadCapturada)
}
capturarProgCirug(): TicketRequest {
  const tickerCapturado: TicketRequest = {
    fecha_cirugia: this.today,
    paciente: this.formaEdicion?.get('Paciente')?.value!,
    registro: this.formaEdicion?.get('Registro')?.value!,
    edad: this.formaEdicion?.get('Edad')?.value!,
    fecha_nacimiento: this.today2,
    habitacion: this.formaEdicion?.get('Habitacion')?.value!,
    sala: this.formaEdicion?.get('Sala')?.value!,
    turno: this.formaEdicion?.get('Turno')?.value!,
    diagnostico: this.formaEdicion?.get('Diagnostico')?.value!,
    cirugia: this.formaEdicion?.get('Cirugia')?.value!,
    solicita: this.formaEdicion?.get('Solicita')?.value!,
    cirujano: this.formaEdicion?.get('Cirujano')?.value!,
    anestesiologo: this.formaEdicion?.get('Anestesiologo')?.value!,
    anestesia: this.formaEdicion?.get('Anestesia')?.value!,
    residente: this.formaEdicion?.get('Ayudante')?.value!,
    area_registro: this.formaEdicion?.get('AreaRegistro')?.value!,
    enfermero: this.formaEdicion?.get('Enfermera')?.value!,
    notas: this.formaEdicion?.get('Notas')?.value!,
    estatus: 'pendiente',
    prioridad: this.prioridad,
    activo: true
  };
  console.log(tickerCapturado)
  return tickerCapturado;
  // ***********************************************************
}
elementoElegido(recibido: User) {
  this.elementoRecibido = recibido;
}
capturaAgregar() {
  if (this.cantidad > 0) {
    var splitted = this.elementoRecibido.name.split(" ", 5); 

    if (splitted[1] === '(I)') {
      console.log('Instrumento')
      let instrumentoSeleccionado = this.instrumentos.filter(instrumento => instrumento.id == parseInt(splitted[0]))
      if (instrumentoSeleccionado.length > 0) {
        const indice = this.ELEMENT_DATA5.findIndex((elemento: Element) => elemento.id == instrumentoSeleccionado[0].id)
        if (indice == -1) {
          var datoAnexo: Element = {
            id: instrumentoSeleccionado[0].id,
            Elemento: instrumentoSeleccionado[0].nombre+' '+instrumentoSeleccionado[0].tipo,
            Cantidad: this.cantidad,
            Descripcion: instrumentoSeleccionado[0].descripcion,
            Tipo: '(I)',
          }
        }
        else {
          var datoAnexo: Element = {
            id: instrumentoSeleccionado[0].id,
            Elemento: instrumentoSeleccionado[0].nombre+' '+instrumentoSeleccionado[0].tipo,
            Cantidad: this.cantidad+this.ELEMENT_DATA5[indice].Cantidad,
            Descripcion: instrumentoSeleccionado[0].descripcion,
            Tipo: '(I)'
          }
          this.ELEMENT_DATA5 = this.ELEMENT_DATA5.filter(instrumento => instrumento.id != instrumentoSeleccionado[0].id);
        }
        
        this.ELEMENT_DATA5.push(datoAnexo);
        this.dataSource.data = this.ELEMENT_DATA5
        this.notification.success('Instrumento agregado correctamente')
      }
      else {
        this.notification.error('Error al agregar instrumento')
      }
    }else if (splitted[1] ==='(S)') {
        console.log('Set')
        let setSeleccionado = this.noSets.filter(setregistrado => setregistrado.id == parseInt(splitted[0]))
        if (setSeleccionado.length > 0) {
          const indice = this.ELEMENT_DATA5.findIndex((elemento: Element) => elemento.id == setSeleccionado[0].id)
          if (indice == -1) {
            var datoAnexo: Element = {
              id: setSeleccionado[0].id,
              Elemento: setSeleccionado[0].nombre,
              Cantidad: this.cantidad,
              Descripcion: '',
              Tipo: '(S)'
            }
          }
          else {
            var datoAnexo: Element = {
              id: setSeleccionado[0].id,
              Elemento: setSeleccionado[0].nombre,
              Cantidad: this.cantidad+this.ELEMENT_DATA5[indice].Cantidad,
              Descripcion: '',
              Tipo: '(S)'
            }
            this.ELEMENT_DATA5 = this.ELEMENT_DATA5.filter(setelegido => setelegido.id != setSeleccionado[0].id);
          }
          this.ELEMENT_DATA5.push(datoAnexo);
          this.dataSource.data = this.ELEMENT_DATA5
          this.notification.success('Set agregado correctamente')
        }
        else {
          this.notification.error('Error: El Set seleccionado no se encontró')
        }
      }
    }
  }
}


export interface Element {
  id: number;
  Elemento: string;
  Cantidad: number;
  Descripcion: string;
  Tipo: string;
}

interface TicketForma {
  Paciente: FormControl<string>;
  Registro:FormControl<string>;
  Edad: FormControl<number>;
  Nacimiento: FormControl<string>;
  Habitacion:FormControl<number>;
  Sala:FormControl<number>;
  Turno: FormControl<number>;
  Diagnostico:FormControl<string>;
  Cirugia:FormControl<string>;
  Solicita:FormControl<string>;
  Cirujano:FormControl<string>;
  Anestesiologo:FormControl<string>;
  Anestesia:FormControl<string>;
  Ayudante:FormControl<string>;
  AreaRegistro:FormControl<string>;
  Enfermera:FormControl<string>;
  Notas:FormControl<string>;
  Prioridad:FormControl<string>;
}
export interface User {
  name: string;
}