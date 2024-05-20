import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estatus, EstatusRequest } from '@app/models/backend/estatus';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaestatus(registrarStatus: EstatusRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/estatus/`
    console.log(registrarStatus);
    return this.http.post<any>(direccion, registrarStatus, httpOptions)
  }

  traerestatus(): Observable<Estatus[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/estatus/`);
    return  this.http.get<Estatus[]>(`${environment.url}ceye/estatus/`, httpOptions)
  }
  traerUNestatus(pk:number): Observable<Estatus> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/estatus/${pk}`);
    return  this.http.get<Estatus>(`${environment.url}ceye/estatus/${pk}`, httpOptions)
  }
  borrarticketinstrumento(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/estatus/${pk}`);
    return  this.http.delete<Estatus>(`${environment.url}ceye/estatus/${pk}`, httpOptions)
  }
  editarticketinstrumento(editarEstatus: Estatus, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    //console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    console.log('-----------------------------------------------')
    console.log(editarEstatus)
    return  this.http.put<Estatus>(`${environment.url}ceye/estatus/${pk}`, editarEstatus, httpOptions)
  }
}
