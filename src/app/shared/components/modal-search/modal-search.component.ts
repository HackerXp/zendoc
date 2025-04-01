import { Component, EventEmitter, HostListener, inject, OnDestroy, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Data } from '@shared/interfaces/document';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'modal-search',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './modal-search.component.html',
  styleUrl: './modal-search.component.scss',
})
export class ModalSearchComponent implements OnDestroy {
  @Output() close = new EventEmitter<void>();
  unsubscribeSubject = new Subject();
  private apiService = inject(ApiService);

  faSearch = faSearch;
  ctrl: boolean = false;
  loading: boolean = false;
  resFilter: Data[] = [];
  termo: string = '';
  constructor() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const input = target.value.trim();
    this.loading = true;
    if (input.length <= 3) {
      this.resFilter = [];
      this.ctrl = false;
      this.loading = false;
      return
    } else {
      const query = input.toLowerCase();
      this.termo = query;
      this.apiService.search(query).pipe(takeUntil(this.unsubscribeSubject))
        .subscribe({
          next: (res) => {
            this.loading = false;
            if (res.codigo == '200') {
              this.ctrl = false;
              this.resFilter = res.data;
            }
            else {
              this.resFilter = [];
              this.ctrl = true;
            }
          },
        });
    }
  }

  onBackdropClick() {
    this.close.emit(); // Emite o evento para fechar a modal
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close.emit(); // Fecha a modal quando ESC é pressionado
    }
  }

  ngOnDestroy() {
    // Remove o listener ao destruir o componente
    document.removeEventListener('keydown', this.handleKeydown);
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
