// auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';  // Caminho correto para o seu AuthService
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);
  const token = authService.getToken();
  // Verificar se a URL é diferente de um endpoint de autenticação (ex: login)
  if (req.url.includes('autenticacao') || req.url.includes('/auth')) {
    return next(req);  // Se for para login ou autenticação, não adiciona o token
  }

  // Se houver um token, adiciona o token na requisição
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(req);  // Continuar com a requisição
}
