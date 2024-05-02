import { DataSource } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-crear-empaque',
  standalone: true,
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
    QRCodeModule
  ],
  templateUrl: './crear-empaque.component.html',
  styleUrl: './crear-empaque.component.scss'
})
export class CrearEmpaqueComponent {
  
  @Input()  empaqueACrear!: string;

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
  
  constructor(private instrumentosSet: CantidadInstrumentoService,
              private admonempaquesService: AdmonempaquesService,
              private setService: SetService,
              private empaqueService: EmpaqueService,
              private imprimirQR: ImprimirQRService
  ) {
    
    this.dataSource = new MatTableDataSource(this.empaque);
  }
  ngOnInit() {
    this.setService.traerUNset(Number(this.empaqueACrear)).subscribe(setElegido => {
      this.setActual= setElegido
      this.letreroSet = this.setActual.nombre
    });
    // ********************* CARGA DE LOS DATOS *******************
    this.admonempaquesService.traeradmonempaques().subscribe(matEmpaque => {
      matEmpaque.forEach(material => this.options.push({name: material.id+' '+material.nombre+' '+material.marca}))
      
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
        console.log(empaquePA)
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
    this.imprimirQR.createPDF('Casimiro Gomez', this.setActual.nombre, new Date().toLocaleString(), new Date().toLocaleString(), this.codigos[0])
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
    return splitted[0]
  }
  crearEmpaques() {
    let numerodeQR = this.form.get('Cantidad')?.value;
    console.log(this.instrumentoRecibido)
    this.traerMaterialEmpaque(this.instrumentoRecibido.name)
    this.admonempaquesService.traeradmonempaques().subscribe((materialempaque)=> {
      console.log(materialempaque)
      console.log(this.form.get('EmpaquesR')?.value)
      console.log(this.form.get('Cantidad')?.value)
      this.generadorQR(numerodeQR!, this.setActual)
      this.codigos.forEach((codigo)=> {
        let registrarEmpaqueRequest: EmpaqueRequest = {
          realizados: numerodeQR!,
          codigo_qr: codigo,
          created: new Date().toLocaleString(),
          update: new Date().toLocaleString(),
          materialempaque: materialempaque[0]
        }
        console.log(registrarEmpaqueRequest)
        this.empaqueService.altaempaque(registrarEmpaqueRequest).subscribe((empaqueSubido)=> {
          console.log(empaqueSubido)
        })
      })

    })
    
    

  }
  generadorQR(valor: number, setUsado: SetEnviado) {
    let familia = Buffer.from(
      setUsado.id.toString() +
      setUsado.nombre +
      
      setUsado.maximo.toString() +
      setUsado.minimo.toString()).toString('base64')
      if (this.codigos.length > 0) {
        this.codigos = []
      }
    for (let i = 1; i < valor+1; i++) {
      this.codigos.push(familia+','+i.toString())
    }
    console.log(this.codigos)
  }
  now = new Date();
  fecha = this.now.toLocaleDateString();
  turno = 2;
  
  
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