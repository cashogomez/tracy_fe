import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CantidadInstrumentoEnviado, CantidadInstrumentoRequest } from '@app/models/backend/cantidadinstrumento';
import { SetEnviado, SetRequest } from '@app/models/backend/set';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CantidadInstrumentoService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altacantidadinstrumento(registrarCantidadInstrumento: CantidadInstrumentoRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/cantidadinstrumento/`);
    return this.http.post<any>(`${environment.url}ceye/cantidadinstrumento/`, registrarCantidadInstrumento, httpOptions)
  }

  traercantidadinstrumento(): Observable<CantidadInstrumentoEnviado[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/cantidadinstrumento/`);
    return  this.http.get<CantidadInstrumentoEnviado[]>(`${environment.url}ceye/cantidadinstrumento/`, httpOptions)
  }
  
  traerUNset(pk:number): Observable<CantidadInstrumentoEnviado> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/cantidadinstrumento/${pk}`);
    return  this.http.get<CantidadInstrumentoEnviado>(`${environment.url}ceye/cantidadinstrumento/${pk}`, httpOptions)
  }
  borrarset(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/cantidadinstrumento/${pk}`);
    return  this.http.delete<CantidadInstrumentoEnviado>(`${environment.url}ceye/cantidadinstrumento/${pk}`, httpOptions)
  }
  editarset(editarSet: CantidadInstrumentoEnviado, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/cantidadinstrumento/${pk}`);
    return  this.http.put<CantidadInstrumentoEnviado>(`${environment.url}ceye/cantidadinstrumento/${pk}`, editarSet, httpOptions)
  }
}
