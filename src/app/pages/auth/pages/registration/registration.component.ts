import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Observable } from 'rxjs';
import { Puesto } from '@app/models/backend/puesto';
import { AreaTrabajo } from '@app/models/backend/area';

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

  puestoElegido !: Puesto;
  areaElegida !: AreaTrabajo;


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
      is_admin : false,
      is_active : true,
      is_staff : true,
      is_superadmin : false,

    };
    console.log(userRegistrationRequest);
    console.log(userRegistrationRequest.foto);
    this.store.dispatch(new fromUser.SignUpEmail(userRegistrationRequest));
  }
  onFilesChanged(urls: string | string[]): void {
    this.foto=urls[0];
  }
  
}
