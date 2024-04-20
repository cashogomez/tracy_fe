import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketInstrumento, TicketInstrumentoRequest } from '@app/models/backend/ticketinstrumento';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketinstrumentoService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaticketinstrumento(registrarTicketInstrumento: TicketInstrumentoRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    var direccion = `${environment.url}ceye/ticket/${registrarTicketInstrumento.ticket.id}/instrumento/${registrarTicketInstrumento.instrumento.id}/`
    console.log(registrarTicketInstrumento);
    return this.http.post<any>(direccion, {'instrumento':registrarTicketInstrumento.instrumento, 'ticket': registrarTicketInstrumento.ticket, 'cantidad': registrarTicketInstrumento.cantidad }, httpOptions)
  }

  traerticketinstrumento(pk:number): Observable<TicketInstrumento[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/${pk}/instrumento/`);
    return  this.http.get<TicketInstrumento[]>(`${environment.url}ceye/ticket/${pk}/instrumento/`, httpOptions)
  }
  
  traerUNticketinstrumento(pk:number): Observable<TicketInstrumento> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    return  this.http.get<TicketInstrumento>(`${environment.url}ceye/ticket/instrumento/${pk}`, httpOptions)
  }
  borrarticketinstrumento(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    return  this.http.delete<TicketInstrumento>(`${environment.url}ceye/ticket/instrumento/${pk}`, httpOptions)
  }
  editarticketinstrumento(editarTicketinstrumento: TicketInstrumento, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    //console.log(`${environment.url}ceye/ticket/instrumento/${pk}`);
    console.log('-----------------------------------------------')
    console.log(editarTicketinstrumento)
    return  this.http.put<TicketInstrumento>(`${environment.url}ceye/ticket/instrumento/${pk}`, editarTicketinstrumento, httpOptions)
  }
}
