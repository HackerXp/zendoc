import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseService } from './base.service';
import { Auth } from '@core/interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '@core/interfaces/AuthResponse ';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from '@core/interfaces/user-token';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private http = inject(HttpClient);
  private router = inject(Router);
  helper = new JwtHelperService();

  constructor() {
    super();
  }

  authenticate(credentials: Auth): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('usuario', credentials.usuario!);
    formData.append('senha', credentials.senha!);
    return this.http.post<AuthResponse>(`${this.apiURL}/?rota=autenticacao`, formData).pipe(
      tap(response => response != null || undefined || '' ? sessionStorage.setItem('token', response.data) : false), // Armazena o token
      // catchError(this.handleError) // Trata erros
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/'])
  }



  decodeToken() {
    const token = this.getToken();
    const decodedToken = this.helper.decodeToken(token!);
    return decodedToken as UserToken;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }


  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token'); // Verifica se há token salvo
  }

}
