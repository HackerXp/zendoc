import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortcutService {
  private shortcutSubject = new Subject<void>();
  shortcut$ = this.shortcutSubject.asObservable();

  constructor() {
    this.listenToShortcuts();
  }

  private listenToShortcuts() {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        this.shortcutSubject.next();
      }
    });
  }
}
