import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
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
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TicketRequest } from '@app/models/backend/ticket';
import { TicketService } from '@app/services/ticket/ticket.service';

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

  prioridad: number = 0;

  constructor(
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    private ticketServicio: TicketService,
    private fb: FormBuilder,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
      
  }

  labelPosition: 'media' | 'alta' = 'alta';
  value = 'Clear me';


  displayedColumns: string[] = ['Elemento', 'Cantidad', 'Descripcion', 'icon'];
  dataSource = ELEMENT_DATA;


  ngOnInit() {
    this.updateCloseButtonLabel('Cerrar Calendario');
    let ticket = Number(this.ticketAEditar)
    console.log(ticket)
        // Assign the data to the data source for the table to render
    this.ticketServicio.traerUNticket(ticket).subscribe(data => {
      this.escribirProgCirug(data);
      console.log(data);
    })
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
      return 'DD/MM/AAAA';
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  }
  aceptar() {
    console.log('acepto');
  }
  cancelar() {
    console.log('cancelar');
  }
  eliminarRegistro(elemento: Element) {
    console.log(elemento)
  }
  showNacimiento(naci: any) {
    this.fechaNacimiento = naci.value._d
  }
  capturarProgCirug(): TicketRequest {
    const tickerCapturado: TicketRequest = {
      fecha_cirugia: this.fechaElegida.getTime().toString(),
      paciente: this.formaEdicion?.get('Paciente')?.value!,
      registro: this.formaEdicion?.get('Registro')?.value!,
      edad: this.formaEdicion?.get('Edad')?.value!,
      fecha_nacimiento: this.fechaNacimiento.getTime().toString(),
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
      area_registro: this.formaEdicion?.get('Registro')?.value!,
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
      fecha_cirugia: this.fechaElegida.getTime().toString();
      this.formaEdicion?.get('Paciente')?.setValue(escribir.paciente);
      this.formaEdicion?.get('Registro')?.setValue(escribir.registro);
      this.formaEdicion?.get('Edad')?.setValue(escribir.edad);
      this.fechaNacimiento.getTime().toString();
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
      this.formaEdicion?.get('Registro')?.setValue(escribir.registro);
      this.formaEdicion?.get('Enfermera')?.setValue(escribir.enfermero);
      this.formaEdicion?.get('Notas')?.setValue(escribir.notas);
      //this.estatus = escribir.estatus,
      this.formaEdicion?.get('Prioridad')?.setValue(prioridadString);
    // ***********************************************************
  }
}


export interface PeriodicElement {
  Elemento: string;
  Cantidad: number;
  Descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Elemento: 'Set 1', Cantidad:1, Descripcion: 'Set 1 para quirófano'},
  {Elemento: 'Set 2', Cantidad:1, Descripcion: 'Set 2 para quirófano'},
  {Elemento: 'Set 3', Cantidad:1, Descripcion: 'Set 3 para quirófano'},
  {Elemento: 'Set 4', Cantidad:1, Descripcion: 'Set 4 para quirófano'},
  {Elemento: 'Set 5', Cantidad:1, Descripcion: 'Set 4 para quirófano'},
  {Elemento: 'Set 6', Cantidad:1, Descripcion: 'Set 4 para quirófano'},
];



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