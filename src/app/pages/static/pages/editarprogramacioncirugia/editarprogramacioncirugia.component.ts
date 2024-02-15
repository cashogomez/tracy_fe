import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

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
  ],
  templateUrl: './editarprogramacioncirugia.component.html',
  styleUrl: './editarprogramacioncirugia.component.scss'
})
export class EditarprogramacioncirugiaComponent {

  constructor(
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        // Assign the data to the data source for the table to render
      
  }

  labelPosition: 'media' | 'alta' = 'alta';
  value = 'Clear me';


  displayedColumns: string[] = ['Elemento', 'Cantidad', 'Descripcion', 'icon'];
  dataSource = ELEMENT_DATA;


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
  aceptar() {
    console.log('acepto');
  }
  cancelar() {
    console.log('cancelar');
  }
  eliminarRegistro(elemento: Element) {
    console.log(elemento)
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


