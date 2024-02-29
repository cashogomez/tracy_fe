import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import 'moment/locale/ja';
import 'moment/locale/fr';
import 'moment/locale/es';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '@app/services/notification/notification.service';
import { DynamicDialogService } from '@app/services/emergente/emergente.service';
import { from } from 'rxjs';

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
  ],
  templateUrl: './programacioncirugia.component.html',
  styleUrl: './programacioncirugia.component.scss'
})
export class ProgramacioncirugiaComponent implements OnInit {
  borrarRegistro !: Element;
  materialElegido !: Element;
  valorElegido : string=''
  tipoOperacion : number = 0;
  material: Element[] = [    
  {Elemento: 'Set 1', Cantidad:8, Descripcion: 'Set 1 para quirófano'},
  {Elemento: 'Set 2', Cantidad:4, Descripcion: 'Set 2 para quirófano'},
  {Elemento: 'Set 3', Cantidad:5, Descripcion: 'Set 3 para quirófano'},
  {Elemento: 'Pinza', Cantidad:2, Descripcion: 'Pinza para quirófano'},
];

  ELEMENT_DATA: Element[] = [
    {Elemento: 'Set 1', Cantidad:1, Descripcion: 'Set 1 para quirófano'},
    {Elemento: 'Set 2', Cantidad:1, Descripcion: 'Set 2 para quirófano'},
    {Elemento: 'Set 3', Cantidad:1, Descripcion: 'Set 3 para quirófano'},
    {Elemento: 'Set 4', Cantidad:1, Descripcion: 'Set 4 para quirófano'},
    {Elemento: 'Set 5', Cantidad:1, Descripcion: 'Set 4 para quirófano'},
    {Elemento: 'Set 6', Cantidad:1, Descripcion: 'Set 4 para quirófano'},
  ];
  
  constructor(
    private router: Router,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    private notification: NotificationService,
    private dataService: DynamicDialogService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        
        // ****** Recibe datos ******
        this.dataService.data$.subscribe(data => {
          // console.log(data);
          
          if (data==true) {
            switch(this.tipoOperacion) { 
              case 1: { 
                console.log('Va bien');
                if (this.borrarRegistro!= undefined) {
                  this.EliminarElementoTabla(this.borrarRegistro.Elemento);
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
      
  }

  labelPosition: 'media' | 'alta' = 'alta';
  value = 'Clear me';
  cantidadCapturada: string='';
  cantidad: number = 0;
  tempo: Element[] = [];;


  displayedColumns: string[] = ['Elemento', 'Cantidad', 'Descripcion', 'icon'];
  dataSource: MatTableDataSource<Element>;
  //dataSource!: MatTableDataSource<Element>;
// **********************************************************

  ngOnInit() {
    this.updateCloseButtonLabel('Cerrar Calendario');
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
  eliminarFila(element: Element) {
    this.borrarRegistro=element;
  }

  EliminarElementoTabla(elemento: string) {
    this.dataSource.data = this.dataSource.data.filter((u) => u.Elemento !== elemento);
    this.notification.success("¡El registro se borro exitosamente!");
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
capturaAgregar() {
console.log(this.cantidad)
console.log(this.materialElegido)
  this.tempo = this.dataSource.data.filter((u) => u.Elemento == this.materialElegido.Elemento);
  if (this.tempo.length > 0) {
    this.dataSource.data = this.dataSource.data.filter((u) => u.Elemento != this.materialElegido.Elemento);
    this.dataSource.data.push({
      Elemento: this.tempo[0].Elemento,
      Cantidad: this.tempo[0].Cantidad+this.cantidad,
      Descripcion: this.tempo[0].Descripcion
    });
    
  }
  else {
    this.dataSource.data.push({
      Elemento: this.materialElegido.Elemento,
      Cantidad: this.cantidad,
      Descripcion: this.materialElegido.Descripcion
    });

  }
  this.dataSource.data = this.dataSource.data
  this.cantidadCapturada = ''
  this.valorElegido = ''
  this.cantidad = 0
}
  
}


export interface Element {
  Elemento: string;
  Cantidad: number;
  Descripcion: string;
}

