import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { UserResponse } from '@app/store/user';
import * as fromUser from '@app/store/user';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  logIn(userData: fromUser.EmailPasswordCredentials): Observable<any> {
    return this.http.post<UserResponse>(`${environment.url}cuenta/login-app/`, userData)
  }

  signUp(userData: fromUser.UserCreateRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.url}cuenta/registrar/`, userData);
  }
  logout(token: string): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    };
    return this.http.post<any>(`${environment.url}cuenta/logout/`, JSON.stringify({}), httpOptions);
  }
  refreshToken(token: string) {
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+token})
    };
    return this.http.post(`${environment.url}` + 'api/token/refresh/', {
      refreshToken: token
    }, httpOptions);
  }
}