import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private http = inject(HttpClient);

  getUsers = (): Observable<User> => {
    return this.http.get<User>(`${this.apiURL}/?rota=listar-todos-usuario`);
  };


  getUserById = (): Observable<User> => {
    return this.http.get<User>(`${this.apiURL}/?rota=listar-usuario-por-id`);
  };

  saveUser = (formData: FormData): Observable<User> => {
    return this.http.post<User>(`${this.apiURL}/?rota=cadastrar-usuario`, formData)
  }

  editUser = (formData: FormData): Observable<User> => {
    return this.http.put<User>(`${this.apiURL}/?rota=editar-usuario`, formData)
  }

  editSenha = (formData: FormData): Observable<User> => {
    return this.http.put<User>(`${this.apiURL}/?rota=editar-senha`, formData)
  }
}
