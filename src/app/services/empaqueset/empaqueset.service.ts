import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpaqueSet, EmpaqueSetRequest } from '@app/models/backend/empaqueset';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpaquesetService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaempaqueset(registrarEmpaqueSet: EmpaqueSetRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/empaque/${registrarEmpaqueSet.empaque.id}/set/${registrarEmpaqueSet.set.id}`
    console.log(direccion);
    return this.http.post<any>(direccion, {'empaque':registrarEmpaqueSet.empaque, 'set': registrarEmpaqueSet.set, 'cantidad': registrarEmpaqueSet.cantidad }, httpOptions)
  }

  traerempaqueset(pk:number): Observable<EmpaqueSet[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/${pk}/sets/`);
    return  this.http.get<EmpaqueSet[]>(`${environment.url}ceye/empaque/${pk}/sets/`, httpOptions)
  }
  
  traerUNempaqueset(pk:number): Observable<EmpaqueSet> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/set/${pk}`);
    return  this.http.get<EmpaqueSet>(`${environment.url}ceye/empaque/set/${pk}`, httpOptions)
  }
  borrarempaqueset(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/set/${pk}`);
    return  this.http.delete<EmpaqueSet>(`${environment.url}ceye/empaque/set/${pk}`, httpOptions)
  }
  editarempaqueset(editarEmpaqueSet: EmpaqueSet, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    //console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    console.log('-----------------------------------------------')
    console.log(editarEmpaqueSet)
    return  this.http.put<EmpaqueSet>(`${environment.url}ceye/empaque/set/${pk}`, editarEmpaqueSet, httpOptions)
  }
}
