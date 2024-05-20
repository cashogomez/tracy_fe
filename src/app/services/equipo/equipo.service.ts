import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipo, EquipoRequest } from '@app/models/backend/equipo';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaequipo(equipo: EquipoRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/`);
    return this.http.post<Equipo>(`${environment.url}ceye/equipo/`, equipo, httpOptions)
  }
  traerequipos(): Observable<Equipo[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/`);
    return  this.http.get<Equipo[]>(`${environment.url}ceye/equipo/`, httpOptions)
  }
  traerUNequipo(pk:number): Observable<Equipo> {
    var token = this.getToken();
    console.log(pk)
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/${pk}`);
    return  this.http.get<Equipo>(`${environment.url}ceye/equipo/${pk}`, httpOptions)
  }
  borrarequipo(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/${pk}`);
    return  this.http.delete<Equipo>(`${environment.url}ceye/equipo/${pk}`, httpOptions)
  }
  editarequipo(equipo: Equipo, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/equipo/${pk}`);
    return  this.http.put<Equipo>(`${environment.url}ceye/equipo/${pk}`, equipo, httpOptions)
  }
}
