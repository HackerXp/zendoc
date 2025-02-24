import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { Department } from '@shared/interfaces/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseService {
  private http = inject(HttpClient);

  getDepartment = (): Observable<Department> => {
    return this.http.get<Department>(`${this.apiURL}/?rota=listar-todos-departamento`);
  };

  saveDepartment = (formData: FormData): Observable<Department> => {
    return this.http.post<Department>(`${this.apiURL}/?rota=cadastrar-departamento`, formData)
  }

  editDepartment = (formData: FormData): Observable<Department> => {
    return this.http.put<Department>(`${this.apiURL}/?rota=editar-departamento`, formData)
  }

  delete = (id: number) => {
    return this.http.delete<{ codigo: string }>(`${this.apiURL}/?rota=eliminar-departamento&id=${id}`);
  }
}
