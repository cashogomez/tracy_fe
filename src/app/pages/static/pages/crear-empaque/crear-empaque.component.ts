import { DataSource } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SetEnviado } from '@app/models/backend/set';
import { AdmonempaquesService } from '@app/services/admonempaques/admonempaques.service';
import { CantidadInstrumentoService } from '@app/services/cantidadinstrumento/cantidadinstrumento.service';
import { SetService } from '@app/services/set/set.service';
import { Observable, map, startWith } from 'rxjs';
import { QRCodeModule } from 'angularx-qrcode';
import { Buffer } from "buffer";
import { EmpaqueService } from '@app/services/empaque/empaque.service';
import { EmpaqueRequest } from '@app/models/backend/empaque';
import { ImprimirQRService } from '@app/services/imprimirQR/imprimir-qr.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { UserResponse } from '@app/store/user';
import { TurnoService } from '@app/services/turno/turno.service';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { MaterialEmpaque } from '@app/models/backend/admonempaques';
import { EmpaquesetService } from '@app/services/empaqueset/empaqueset.service';
import { EmpaqueSetRequest } from '@app/models/backend/empaqueset';
import { NotificationService } from '@app/services/notification/notification.service';


@Component({
  selector: 'app-crear-empaque',
  standalone: true,
  providers: [
    DatePipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule, 
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
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
    QRCodeModule,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './crear-empaque.component.html',
  styleUrl: './crear-empaque.component.scss'
})
export class CrearEmpaqueComponent {

  
  @Input()  empaqueACrear!: string;
  @Output() creacionEmpaque = new EventEmitter<string>();
  estaCreado: string = ' ';

postData (valorEnviado: string) {
  this.creacionEmpaque.emit(valorEnviado);
}
  turno: number = 0;
  imprimir: boolean = false;
  options: User[] = [];
  instrumentoRecibido!: User;
  myControl = new FormControl<string | User>('');
  dataSource: MatTableDataSource<Element>;
  empaque: Element[] = [];
  filteredOptions!: Observable<User[]>;
  setActual!: SetEnviado;
  letreroSet: string = '';
  text: string = ''
  codigos: string[]=[];
  usuario: UserResponse | null = null;
  totalPiezas: number = 0;
  horaActual: string  | null = '';
  fechaActual: string | null ='';
  empaqueElegido!: MaterialEmpaque;
  
  constructor(private instrumentosSet: CantidadInstrumentoService,
              private admonempaquesService: AdmonempaquesService,
              private setService: SetService,
              private empaqueService: EmpaqueService,
              private imprimirQR: ImprimirQRService,
              private store: Store<fromRoot.State>,
              private turnoService: TurnoService,
              private datePipe: DatePipe,
              public router: Router,
              private empaquesetService:  EmpaquesetService,
              private notificacionServicio: NotificationService
  ) {
    
    this.dataSource = new MatTableDataSource(this.empaque);
    this.fechaActual = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.horaActual = this.datePipe.transform(new Date(), 'HH:mm:ss');  
    this.turnoService.traerturnos().subscribe(turnosCreados => {
      turnosCreados.forEach(turnocreado => {
        let inicio = turnocreado.inicio;
        let final = turnocreado.fin;
        let numero = turnocreado.numero
        if (this.horaActual! > inicio && this.horaActual!<final) {
          this.turno = numero
        }
      })
    })
  }
  ngOnInit() {
    this.recargar()
    this.setService.traerUNset(Number(this.empaqueACrear)).subscribe(setElegido => {
      this.setActual= setElegido
      this.letreroSet = this.setActual.nombre
    });
    // ********************* CARGA DE LOS DATOS *******************
    this.admonempaquesService.traeradmonempaques().subscribe(matEmpaque => {
      matEmpaque.forEach(material => this.options.push({name: material.id+' '+material.nombre+' '+material.marca}))
      console.log(matEmpaque)
    })


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    console.log(this.empaqueACrear)
    this.instrumentosSet.traercantidadinstrumento(Number(this.empaqueACrear)).subscribe(data => {
      data.forEach(elemento => {
        let empaquePA: Element = {
          id: elemento.id,
          Nombre: elemento.instrumento.nombre,
          Marca: elemento.instrumento.marca,
          Cantidad: elemento.cantidad
        }
        this.totalPiezas = this.totalPiezas+elemento.cantidad
        this.empaque.push(empaquePA);
      })
      this.dataSource.data = this.empaque
    });
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  generarQRImprimir() {
    if (this.imprimir==false) {
      this.imprimir = true;
    }
    else {
      this.imprimir = false;
    }
    let empaqueID = this.traerMaterialEmpaque(this.instrumentoRecibido.name)
    let cantidadDias = 0
    this.admonempaquesService.traerUNempaque(empaqueID).subscribe(empaqueseleccionado => {
      console.log(empaqueseleccionado)
      this.empaqueElegido = empaqueseleccionado
      switch ( empaqueseleccionado.unidad ) {
        case 'dia':
        case 'dias':
        case 'Dia':
        case 'Días':
        case 'días':
            // statement 1
            cantidadDias = empaqueseleccionado.tiempo_vida
            break;
        case 'mes':
        case 'meses':
        case 'Mes':
        case 'Meses':
            // statement 2
            cantidadDias = empaqueseleccionado.tiempo_vida*30
            break;
        case 'año':
        case 'Año':
        case 'años':
        case 'Años':
            // statement N
            cantidadDias = empaqueseleccionado.tiempo_vida*365
            break;
        default: 
            // 
            cantidadDias = empaqueseleccionado.tiempo_vida
            break;
     }
    
     let numerodeQR = this.form.get('Cantidad')?.value;
     this.generadorQR(numerodeQR!, this.setActual)
     let nn=0
     this.codigos.forEach((value) => {
       let caducidadEmpaque: Date = new Date();
       caducidadEmpaque.setDate(caducidadEmpaque.getDate() + cantidadDias);
       this.imprimirQR.createPDF(this.usuario?.nombre!+' '+this.usuario?.paterno!+' '+this.usuario?.materno!, this.setActual.nombre + ' ('+this.totalPiezas.toString()+' piezas)', new Date().toLocaleString(), caducidadEmpaque.toLocaleString(), this.codigos[nn])
       nn++
     })
    })

    
  }
  instrumentoElegido(recibido: User) {
    this.instrumentoRecibido = recibido;
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  traerMaterialEmpaque(seleccionado: string) {
    var splitted = seleccionado.split(" ", 4); 
    let numeroID = Number(splitted[0])
    return numeroID
  }
  recargar(): void {
    this.store.select(fromUser.getUserState).subscribe( rs => {
        const indexOfM = Object.keys(rs).indexOf( 'user' );
        const s:fromUser.UserState  = Object.values(rs)[indexOfM];
        this.usuario = JSON.parse(JSON.stringify(s.entity));   
    });
  }
  crearEmpaques() {
      let numerodeQR = this.form.get('Cantidad')?.value;
      this.codigos.forEach((codigo)=> {
        let registrarEmpaqueRequest: EmpaqueRequest = {
          realizados: numerodeQR!,
          codigo_qr: codigo,
          created: new Date().toLocaleString(),
          update: new Date().toLocaleString(),
          materialempaque: this.empaqueElegido,
        }
        console.log(registrarEmpaqueRequest)
        this.empaqueService.altaempaque(registrarEmpaqueRequest, this.empaqueElegido.id).subscribe((empaqueSubido)=> {
          console.log(empaqueSubido)
          let registrarEmpaqueSet: EmpaqueSetRequest = {
            empaque: empaqueSubido,
            set: this.setActual,
            cantidad: 1
          }
          this.empaquesetService.altaempaqueset(registrarEmpaqueSet).subscribe((empaquesetRecibido) => {
            this.notificacionServicio.success('El empaque fue creado exitosamente')
          })
        })
      })
      if (numerodeQR != null) {
        this.setActual.numero = this.setActual.numero+numerodeQR;
      }      
      this.setService.editarset(this.setActual, this.setActual.id).subscribe((setActualizado) => {
            console.log(setActualizado)  
      })
    this.estaCreado='true'
    this.postData (this.estaCreado)

  }
  generadorQR(valor: number, setUsado: SetEnviado) {
    let familia = Buffer.from(
      setUsado.id.toString()).toString('base64')
    let pos_familia = Buffer.from( this.horaActual! +' '+ this.fechaActual ).toString('base64')
      if (this.codigos.length > 0) {
        this.codigos = []
      }
    for (let i = 1; i < valor+1; i++) {
      this.codigos.push(familia+'.'+pos_familia+'.'+i.toString())
    }
    console.log(this.codigos)
  }
  now = new Date();
  fecha = this.now.toLocaleDateString();

  
  displayedColumns: string[] = ['id', 'Nombre', 'Marca', 'Cantidad'];
  
  form = new FormGroup({
    seleccion: new FormControl(''),
    Cantidad: new FormControl(0),
    EmpaquesR:new FormControl(0),
  
  });
  
  submitted() {
    
    //window.alert(JSON.stringify(this.form.value, null, 2));
  }
  change(event: any) {
    this.text = event.target.value;
    this.form.get('Cantidad')?.setValue(Number(this.text))
    this.form.get('EmpaquesR')?.setValue(Number(this.text))
    console.log("New value = " + event.target.value)
  };
  change2(event: any) {
    this.text = event.target.value;
    this.form.get('Cantidad')?.setValue(Number(this.text))
    this.form.get('EmpaquesR')?.setValue(Number(this.text))
    console.log("New value = " + event.target.value)
  };
}

export interface Element {
  id: number;
  Nombre: string;
  Marca: string;
  Cantidad: number;
}
export interface User {
  name: string;
}
export interface EmpaqueElegido {
  estaCreado: boolean;

}