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


@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  loading$ !: Observable<boolean | null>;
  foto : string ="/assets/generales/silueta.jpg";
  area = [
    {name:"Ceye"},
    {name:"Quirófano"},
    {name:"Urgencias"},
  ];
  puesto= [
    {name:"Enfermero"},
    {name:"Cirujano"},
    {name:"Anestesiologo"},
  ];
  permisos = [
    'usuario' , 
    'staff', 
    'administrador', 
    'superusuario'
  ];

  puestoElegido !: Puesto;
  areaElegida !: AreaTrabajo;
  selectedRadio : string = '';
  is_active : boolean = false;
  is_staff : boolean = false;
  is_admin : boolean = false;
  is_superuser : boolean = false;


  constructor(private store: Store<fromRoot.State>) {
    
  }
  ngOnInit(): void {
  }
  changePuesto(valor: string){
    this.puestoElegido = {
      tipo: valor,
    }
    console.log(valor);
      //this.puestoElegido =  valor;
      //console.log(this.puestoElegido);
  }
  changeArea(valor: string){
    this.areaElegida = {
      tipo: 'interna',
      nombre: valor

    }
    
    console.log(valor);
    //this.areaElegida = valor;
}
radioButtonChange(data: MatRadioChange) {
  switch (this.selectedRadio)
  {
      case this.permisos[0]:
          this.is_active  = true;
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
  console.log(this.selectedRadio)
}
  registrarUsuario(form: NgForm){
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
      puesto : this.puestoElegido,
      area : this.areaElegida,
      empresa_id : form.value.empresa,
      numeroEmpledo: form.value.noempleado,
      is_admin : this.is_admin,
      is_active : this.is_active,
      is_staff : this.is_staff,
      is_superadmin : this.is_superuser,

    };
    console.log(userRegistrationRequest);
    console.log(userRegistrationRequest.foto);
    this.store.dispatch(new fromUser.SignUpEmail(userRegistrationRequest));
  }
  onFilesChanged(urls: string | string[]): void {
    this.foto=urls[0];
  }
  
}
