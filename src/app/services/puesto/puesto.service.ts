import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Puesto } from '@app/models/backend/puesto';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  constructor(private http: HttpClient) { }
  listaPuestos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(`${environment.url}cuenta/puesto/`)
  }
}
