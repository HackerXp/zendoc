import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Category } from '@shared/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  private http = inject(HttpClient);

  getCategory = (): Observable<Category> => {
    return this.http.get<Category>(`${this.apiURL}/?rota=listar-todas-categoria`).pipe(
            catchError(this.handleError)
          );
  };
}
