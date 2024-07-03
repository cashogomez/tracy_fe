import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketInstrumento, TicketInstrumentoRequest } from '@app/models/backend/ticketinstrumento';
import { TicketSet, TicketSetRequest } from '@app/models/backend/ticketset';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsetService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaticketset(registrarTicketSet: TicketSetRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/ticket/${registrarTicketSet.ticket.id}/set/${registrarTicketSet.set.id}`
    console.log(registrarTicketSet);
    return this.http.post<any>(direccion, {'set':registrarTicketSet.set, 'ticket': registrarTicketSet.ticket, 'cantidad': registrarTicketSet.cantidad, 'entregados': registrarTicketSet.entregados }, httpOptions)
  }

  traerticketset(pk:number): Observable<TicketSet[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/${pk}/set/`);
    return  this.http.get<TicketSet[]>(`${environment.url}ceye/ticket/${pk}/set/`, httpOptions)
  }
  
  traerUNticketset(pk:number): Observable<TicketSet> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/set/${pk}`);
    return  this.http.get<TicketSet>(`${environment.url}ceye/ticket/set/${pk}`, httpOptions)
  }
  borrarticketset(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/set/${pk}`);
    return  this.http.delete<TicketSet>(`${environment.url}ceye/ticket/set/${pk}`, httpOptions)
  }
  editarticketset(editarTicketset: TicketSet, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/set/${pk}`);
    return  this.http.put<TicketSet>(`${environment.url}ceye/ticket/set/${pk}`, editarTicketset, httpOptions)
  }
}
