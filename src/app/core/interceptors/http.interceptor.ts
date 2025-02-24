import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Documents } from '@shared/interfaces/document';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

const ALLOWED_ENDPOINTS = [
  '/?rota=salvar-documento',
  '/?rota=eliminar-documento',
  '/?rota=autenticacao',
  '/?rota=listar-todos-documentos',
  '/?rota=listar-todas-categoria',
  '/?rota=criar-categoria',
  '/?rota=editar-categoria',
  '/?rota=eliminar-categoria',
  '/?rota=cadastrar-departamento',
  '/?rota=editar-departamento',
  '/?rota=eliminar-departamento',
];
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const shouldIntercept = ALLOWED_ENDPOINTS.some((endpoint) => req.url.includes(endpoint));

  if (!shouldIntercept) {
    return next(req);
  }

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const body: Documents = event.body as Documents;

          if (body?.codigo === '200') {
            toastr.success('Operação realizada com sucesso!', 'Sucesso');
          } else if (body?.codigo === '400') {
            toastr.warning('Requisição inválida.', 'Aviso');
          } else if (body?.codigo === '500') {
            toastr.error('Erro interno do servidor.', 'Erro');
          }
        }
      },
      error: () => {
        LoaderService.stopLoading();
        toastr.error('Erro ao processar a requisição', 'Erro');
      },
    }),
    catchError((error: HttpErrorResponse) => {

      LoaderService.stopLoading();
      if (error.status === 401 && error?.error?.mensagem?.includes('Expired token')) {
        toastr.error('Redirecionando para o login...', 'Sessão Expirada');
        setTimeout(() => {
          sessionStorage.removeItem('token');
          router.navigate(['/']);
        }, 3000);
      } else if (error.status === 401) {
        toastr.error('Token inválido. Faça login novamente.', 'Acesso Negado');
        setTimeout(() => {
          sessionStorage.clear();
          router.navigate(['/']);
        }, 3000);
      } else {
        toastr.error('Erro inesperado, tente novamente mais tarde.', 'Erro');
      }

      return throwError(() => error);
    })
  );
};
