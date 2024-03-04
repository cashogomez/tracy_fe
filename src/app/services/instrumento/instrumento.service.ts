import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { Instrumento, InstrumentoRequest } from '@app/models/backend/instrumento';
import { UserResponse } from '@app/store/user';
import * as fromUser from '@app/store/user';

@Injectable({
  providedIn: 'root'
})
export class InstrumentoService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altainstrumento(instrumento: InstrumentoRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/instrumento/`);
    return this.http.post<Instrumento>(`${environment.url}ceye/instrumento/`, instrumento, httpOptions)
  }
  traerinstrumentos(): Observable<Instrumento[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/instrumento/`);
    return  this.http.get<Instrumento[]>(`${environment.url}ceye/instrumento/`, httpOptions)
  }
}
