import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialEmpaque, MaterialEmpaqueRequest } from '@app/models/backend/admonempaques';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmonempaquesService {
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  altaadmonempaques(registrarAdmonempaques: MaterialEmpaqueRequest): Observable<any> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/materialempaque/`);
    return this.http.post<MaterialEmpaqueRequest>(`${environment.url}ceye/materialempaque/`, registrarAdmonempaques, httpOptions)
  }
  traeradmonempaques(): Observable<MaterialEmpaque[]> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/materialempaque/`);
    return  this.http.get<MaterialEmpaque[]>(`${environment.url}ceye/materialempaque/`, httpOptions)
  }
  traerUNempaque(pk:number): Observable<MaterialEmpaque> {
    var token = this.getToken();
    
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    console.log(`${environment.url}ceye/materialempaque/${pk}`);
    return  this.http.get<MaterialEmpaque>(`${environment.url}ceye/materialempaque/${pk}`, httpOptions)
  }
}
