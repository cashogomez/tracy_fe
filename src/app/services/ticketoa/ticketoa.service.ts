import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketOA, TicketOARequest } from '@app/models/backend/ticketoa';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketoaService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaticketoa(ticketoa: TicketOARequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/`);
    return this.http.post<TicketOA>(`${environment.url}ceye/ticketoa/`, ticketoa, httpOptions)
  }
  traertickets(): Observable<TicketOA[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/`);
    return  this.http.get<TicketOA[]>(`${environment.url}ceye/ticketoa/`, httpOptions)
  }
  traerUNticket(pk:number): Observable<TicketOA> {
    var token = this.getToken();
    console.log(pk)
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/${pk}`);
    return  this.http.get<TicketOA>(`${environment.url}ceye/ticketoa/${pk}`, httpOptions)
  }
  borrarticket(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/${pk}`);
    return  this.http.delete<TicketOA>(`${environment.url}ceye/ticketoa/${pk}`, httpOptions)
  }
  editarticket(ticket: TicketOA, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/${pk}`);
    return  this.http.put<TicketOA>(`${environment.url}ceye/ticketoa/${pk}`, ticket, httpOptions)
  }
}
