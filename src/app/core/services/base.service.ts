import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected apiURL: string = environment.apiURL;
  protected authURL: string = environment.authURL;

  constructor() { }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) errorMessage = error.error.message;
    errorMessage = `Código do erro: ${error.status}\nMessagem: ${error.message}`;
    return throwError(() => errorMessage);
  }


  getUrlAuth(): string {
    return this.authURL;
  }
}
