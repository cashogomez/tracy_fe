import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaTrabajo } from '@app/models/backend/area';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreatrabajoService {

  constructor(private http: HttpClient) { }
  listaAreasTrabajo(): Observable<AreaTrabajo[]> {
    return this.http.get<AreaTrabajo[]>(`${environment.url}cuenta/areatrabajo/`)
  }
}
