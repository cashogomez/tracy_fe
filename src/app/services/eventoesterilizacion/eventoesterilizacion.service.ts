import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventoEsterilizacion, EventoEsterilizacionRequest } from '@app/models/backend/eventoesterilizacion';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoesterilizacionService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaeventoesterilizacion(registrarEventoEsterilizacion: EventoEsterilizacionRequest, pk:number): Observable<EventoEsterilizacion> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/eventoesterilizacion/ciclo/${pk}`
    console.log(registrarEventoEsterilizacion);
    return this.http.post<EventoEsterilizacion>(direccion,registrarEventoEsterilizacion , httpOptions)
  }

  traereventoesterilizacion(pk:number): Observable<EventoEsterilizacion[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/eventoesterilizacion/esterilizador/${pk}`);
    return  this.http.get<EventoEsterilizacion[]>(`${environment.url}ceye/eventoesterilizacion/esterilizador/${pk}`, httpOptions)
  }
  
  traerUNeventoesterilizacion(pk:number): Observable<EventoEsterilizacion> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/eventoesterilizacion/${pk}`);
    return  this.http.get<EventoEsterilizacion>(`${environment.url}ceye/eventoesterilizacion/${pk}`, httpOptions)
  }
  borrareventoesterilizacion(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/eventoesterilizacion/${pk}`);
    return  this.http.delete<EventoEsterilizacion>(`${environment.url}ceye/eventoesterilizacion/${pk}`, httpOptions)
  }
  editareventoesterilizacion(editarEventoEsterilizacion: EventoEsterilizacion, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    //console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    console.log('-----------------------------------------------')
    console.log(editarEventoEsterilizacion)
    return  this.http.put<EventoEsterilizacion>(`${environment.url}ceye/eventoesterilizacion/${pk}`, editarEventoEsterilizacion, httpOptions)
  }

}
