import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bowie, BowieRequest } from '@app/models/backend/bowie';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BowieService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaBowie(Bowie: BowieRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/Bowie/`);
    return this.http.post<Bowie>(`${environment.url}ceye/Bowie/`, Bowie, httpOptions)
  }
  traerBowie(): Observable<Bowie[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/Bowie/`);
    return  this.http.get<Bowie[]>(`${environment.url}ceye/Bowie/`, httpOptions)
  }

  traerListaBowie(): Observable<Bowie[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/Bowie/`);
    return  this.http.get<Bowie[]>(`${environment.url}ceye/Bowie/idesterilizador/`, httpOptions)
  }


  traerUNBowie(pk:number): Observable<Bowie> {
    var token = this.getToken();
    console.log(pk)
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/Bowie/${pk}`);
    return  this.http.get<Bowie>(`${environment.url}ceye/Bowie/${pk}`, httpOptions)
  }
  borrarBowie(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/Bowie/${pk}`);
    return  this.http.delete<Bowie>(`${environment.url}ceye/Bowie/${pk}`, httpOptions)
  }
  editarBowie(Bowie: Bowie, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/Bowie/${pk}`);
    return  this.http.put<Bowie>(`${environment.url}ceye/Bowie/${pk}`, Bowie, httpOptions)
  }
}
