import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialEsterilizador, MaterialEsterilizadorRequest } from '@app/models/backend/materialesterilizador';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialesterilizadorService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altamaterialesterilizador(registrarMaterialEsterilizador: MaterialEsterilizadorRequest): Observable<MaterialEsterilizador> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/MaterialEnEsterilizador/eventoesterilizacion/`
    return this.http.post<MaterialEsterilizador>(direccion,registrarMaterialEsterilizador , httpOptions)
  }

  traermaterialesterilizador(pk:number): Observable<MaterialEsterilizador[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/MaterialEnEsterilizador/esterilizador/${pk}`);
    return  this.http.get<MaterialEsterilizador[]>(`${environment.url}ceye/MaterialEnEsterilizador/esterilizador/${pk}`, httpOptions)
  }
  
  traerUNmaterialesterilizador(pk:number): Observable<MaterialEsterilizador> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/MaterialEnEsterilizador/${pk}`);
    return  this.http.get<MaterialEsterilizador>(`${environment.url}ceye/MaterialEnEsterilizador/${pk}`, httpOptions)
  }
  borrarmaterialesterilizador(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/MaterialEnEsterilizador/${pk}`);
    return  this.http.delete<MaterialEsterilizador>(`${environment.url}ceye/MaterialEnEsterilizador/${pk}`, httpOptions)
  }
  editareventoesterilizacion(editarMaterialEsterilizador: MaterialEsterilizador, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    //console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    console.log('-----------------------------------------------')
    console.log(editarMaterialEsterilizador)
    return  this.http.put<MaterialEsterilizador>(`${environment.url}ceye/MaterialEnEsterilizador/${pk}`, editarMaterialEsterilizador, httpOptions)
  }
}
