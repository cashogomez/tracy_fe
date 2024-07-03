import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReporteIncidencia, ReporteIncidenciaRequest } from '@app/models/backend/resporteincidencia';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteincidenciaService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaReporteIncidencia(ReporteIncidencia: ReporteIncidenciaRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/reporteincidencia/`);
    return this.http.post<ReporteIncidencia>(`${environment.url}ceye/reporteincidencia/`, ReporteIncidencia, httpOptions)
  }
  traerReporte(): Observable<ReporteIncidencia[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/reporteincidencia/`);
    return  this.http.get<ReporteIncidencia[]>(`${environment.url}ceye/reporteincidencia/`, httpOptions)
  }
  traerUNReporte(pk:number): Observable<ReporteIncidencia> {
    var token = this.getToken();
    console.log(pk)
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/reporteincidencia/${pk}`);
    return  this.http.get<ReporteIncidencia>(`${environment.url}ceye/reporteincidencia/${pk}`, httpOptions)
  }
  borrarReporte(pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/reporteincidencia/${pk}`);
    return  this.http.delete<ReporteIncidencia>(`${environment.url}ceye/reporteincidencia/${pk}`, httpOptions)
  }
  editarReporte(ReporteIncidencia: ReporteIncidencia, pk:number): Observable<any> {
    var token = this.getToken();
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/reporteincidencia/${pk}`);
    return  this.http.put<ReporteIncidencia>(`${environment.url}ceye/reporteincidencia/${pk}`, ReporteIncidencia, httpOptions)
  }
}
