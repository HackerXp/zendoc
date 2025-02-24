import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, take } from 'rxjs';
import { Category } from '@shared/interfaces/category';
import { LoaderService } from '@shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  private http = inject(HttpClient);

  getCategory = (): Observable<Category> => {
    return this.http.get<Category>(`${this.apiURL}/?rota=listar-todas-categoria`)
  };

  saveCategory = (formData: FormData): Observable<Category> => {
    return this.http.post<Category>(`${this.apiURL}/?rota=criar-categoria`, formData)
  }

  editCategory = (formData: FormData): Observable<Category> => {
    return this.http.put<Category>(`${this.apiURL}/?rota=editar-categoria`, formData)
  }

  delete = (id: number) => {
    return this.http.delete<{ codigo: string }>(`${this.apiURL}/?rota=eliminar-categoria&id=${id}`);
  }
}
