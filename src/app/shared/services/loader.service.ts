import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  static loadingSubject = new Subject<boolean>();

  static get loadingObservable(): Observable<boolean> {
    return LoaderService.loadingSubject.asObservable();
  }

  static startLoading() {
    LoaderService.loadingSubject.next(true);
  }

  static stopLoading() {
    LoaderService.loadingSubject.next(false);
  }
  constructor() { }
}
