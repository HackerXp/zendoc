import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Documents } from '@shared/interfaces/document';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {
  private http = inject(HttpClient);
  constructor() {
    super();
  }


  getDocuments = (): Observable<Documents[]> => {
    return this.http.get<Documents[]>(`${this.apiURL}/?rota=listar-todos-documentos`).pipe(
      tap({
        next: response => {
        },
        error: err => {
        }
      }),
      catchError(this.handleError)  // Chama o método de tratamento de erro
    );
  }
}
