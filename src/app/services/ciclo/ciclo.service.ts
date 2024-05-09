import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciclo, CicloRequest } from '@app/models/backend/ciclo';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CicloService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaciclo(ciclo: CicloRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ciclo/`);
    return this.http.post<Ciclo>(`${environment.url}ceye/ciclo/`, ciclo, httpOptions)
  }
  traerciclos(): Observable<Ciclo[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ciclo/`);
    return  this.http.get<Ciclo[]>(`${environment.url}ceye/ciclo/`, httpOptions)
  }
  traerUNciclo(pk:number): Observable<Ciclo> {
    var token = this.getToken();
    console.log(pk)
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ciclo/${pk}`);
    return  this.http.get<Ciclo>(`${environment.url}ceye/ciclo/${pk}`, httpOptions)
  }
  borrarciclo(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ciclo/${pk}`);
    return  this.http.delete<Ciclo>(`${environment.url}ceye/ciclo/${pk}`, httpOptions)
  }
  editarciclo(ciclo: Ciclo, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ciclo/${pk}`);
    return  this.http.put<Ciclo>(`${environment.url}ceye/ciclo/${pk}`, ciclo, httpOptions)
  }
}
