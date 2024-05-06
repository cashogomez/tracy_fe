import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turno, TurnoRequest } from '@app/models/backend/turno';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaturno(registrarTurno: TurnoRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/turno/`);
    return this.http.post<Turno>(`${environment.url}ceye/turno/`, registrarTurno, httpOptions)
  }
  traerturnos(): Observable<Turno[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/turno/`);
    return  this.http.get<Turno[]>(`${environment.url}ceye/turno/`, httpOptions)
  }
  traerUNturno(pk:number): Observable<Turno> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/turno/${pk}`);
    return  this.http.get<Turno>(`${environment.url}ceye/turno/${pk}`, httpOptions)
  }
  borrarturno(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/turno/${pk}`);
    return  this.http.delete<Turno>(`${environment.url}ceye/turno/${pk}`, httpOptions)
  }
  editarturno(editarTurno: Turno, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/turno/${pk}`);
    return  this.http.put<Turno>(`${environment.url}ceye/turno/${pk}`, editarTurno, httpOptions)
  }
}
