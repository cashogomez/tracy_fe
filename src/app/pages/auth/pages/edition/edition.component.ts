import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Observable } from 'rxjs';
import { Puesto } from '@app/models/backend/puesto';
import { AreaTrabajo } from '@app/models/backend/area';
import { ThemePalette } from '@angular/material/core';
import { MatRadioChange } from '@angular/material/radio';
import { PuestoService } from '@app/services/puesto/puesto.service';
import { AreatrabajoService  } from '@app/services/AreaTrabajo/areatrabajo.service';
import { UserResponse } from '@app/store/user';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edition',
  standalone: false,
  templateUrl: './edition.component.html',
  styleUrl: './edition.component.scss'
})
export class EditionComponent implements OnInit {

  formaEdicion!: FormGroup<TicketForma>;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>, 
    private puestoService : PuestoService, 
    private areatrabajoService: AreatrabajoService 
  ) 
  {
}
ngOnInit(): void {
  this.recargar()



  this.formaEdicion = this.fb.nonNullable.group({

    nombre: [''],
    paterno: [''],
    materno: [''],
    email: [''],
    username: [''],
    telefono: [''],
    password: [''],
    password2:[''],
    foto: [''],
    response: [''],
    puesto : [''],
    area : [''],
    empresa_id : [''],
    numeroEmpleado: [''],
    is_admin : [''],
    is_active : [''],
    is_staff : [''],
    is_superadmin : [''],
    selectedRadio:['']

 });

  // this.puestoService.listaPuestos().subscribe(data => {
  //   this.puesto = data;
  // });
  // this.areatrabajoService.listaAreasTrabajo().subscribe(data => {
  //   this.area = data;
  // })

  this.formaEdicion?.get('nombre')?.setValue(this.usuario?.nombre!)
  this.formaEdicion?.get('paterno')?.setValue(this.usuario?.paterno!)
  this.formaEdicion?.get('materno')?.setValue(this.usuario?.materno!)
  this.formaEdicion?.get('username')?.setValue(this.usuario?.username!)
  this.formaEdicion?.get('telefono')?.setValue(this.usuario?.telefono!)
  this.formaEdicion?.get('email')?.setValue(this.usuario?.email!)
  this.formaEdicion?.get('empresa_id')?.setValue(this.usuario?.empresa_id!)
  this.formaEdicion?.get('numeroEmpleado')?.setValue(this.usuario?.numeroEmpleado!)
  this.formaEdicion?.get('puesto')?.setValue(this.usuario?.puesto!)
  this.formaEdicion?.get('area')?.setValue(this.usuario?.area!)
  this.formaEdicion?.get('is_active')?.setValue(this.usuario?.is_active!)
  this.formaEdicion?.get('is_staff')?.setValue(this.usuario?.is_staff!)
  this.formaEdicion?.get('is_admin')?.setValue(this.usuario?.is_admin!)
  this.formaEdicion?.get('is_superadmin')?.setValue(this.usuario?.is_superadmin!)
}
recargar(): void {
  this.store.select(fromUser.getUserState).subscribe( rs => {
      const indexOfM = Object.keys(rs).indexOf( 'user' );
      const s:fromUser.UserState  = Object.values(rs)[indexOfM];
      this.usuario = JSON.parse(JSON.stringify(s.entity));  
      console.log(this.usuario) 
  });
}
usuario: UserResponse | null = null;
  foto : string ="/assets/generales/silueta.jpg";
  area: AreaTrabajo[]=[];
  puesto: Puesto[] = [];


  puestoElegido !: Puesto;
  areaElegida !: AreaTrabajo;
  selectedRadio : string = '';
  is_active : boolean = false;
  is_staff : boolean = false;
  is_admin : boolean = false;
  is_superuser : boolean = false;
  puesto_id : number = 0;
  area_id : number = 0;
  permisos = [
    'usuario' , 
    'staff', 
    'administrador', 
    'superusuario'
  ];
  changePuesto(valor: Puesto){
    this.puestoElegido = valor;
    if (this.puestoElegido != null) {
      this.puesto_id = this.puestoElegido.id;
    }
    //console.log(this.puestoElegido);
      //this.puestoElegido =  valor;
      //console.log(this.puestoElegido);
  }
  
changeArea(valor: AreaTrabajo) { 
    this.areaElegida = valor;
    this.area_id = this.areaElegida.id;
}
radioButtonChange(data: MatRadioChange) {
  this.selectedRadio= this.formaEdicion.get('selectedRadio')?.value!
  switch (this.selectedRadio)
  {
      case this.permisos[0]:
          this.is_active = true;
          this.is_staff = false;
          this.is_admin = false;
          this.is_superuser = false;
        break;
      case this.permisos[1]:
          this.is_active  = false;
          this.is_staff = true;
          this.is_admin = false;
          this.is_superuser = false;
        break;
        case this.permisos[2]:
          this.is_active  = false;
          this.is_staff = false;
          this.is_admin = true;
          this.is_superuser = false;
        break;
        case this.permisos[3]:
          this.is_active  = false;
          this.is_staff = false;
          this.is_admin = false;
          this.is_superuser = true;
        break;
    default:
        alert('Default case');
        break;
  }
  }
  


  datosUsuario(): fromUser.UserCreateRequest {
    const tickerCapturado: fromUser.UserCreateRequest = {
      nombre: this.formaEdicion?.get('nombre')?.value!,
      paterno: this.formaEdicion?.get('paterno')?.value!,
      materno: this.formaEdicion?.get('materno')?.value!,
      email: this.formaEdicion?.get('email')?.value!,
      username: this.formaEdicion?.get('username')?.value!,
      telefono: this.formaEdicion?.get('telefono')?.value!,
      password: this.formaEdicion?.get('password')?.value!,
      password2: this.formaEdicion?.get('password2')?.value!,
      foto: this.formaEdicion?.get('foto')?.value!,
      response: this.formaEdicion?.get('response')?.value!,
      puesto: this.formaEdicion?.get('puesto')?.value!,
      area: this.formaEdicion?.get('area')?.value!,
      empresa_id: this.formaEdicion?.get('empresa_id')?.value!,
      numeroEmpleado: this.formaEdicion?.get('numeroEmpleado')?.value!,
      is_admin: this.is_admin.toString(),
      is_active: this.is_active.toString(),
      is_staff: this.is_staff.toString(),
      is_superadmin: this.is_superuser.toString(),
    };
    console.log(this.is_active)
    console.log(this.is_staff)
    console.log(this.is_admin)
    console.log(this.is_superuser)
    
    
    console.log(tickerCapturado)
    return tickerCapturado;
    // ***********************************************************
  }


  editarUsuario(form: NgForm){
    const userRegistrationRequest: fromUser.UserCreateRequest = {
      nombre: form.value.nombre,
      paterno: form.value.paterno,
      materno: form.value.materno,
      email: form.value.email,
      username: form.value.username,
      telefono: form.value.telefono,
      password: form.value.password,
      password2: form.value.passwordConfirme,
      foto: this.foto,
      response: '',
      puesto :form.value.puesto,
      area : form.value.area,
      empresa_id : form.value.empresa,
      numeroEmpleado: form.value.noempleado,
      is_admin : this.is_admin.toString(),
      is_active : this.is_active.toString(),
      is_staff : this.is_staff.toString(),
      is_superadmin : this.is_superuser.toString(),

    };
    console.log('***********************');
    console.log(userRegistrationRequest);
    console.log('****************************');
    this.store.dispatch(new fromUser.SignUpEmail(userRegistrationRequest));
  }
  onFilesChanged(urls: string | string[]): void {
    this.foto=urls[0];
  }






}


interface TicketForma {
  nombre:FormControl<string>;
  paterno:FormControl<string>;
  materno:FormControl<string>;
  email: FormControl<string>;
  username: FormControl<string>;
  telefono: FormControl<string>;
  password: FormControl<string>;
  password2: FormControl<string>;
  foto: FormControl<string>;
  response:  FormControl<string>;
  puesto : FormControl<string>;
  area : FormControl<string>;
  empresa_id : FormControl<string>;
  numeroEmpleado: FormControl<string>;
  is_admin : FormControl<string>;
  is_active : FormControl<string>;
  is_staff : FormControl<string>;
  is_superadmin : FormControl<string>;
  selectedRadio: FormControl<string>;
}
