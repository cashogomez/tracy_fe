import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetEnviado, SetRequest } from '@app/models/backend/set';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaset(registrarSet: SetRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/set/`);
    return this.http.post<SetEnviado>(`${environment.url}ceye/set/`, registrarSet, httpOptions)
  }
  traersets(): Observable<SetEnviado[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/set/`);
    return  this.http.get<SetEnviado[]>(`${environment.url}ceye/set/`, httpOptions)
  }
  traerUNset(pk:number): Observable<SetEnviado> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/set/${pk}/`);
    return  this.http.get<SetEnviado>(`${environment.url}ceye/set/${pk}/`, httpOptions)
  }
  borrarset(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/set/${pk}`);
    return  this.http.delete<SetEnviado>(`${environment.url}ceye/set/${pk}`, httpOptions)
  }
  editarset(editarSet: SetEnviado, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/set/${pk}/`);
    return  this.http.put<SetEnviado>(`${environment.url}ceye/set/${pk}/`, editarSet, httpOptions)
  }
}
