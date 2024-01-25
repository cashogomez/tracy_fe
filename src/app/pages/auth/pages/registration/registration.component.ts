import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  loading$ !: Observable<boolean | null>;
  foto : string ="/assets/generales/silueta.jpg";

  constructor(private store: Store<fromRoot.State>) {
    
  }
  ngOnInit(): void {
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
      foto: this.foto
    };
    console.log(userRegistrationRequest.nombre);
    console.log(userRegistrationRequest.foto);
    this.store.dispatch(new fromUser.SignUpEmail(userRegistrationRequest));
  }
  onFilesChanged(urls: string | string[]): void {
    this.foto=urls[0];
  }
}
