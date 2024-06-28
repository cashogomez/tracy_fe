import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketInstrumento, TicketInstrumentoRequest } from '@app/models/backend/ticketinstrumento';
import { TicketSet, TicketSetRequest } from '@app/models/backend/ticketset';
import { TicketSetOA, TicketSetOARequest } from '@app/models/backend/ticketsetoa';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsetOAService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaticketsetOA(registrarTicketSet: TicketSetOARequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/ticketoa/${registrarTicketSet.ticket.id}/set/${registrarTicketSet.set.id}`
    console.log(registrarTicketSet);
    return this.http.post<any>(direccion, {'set':registrarTicketSet.set, 'ticket': registrarTicketSet.ticket, 'cantidad': registrarTicketSet.cantidad }, httpOptions)
  }

  traerticketsetOA(pk:number): Observable<TicketSetOA[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/${pk}/set/`);
    return  this.http.get<TicketSetOA[]>(`${environment.url}ceye/ticketoa/${pk}/set/`, httpOptions)
  }
  
  traerUNticketsetOA(pk:number): Observable<TicketSetOA> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/set/${pk}`);
    return  this.http.get<TicketSetOA>(`${environment.url}ceye/ticketoa/set/${pk}`, httpOptions)
  }
  borrarticketsetOA(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/set/${pk}`);
    return  this.http.delete<TicketSetOA>(`${environment.url}ceye/ticketoa/set/${pk}`, httpOptions)
  }
  editarticketsetOA(editarTicketset: TicketSetOA, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticketoa/set/${pk}`);
    return  this.http.put<TicketSetOA>(`${environment.url}ceye/ticketoa/set/${pk}`, editarTicketset, httpOptions)
  }
}
