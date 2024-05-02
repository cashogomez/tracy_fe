import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empaque, EmpaqueRequest } from '@app/models/backend/empaque';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpaqueService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaempaque(empaque: EmpaqueRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/`);
    return this.http.post<Empaque>(`${environment.url}ceye/empaque/`, empaque, httpOptions)
  }
  traerempaques(): Observable<Empaque[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/`);
    return  this.http.get<Empaque[]>(`${environment.url}ceye/empaque/`, httpOptions)
  }
  traerUNempaque(pk:number): Observable<Empaque> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/${pk}`);
    return  this.http.get<Empaque>(`${environment.url}ceye/empaque/${pk}`, httpOptions)
  }
  borrarempaque(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/${pk}`);
    return  this.http.delete<Empaque>(`${environment.url}ceye/empaque/${pk}`, httpOptions)
  }
  editarempaque(empaque: Empaque, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/empaque/${pk}`);
    return  this.http.put<Empaque>(`${environment.url}ceye/empaque/${pk}`, empaque, httpOptions)
  }
}
