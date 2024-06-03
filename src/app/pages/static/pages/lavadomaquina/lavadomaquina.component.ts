import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/services/notification/notification.service';
import { IncidenciadialogoComponent } from '../incidenciadialogo/incidenciadialogo.component';
import { DialogService } from '@app/services/dialog/dialog.service';
@Component({
  selector: 'app-lavadomaquina',
  standalone: false,
  templateUrl: './lavadomaquina.component.html',
  styleUrl: './lavadomaquina.component.scss'
})

export class LavadomaquinaComponent {

verSegundaTabla = false;
numeroSelecciones = 0;

  /** Constants used to fill up our data base. */
  ELEMENT_DATA: Element[] = [
    {  fecha: '26/10/24', ticket: 12, cirugia: 'Laparoscopia', turno: 1, sala: 1, area: 'urgencia', estado: false  },
    {  fecha: '26/10/24',ticket: 13, cirugia: 'Biopsia', turno: 2, sala: 2, area: 'urgencia', estado: false },
    { fecha: '26/10/24', ticket: 14,cirugia: 'Biopsia', turno: 2, sala: 1, area: 'urgencia', estado: false  },
    { fecha: '26/10/24', ticket: 15,cirugia: 'Apendiceptomia', turno: 1, sala: 3, area: 'urgencia', estado: false  },
    { fecha: '26/10/24' , ticket: 16,cirugia: 'Apendiceptomia', turno: 1, sala: 3, area: 'urgencia', estado: false },
    { fecha: '26/10/24' ,ticket: 17,cirugia: 'Apendiceptomia', turno: 2, sala: 2, area: 'urgencia', estado: false },
    {  fecha: '26/10/24' , ticket: 18,cirugia: 'Biopsia', turno: 3, sala: 2, area: 'urgencia', estado: false },
    { fecha: '26/10/24' , ticket: 19,cirugia: 'alta', turno: 3, sala: 1, area: 'urgencia', estado: false },
    { fecha: '26/10/24' , ticket: 20,cirugia: 'baja', turno: 2, sala: 4, area: 'urgencia', estado: false },
    { fecha: '26/10/24', ticket: 1,cirugia: 'media', turno: 2, sala: 1, area: 'urgencia', estado: false  },
    {  fecha: '26/10/24', ticket: 2,cirugia: 'baja', turno: 1, sala: 3, area: 'urgencia', estado: false  },
    {  fecha: '26/10/24', ticket: 3,cirugia: 'media', turno: 1, sala: 2, area: 'urgencia', estado: false  },
    { fecha: '26/10/24', ticket: 4,cirugia: 'alta', turno: 1, sala: 5, area: 'urgencia', estado: false  },
    { fecha: '26/10/24', ticket: 5,cirugia: 'baja', turno: 1, sala: 2, area: 'urgencia', estado: false },
    {  fecha: '26/10/24', ticket: 6,cirugia: 'baja', turno: 2, sala: 2, area: 'urgencia', estado: false  },
    {  fecha: '26/10/24' , ticket: 7,cirugia: 'Biopsia', turno: 3, sala: 2, area: 'urgencia', estado: false },
    {  fecha: '26/10/24' , ticket: 8,cirugia: 'baja', turno: 3, sala: 1, area: 'urgencia', estado: false },
    {  fecha: '26/10/24' , ticket: 9,cirugia: 'Apendiceptomia', turno: 1, sala: 4, area: 'urgencia', estado: false},
    { fecha: '26/10/24' , ticket: 10,cirugia: 'media', turno: 1, sala: 2, area: 'urgencia', estado: false},
    {  fecha: '26/10/24' , ticket: 11,cirugia: 'media', turno: 1, sala: 3, area: 'urgencia', estado: false },
  ];


  MATERIAL_SEGUNDA: Material[] =[]
  constructor(private notification: NotificationService, public dialog: MatDialog, private dialogService: DialogService) {
    
    // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSegundaTabla = new MatTableDataSource(this.MATERIAL_SEGUNDA);

  }
  emergente1(){
    this.dialogService.emergente1()
   }
  
  abrirDialogo() {
    const dialogo1 = this.dialog.open(IncidenciadialogoComponent, {
      data: new Incidencia('')
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        //this.agregar(art);
      console.log(art);
    });
  }
  ngOnInit() {
  }

  downloadPdf() {

  }

  // ************************ PAGINATOR *******************
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //dataSource: MatTableDataSource<Element>;
  dataSource: MatTableDataSource<Element>;
  dataSegundaTabla: MatTableDataSource<Material>;
// **********************************************************

  displayedColumns = ['ticket', 'fecha',  'cirugia', 'sala', 'turno', 'area', 'accion'];
  displayedSegundaColumns = ['id', 'nombre',  'cantidad', 'lavadoras', 'incidencia'];

  lavarFila(data: Element) {
    var dataModificar = this.ELEMENT_DATA.filter((u) => u.ticket == data.ticket);
    if (dataModificar[0].estado==false) {
      dataModificar[0].estado = true
      this.numeroSelecciones += 1;
      this.notification.success('Material agregado para asignación en lavadora')
      this.MATERIAL_SEGUNDA = this.agregar(dataModificar[0], this.MATERIAL_SEGUNDA);
    }
    else {
      dataModificar[0].estado = false
      this.numeroSelecciones += -1;
      if (this.numeroSelecciones <0) {
        this.numeroSelecciones = 0;
      }
      this.notification.error('Material eliminado de la asignación en lavadora');
      this.MATERIAL_SEGUNDA =  this.eliminar(dataModificar[0], this.MATERIAL_SEGUNDA);
      
    }
    //console.log(' Salida Segunda Tabla ${}', this.MATERIAL_SEGUNDA);
    if (this.numeroSelecciones > 0) {
      this.verSegundaTabla=true;
    }
    else {
      this.verSegundaTabla=false;
    }
    this.dataSegundaTabla = new MatTableDataSource(this.MATERIAL_SEGUNDA);
  }
  agregar(agregarTicket: Element, listaMaterial: Material[] ): Material[] {
    //console.log('Material entrada de Agregar: ${}',listaMaterial)
    // ******************** Simular el acceso s Base de Datos *************
    var dato_agregar = JSON.parse(JSON.stringify(MATERIAL_DATA1));
    var dato_lista = JSON.parse(JSON.stringify(listaMaterial));
    if (dato_lista.length > 0 ) {
      for (var valor of dato_agregar) {
        var dataCorrection = dato_lista.filter((u: Material) => u.id == valor.id);
        //console.log(dataCorrection)
        if (dataCorrection.length > 0) {
          dataCorrection[0].cantidad += valor.cantidad;
          var indice = dato_lista.indexOf(dataCorrection[0]);
          //console.log('Copia: ${} ', indice)
          //console.log('Modificar: ${}',JSON.parse(JSON.stringify(dataCorrection)))
          dato_lista[indice] = dataCorrection[0];
        }
        else {
          dato_lista.push(valor)
          //console.log('Agregar ${}', JSON.parse(JSON.stringify(valor)))
        }
      }

    }
    else {
      dato_lista = JSON.parse(JSON.stringify(dato_agregar));
    }
    
    //console.log(dato_lista.length)
    return dato_lista
  }
  eliminar(eliminarTicket: Element, listaMaterial: Material[]) {

    // ******************** Simular el acceso s Base de Datos *************
    console.log('Eliminar entrada: ${}',listaMaterial)
    var dato_eliminar = JSON.parse(JSON.stringify(MATERIAL_DATA1));
    var dato_lista = JSON.parse(JSON.stringify(listaMaterial));
    if (dato_lista.length > 0 ) {
      for (var valor of dato_eliminar) {
        var dataCorrection = dato_lista.filter((u: Material) => u.id == valor.id);
        //console.log(dataCorrection)
        if (dataCorrection.length > 0) {
          dataCorrection[0].cantidad -= valor.cantidad;
          var indice = dato_lista.indexOf(dataCorrection[0]);
          //console.log('Copia: ${} ', indice)
          //console.log('Modificar: ${}',JSON.parse(JSON.stringify(dataCorrection)))
          dato_lista[indice] = dataCorrection[0];
        }
      }

    }
    var lista = dato_lista.filter((u: Material) => u.cantidad > 0);
    console.log('Eliminar salida: ${}',lista)
    return JSON.parse(JSON.stringify(lista));
  }
  incidencia(elemento: Material) {
    console.log(elemento)
  }
// ****************************** AJUSTE DE LAVADORA ***************************
  lavadora1(dato: Material) {
    var dataModificar = this.MATERIAL_SEGUNDA.filter((u) => u.id == dato.id);
    if (dataModificar[0].lavadora1==false) {
      dataModificar[0].lavadora1 = true
      dataModificar[0].lavadora2 = false
      dataModificar[0].lavadora3 = false
    }
    else {
      dataModificar[0].lavadora1 = false
    }

  }
  lavadora2(dato: Material) {
    var dataModificar = this.MATERIAL_SEGUNDA.filter((u) => u.id == dato.id);
    if (dataModificar[0].lavadora2==false) {
      dataModificar[0].lavadora2 = true
      dataModificar[0].lavadora1 = false
      dataModificar[0].lavadora3 = false
    }
    else {
      dataModificar[0].lavadora2 = false
    }

  }
  lavadora3(dato: Material) {
    var dataModificar = this.MATERIAL_SEGUNDA.filter((u) => u.id == dato.id);
    if (dataModificar[0].lavadora3==false) {
      dataModificar[0].lavadora3 = true
      dataModificar[0].lavadora2 = false
      dataModificar[0].lavadora1 = false
    }
    else {
      dataModificar[0].lavadora3 = false
    }

  }
  
}

export interface Element {
  cirugia: string;
  ticket: number;
  fecha: string;
  sala: number;
  turno: number;
  area: string;
  estado: boolean;
}

export interface Material{
  id: number,
  nombre: string;
  cantidad: number;
  lavadora1: boolean;
  lavadora2: boolean;
  lavadora3: boolean;
}

const MATERIAL_DATA1: Material[] = [
  {id: 100, nombre: 'Pinza Maier 20 cm', cantidad: 10, lavadora1: false, lavadora2: false, lavadora3: false},
  {id: 10, nombre: 'Separador Farabeuf 20 cm', cantidad: 10, lavadora1: false, lavadora2: false, lavadora3: false},
  {id: 2, nombre: 'Porta aguja mayo Hegar 20 cm', cantidad: 3, lavadora1: false, lavadora2: false, lavadora3: false},
  {id: 15, nombre: 'Porta aguja Hegar mayo 14 cm', cantidad: 20, lavadora1: false, lavadora2: false, lavadora3: false},
  {id: 66, nombre: 'Sonda acanalada 13 cm', cantidad: 1, lavadora1: false, lavadora2: false, lavadora3: false},
];
// ****************************** DIALOGO *************
export class Incidencia{
  constructor(public descripcion: string) {
  }
}
