import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/services/notification/notification.service';
import { IncidenciadialogoComponent } from '../incidenciadialogo/incidenciadialogo.component';
import { Incidencia, IncidenciaRequest } from '@app/models/backend/incidencia';
import { DialogService } from '@app/services/dialog/dialog.service';
import { Router } from '@angular/router';
import { TicketService } from '@app/services/ticket/ticket.service';
import { TicketsetService } from '@app/services/ticketset/ticketset.service';
import { TicketinstrumentoService } from '@app/services/ticketinstrumento/ticketinstrumento.service';

import { CantidadInstrumentoService } from '@app/services/cantidadinstrumento/cantidadinstrumento.service';
@Component({
  selector: 'app-lavadomaquina',
  standalone: false,
  templateUrl: './lavadomaquina.component.html',
  styleUrl: './lavadomaquina.component.scss'
})

export class LavadomaquinaComponent implements OnInit{

verSegundaTabla = false;
numeroSelecciones = 0;

  /** Constants used to fill up our data base. */
  ELEMENT_DATA: Element[] = [];

  tickets: any;

  MATERIAL_SEGUNDA: Material[] =[]
  constructor(
    private notification: NotificationService, 
    public dialog: MatDialog, 
    private dialogService: DialogService,
    private router: Router,
      //--------------------pedir tablas set info --------------------------

   //--------------------traer tablas set info --------------------------
   private Settraer: TicketsetService,
   private TraerInstSet: CantidadInstrumentoService,
   //--------------------traer tablas set info --------------------------

   //--------------------traer tablas Inst info --------------------------
   private Insttraer: TicketinstrumentoService,
   //--------------------traer tablas Inst info --------------------------
    
    private ticketService: TicketService,
  ) 
    {
    
      ticketService.traertickets().subscribe(ticketsRecibidos => {
        ticketsRecibidos.forEach((ticket) => {

          let elementoAgregar = {


            ticket: ticket.id,
            fecha: ticket.fecha_cirugia,
            cirugia: ticket.cirugia,
            sala: ticket.sala,
            turno: ticket.turno,
            area: ticket.area_registro,
            estado: '',
           
          }
          this.ELEMENT_DATA.push(elementoAgregar)
        })
        this.dataSource.data = this.ELEMENT_DATA
      })

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      this.dataSegundaTabla = new MatTableDataSource(this.MATERIAL_SEGUNDA);

      this.dataSourceTemp= new MatTableDataSource(MATERIAL_DATA1);

  }
  goPlaces(){
    this.router.navigate(['static/detallelavado'])
  }
  emergente1(){
    this.dialogService.emergente1()
   }
  
  abrirDialogo() {
    let incidencia: IncidenciaRequest = {
      opcion: '',
      nota: ''
    }
    const dialogo1 = this.dialog.open(IncidenciadialogoComponent, {
      data: incidencia
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
  dataSourceTemp : MatTableDataSource<Material>;
// **********************************************************

  displayedColumns = ['ticket', 'fecha',  'cirugia', 'sala', 'turno', 'area', 'accion'];
  displayedSegundaColumns = ['id', 'nombre',  'cantidad', 'lavadoras', 'incidencia'];

  lavarFila(data: Element) {

    MATERIAL_DATA1 = []

     this.tickets = data?.ticket

    

    this.Settraer.traerticketset(this.tickets).subscribe(setRecibidos=> {

      if (setRecibidos.length != 0) {   
      
      setRecibidos.forEach((set)=>{
        
        this.TraerInstSet.traercantidadinstrumento(set.set.id).subscribe(instSet =>{
        instSet.forEach((inst)=>{
          let instrumento ={
            id: inst.instrumento.id,
            nombre: inst.instrumento.nombre,
            cantidad: inst.cantidad,
            lavadora1: '',
            lavadora2: '',
            lavadora3: '',
          }
          MATERIAL_DATA1.push(instrumento)

        }) 

        this.Insttraer.traerticketinstrumento(this.tickets).subscribe(InstRecibidos=> {
          InstRecibidos.forEach((inst)=>{
            let instAgregar ={
              id:inst.instrumento.id,
              nombre: inst.instrumento.nombre,
              cantidad:inst.cantidad,
              lavadora1: '',
              lavadora2: '',
              lavadora3: '',
            }
            let comparable = MATERIAL_DATA1.filter((IDcomp) => IDcomp.id == instAgregar.id)
          if (comparable.length > 0 ){
            let num = 0;
            MATERIAL_DATA1.forEach(data =>{
              if (data.id  == instAgregar.id ) {
                MATERIAL_DATA1[num].cantidad = MATERIAL_DATA1[num].cantidad + instAgregar.cantidad
              }
             
              num++
            })
      
             //  this.dataSource2[indice].Entregados =     this.dataSource2[indice].Entregados + 1
         
          
        }
            else{
            MATERIAL_DATA1.push(instAgregar)
           }
            
          })

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
    
          //this.dataSourceTemp.data = MATERIAL_DATA1

        }) //:____________________________

  


        })


      })
    }//------------------sadasdasd


    else{
      this.Insttraer.traerticketinstrumento(this.tickets).subscribe(InstRecibidos=> {
        InstRecibidos.forEach((inst)=>{
          let instAgregar ={
            id:inst.instrumento.id,
            nombre: inst.instrumento.nombre,
            cantidad:inst.cantidad,
            lavadora1: '',
            lavadora2: '',
            lavadora3: '',
          }
          var dataModificar2 = MATERIAL_DATA1.indexOf(instAgregar);
          if(dataModificar2 !=-1)
            {
              MATERIAL_DATA1 [dataModificar2].cantidad = MATERIAL_DATA1 [dataModificar2].cantidad + instAgregar.cantidad
            }

            else{
              MATERIAL_DATA1.push(instAgregar)
            }
          
        })

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
  
        //this.dataSourceTemp.data = MATERIAL_DATA1

      }) //:____________________________
    }
    
    }) 

    


    console.log ('xcv ' +this.tickets)
   
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
  cirugia: any;
  ticket: any;
  fecha: any;
  sala: any;
  turno: any;
  area: any;
  estado: any;
}

export interface Material{
  id:  any;
  nombre:  any;
  cantidad:  any;
  lavadora1:  any;
  lavadora2:  any;
  lavadora3: any;
}

var MATERIAL_DATA1:Material[] = [  ]
// ********