import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { catchError, Observable } from 'rxjs';
import { Department } from '@shared/interfaces/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseService {
  private http = inject(HttpClient);

  getDepartment = (): Observable<Department> => {
    return this.http.get<Department>(`${this.apiURL}/?rota=listar-todos-departamento`).pipe(
            catchError(this.handleError)
          );
  };
}
