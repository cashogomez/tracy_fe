import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketRequest, Ticket } from '@app/models/backend/ticket';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaticket(ticket: TicketRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/`);
    return this.http.post<Ticket>(`${environment.url}ceye/ticket/`, ticket, httpOptions)
  }
  traertickets(): Observable<Ticket[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/`);
    return  this.http.get<Ticket[]>(`${environment.url}ceye/ticket/`, httpOptions)
  }
  traerUNticket(pk:number): Observable<Ticket> {
    var token = this.getToken();
    console.log(pk)
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/${pk}`);
    return  this.http.get<Ticket>(`${environment.url}ceye/ticket/${pk}`, httpOptions)
  }
  borrarticket(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/${pk}`);
    return  this.http.delete<Ticket>(`${environment.url}ceye/ticket/${pk}`, httpOptions)
  }
  editarticket(ticket: Ticket, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/${pk}`);
    return  this.http.put<Ticket>(`${environment.url}ceye/ticket/${pk}`, ticket, httpOptions)
  }
}