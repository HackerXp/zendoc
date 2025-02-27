import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Permission } from '@shared/interfaces/permission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService {
  private http = inject(HttpClient);

  getPermission = (): Observable<Permission> => {
    return this.http.get<Permission>(`${this.apiURL}/?rota=listar-permissao`);
  };

  savePermission = (formData: FormData): Observable<Permission> => {
    return this.http.post<Permission>(`${this.apiURL}/?rota=cadastrar-permissao`, formData)
  }

  editPermission = (formData: FormData): Observable<Permission> => {
    return this.http.put<Permission>(`${this.apiURL}/?rota=editar-permissao`, formData)
  }

}
