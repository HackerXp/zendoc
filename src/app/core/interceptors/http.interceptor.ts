import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Documents } from '@shared/interfaces/document';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

const ALLOWED_ENDPOINTS = [
  '/?rota=salvar-documento',
  '/?rota=eliminar-documento',
  '/?rota=autenticacao',
];
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

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
        toastr.error('Erro ao processar a requisição', 'Erro');
      },
    }),
    catchError((error: HttpErrorResponse) => {
      toastr.error('Erro inesperado, tente novamente mais tarde.', 'Erro');
      return throwError(() => error);
    })
  );
};
