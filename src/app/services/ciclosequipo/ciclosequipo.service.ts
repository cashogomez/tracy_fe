import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CiclosEquipo, CiclosEquipoRequest } from '@app/models/backend/ciclosequipo';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiclosequipoService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaciclosequipo(registrarCiclosEquipo: CiclosEquipoRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/equipo/${registrarCiclosEquipo.equipo.id}/ciclo/${registrarCiclosEquipo.ciclo.id}`
    console.log(registrarCiclosEquipo);
    return this.http.post<any>(direccion, {'equipo':registrarCiclosEquipo.equipo, 'ciclo': registrarCiclosEquipo.ciclo }, httpOptions)
  }

  traerciclosequipo(pk:number): Observable<CiclosEquipo[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/${pk}/ciclos/`);
    return  this.http.get<CiclosEquipo[]>(`${environment.url}ceye/equipo/${pk}ciclos/`, httpOptions)
  }
  
  traerUNcicloequipo(pk:number): Observable<CiclosEquipo> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/ciclo/${pk}`);
    return  this.http.get<CiclosEquipo>(`${environment.url}ceye/equipo/ciclo/${pk}`, httpOptions)
  }
  borrarcicloequipo(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/ciclo/${pk}`);
    return  this.http.delete<CiclosEquipo>(`${environment.url}ceye/equipo/ciclo/${pk}`, httpOptions)
  }
  editarcicloequipo(editarCicloEquipo: CiclosEquipo, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    //console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    console.log('-----------------------------------------------')
    console.log(editarCicloEquipo)
    return  this.http.put<CiclosEquipo>(`${environment.url}ceye/equipo/ciclo/${pk}`, editarCicloEquipo, httpOptions)
  }
}
