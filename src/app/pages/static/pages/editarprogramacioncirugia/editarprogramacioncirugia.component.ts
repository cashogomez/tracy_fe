import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Instrumento } from '@app/models/backend/instrumento';
import { SetEnviado } from '@app/models/backend/set';
import { Ticket, TicketRequest } from '@app/models/backend/ticket';
import { DynamicDialogService } from '@app/services/emergente/emergente.service';
import { InstrumentoService } from '@app/services/instrumento/instrumento.service';
import { NotificationService } from '@app/services/notification/notification.service';
import { SetService } from '@app/services/set/set.service';
import { TicketService } from '@app/services/ticket/ticket.service';
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
import { Observable, from, map, startWith } from 'rxjs';

@Component({
  selector: 'app-editarprogramacioncirugia',
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
  templateUrl: './editarprogramacioncirugia.component.html',
  styleUrl: './editarprogramacioncirugia.component.scss'
})
export class EditarprogramacioncirugiaComponent {
  @Input()  ticketAEditar!: string;

  myControl = new FormControl<string | User>('');
  formaEdicion!: FormGroup<TicketForma>;
  fechaElegida: Date = new Date();
  fechaNacimiento: Date = new Date();
  tipoOperacion : number = 0;
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource: MatTableDataSource<PeriodicElement>;
  prioridad: number = 0;
  elementoRecibido!: User;
  filteredOptions!: Observable<User[]>;
  options: User[] = [];
  noSets: SetEnviado[] = [];
  instrumentos: Instrumento/*Datosprog*/[] = [];
  instrumentos_lista: Instrumento[] = [];
  lista_familia: string[] = [];
  cantidad: number = 0;
  borrarRegistro !: PeriodicElement;
  cantidadCapturada: string='';


  constructor(
    private router: Router,
    private notification: NotificationService,
    private dataService: DynamicDialogService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    private ticketServicio: TicketService,
    private ticketsetServicio: TicketsetService,
    private setService: SetService,
    private ticketinstrumentoServicio: TicketinstrumentoService,
    private instrumentoService : InstrumentoService,
    private fb: FormBuilder,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      
      // ****************** Filtrado de opciones de instrumentos y sets
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
        
        // ************************************* Recibe datos **************************************************
        this.dataService.data$.subscribe(data => {
          // console.log(data);
          
          if (data==true) {
            switch(this.tipoOperacion) { 
              case 1: { 
                if (this.borrarRegistro != undefined) {
                  this.ELEMENT_DATA = this.ELEMENT_DATA.filter((data) => data.id != this.borrarRegistro.id)
                  this.dataSource.data = this.ELEMENT_DATA;
                  switch(this.borrarRegistro.Tipo) {
                    case '(S)': {
                      this.ticketsetServicio.traerticketset(Number(this.ticketAEditar)).subscribe((ticketsetEditar) => {
                        let tse = ticketsetEditar.filter((data) => data.set.id == this.borrarRegistro.id)
                        //console.log(tse)
                        if (tse != null  && tse != undefined) {
                          this.ticketsetServicio.borrarticketset(tse[0].id).subscribe(data => {

                          });
                        }
                        
                      })

                      break
                    }
                   
                  }
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
                  this.ticketServicio.editarticket(tickerCapturado, tickerCapturado.id).subscribe((ticket) => {
                    //console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++')
                    //console.log(ticket)
                    ticketinstrumentoServicio.traerticketinstrumento(ticket.id).subscribe((ticketinstrumentosReales) => {
                      ticketsetServicio.traerticketset(ticket.id).subscribe((ticketsetReales) => {
                        // *************************************************************************************
                        this.ELEMENT_DATA.forEach((elemento) => {
                          switch(elemento.Tipo) { 
                           
                            case '(S)': { 
                               //statements; 
                               let setSeleccionado = this.noSets.filter(setseleccionado => setseleccionado.id == elemento.id)
                               let indice = ticketsetReales.findIndex(u => u.set.id === setSeleccionado[0].id);
                                if (indice == -1) {
                                  let ticketset = {
                                     set: setSeleccionado[0],
                                     ticket: ticket,
                                     cantidad: elemento.Cantidad
                                   }
                                  this.ticketsetServicio.altaticketset(ticketset).subscribe((ticketsetR) => {
                                    //console.log(ticketsetR)
                                  })
                                }
                                else {
                                  // ********************** EDITAR SET ********************************
                                  let ticketSetR2 = ticketsetReales.filter(u => u.set.id === setSeleccionado[0].id);
                                  let ticketsetR3 = {
                                    id: ticketSetR2[0].id,
                                    set: setSeleccionado[0],
                                    ticket: ticket,
                                    cantidad: elemento.Cantidad
                                  }
                                  this.ticketsetServicio.editarticketset(ticketsetR3, ticketsetR3.id).subscribe((ticketsetR) => {
                                    //console.log(ticketsetR)
                                  })
                                }
                               break; 
                            } 
                            default: { 
                               //statements; 
                               break; 
                            } 
                         }
                        }) 
                        // *************************************************************************************
                      })
                    })

// Foreach ELEMENT_DATA

                  })  // Editar Ticket
                  
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
   
       // ********************* CARGA DE LOS INSTRUMENTOS *******************
       this.instrumentoService.traerinstrumentos().subscribe(instrumentosRegistrados => {
         this.instrumentos = instrumentosRegistrados;
         this.instrumentos.forEach((name, index) => {
           let indice = this.lista_familia.findIndex(u => u === name.familia);
           //console.log(indice)
     
         })
         this.filteredOptions = this.myControl.valueChanges.pipe(
           startWith(''),
           map(value => {
             const name = typeof value === 'string' ? value : value?.name;
             return name ? this._filter(name as string) : this.options.slice();
           }),
         );
         //this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
         this.dataSource.data = this.ELEMENT_DATA;
   
       });

  }
  

  labelPosition: 'baja' | 'media' | 'alta' = 'alta';
  value = 'Clear me';

  Prioridades(){
    console.log(this.fechaElegida)
    console.log(this.fechaNacimiento)
    console.log(this.labelPosition)
  switch(  this.formaEdicion.get('Prioridad')?.value!) { 
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

  displayedColumns: string[] = ['Elemento', 'Cantidad', 'Descripcion', 'icon'];
  


  ngOnInit() {
    this.updateCloseButtonLabel('Cerrar Calendario');
    let ticket = Number(this.ticketAEditar)
        // Assign the data to the data source for the table to render
    this.ticketServicio.traerUNticket(ticket).subscribe(data => {
      this.escribirProgCirug(data);
      this.ticketsetServicio.traerticketset(data.id).subscribe(conjuntoDeSetsDelTicket => {
        this.ticketinstrumentoServicio.traerticketinstrumento(data.id).subscribe(conjuntoDeInstrumentosDelTicket => {
          conjuntoDeSetsDelTicket.forEach((ticketsetObtenido) => {
            let elementoAgregar: PeriodicElement = {
              id: ticketsetObtenido.set.id,
              Elemento: ticketsetObtenido.set.nombre,
              Cantidad: ticketsetObtenido.cantidad,
              Descripcion: '',
              Tipo: '(S)'
            }
            this.ELEMENT_DATA.push(elementoAgregar);
          })
       
          this.dataSource.data = this.ELEMENT_DATA;
          //console.log(this.ELEMENT_DATA);
        })
      })
    })
    this.formaEdicion = this.fb.nonNullable.group({
      Fechacirugia:[''],
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
  elementoElegido(recibido: User) {
    this.elementoRecibido = recibido;
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  getDateFormatString(): string {
    if (this._locale === 'es-ES') {
      return 'DD/MM/AAAA';
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  }
  eliminarRegistro(elemento: PeriodicElement) {
    //console.log(elemento)
  }

 
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
  onBetaClicked4() {
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
  capturarProgCirug(): Ticket {
    const tickerCapturado: Ticket = {
      id:  Number(this.ticketAEditar),
      fecha_cirugia:this.today,
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
    //console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
  }

  today:any;
  today2:any;

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


  escribirProgCirug(escribir: TicketRequest) {
    let prioridadString = ''
    switch(escribir.prioridad) { 
      case 1: { 
        prioridadString = 'baja'
         break; 
      } 
      case 2: { 
        prioridadString = 'media'
         break; 
      } 
      case 3: { 
        prioridadString = 'alta'
        break; 
     } 
      default: { 
        prioridadString = ''
         break; 
      } 
    };
      this.formaEdicion?.get('Fechacirugia')?.setValue(escribir.fecha_cirugia)
      this.formaEdicion?.get('Paciente')?.setValue(escribir.paciente);
      this.formaEdicion?.get('Registro')?.setValue(escribir.registro);
      this.formaEdicion?.get('Edad')?.setValue(escribir.edad);
      this.formaEdicion?.get('Nacimiento')?.setValue(escribir.fecha_nacimiento)
      this.formaEdicion?.get('Prioridad')?.setValue(escribir.prioridad.toString());
      this.formaEdicion?.get('Habitacion')?.setValue(escribir.habitacion);
      this.formaEdicion?.get('Sala')?.setValue(escribir.sala);
      this.formaEdicion?.get('Turno')?.setValue(escribir.turno);
      this.formaEdicion?.get('Diagnostico')?.setValue(escribir.diagnostico);
      this.formaEdicion?.get('Cirugia')?.setValue(escribir.cirugia);
      this.formaEdicion?.get('Solicita')?.setValue(escribir.solicita);
      this.formaEdicion?.get('Cirujano')?.setValue(escribir.cirujano);
      this.formaEdicion?.get('Anestesiologo')?.setValue(escribir.anestesiologo);
      this.formaEdicion?.get('Anestesia')?.setValue(escribir.anestesia);
      this.formaEdicion?.get('Ayudante')?.setValue(escribir.residente);
      this.formaEdicion?.get('AreaRegistro')?.setValue(escribir.area_registro);
      this.formaEdicion?.get('Enfermera')?.setValue(escribir.enfermero);
      this.formaEdicion?.get('Notas')?.setValue(escribir.notas);
      //this.estatus = escribir.estatus,
      this.formaEdicion?.get('Prioridad')?.setValue(prioridadString);
    // ***********************************************************
  }
  eliminarFila(element: PeriodicElement) {
    this.borrarRegistro=element;
  }
  cambioCantidad() {
    this.cantidad = Number(this.cantidadCapturada)
  }
  capturaAgregar() {
    if (this.cantidad > 0) {
      var splitted = this.elementoRecibido.name.split(" ", 5); 
  
     
       if (splitted[1] ==='(S)') {
          //console.log('Set')
          let setSeleccionado = this.noSets.filter(setregistrado => setregistrado.id == parseInt(splitted[0]))
          if (setSeleccionado.length > 0) {
            const indice = this.ELEMENT_DATA.findIndex((elemento: PeriodicElement) => elemento.id == setSeleccionado[0].id)
            if (indice == -1) {
              var datoAnexo: PeriodicElement = {
                id: setSeleccionado[0].id,
                Elemento: setSeleccionado[0].nombre,
                Cantidad: this.cantidad,
                Descripcion: '',
                Tipo: '(S)'
              }
            }
            else {
              var datoAnexo: PeriodicElement = {
                id: setSeleccionado[0].id,
                Elemento: setSeleccionado[0].nombre,
                Cantidad: this.cantidad+this.ELEMENT_DATA[indice].Cantidad,
                Descripcion: '',
                Tipo: '(S)'
              }
              this.ELEMENT_DATA = this.ELEMENT_DATA.filter(setelegido => setelegido.id != setSeleccionado[0].id);
            }
            this.ELEMENT_DATA.push(datoAnexo);
            this.dataSource.data = this.ELEMENT_DATA
            this.notification.success('Set agregado correctamente')
          }
          else {
            this.notification.error('Error: El Set seleccionado no se encontró')
          }
        }
      }
    }

}


export interface PeriodicElement {
  id: number;
  Elemento: string;
  Cantidad: number;
  Descripcion: string;
  Tipo: string;
}

interface TicketForma {
  Fechacirugia: FormControl<string>;
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