import { NgIf } from '@angular/common';
import { Component, computed, EventEmitter, HostListener, inject, OnDestroy, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { DummyService } from '@core/services/dummy.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Document } from '@shared/interfaces/document';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'modal-search',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, FormsModule],
  templateUrl: './modal-search.component.html',
  styleUrl: './modal-search.component.scss',
})
export class ModalSearchComponent implements OnDestroy {
  @Output() close = new EventEmitter<void>();
  private apiService = inject(ApiService);
  faSearch = faSearch;

  mockData: Document[] = [];

  constructor(private dummy: DummyService) {
    document.addEventListener('keydown', this.handleKeydown);
  }

  documents = toSignal(this.apiService.documents$, { initialValue: [] });
  searchInput = signal('');

  searchResults = computed(() => {
    const input = this.searchInput().trim();

    if (input.length <= 3) return [];

    const query = input.toLowerCase();

    return this.documents()
      .filter(
        (item) =>
          item.titulo?.toLowerCase().includes(query) ||
          // item.idusuario?.toLowerCase().includes(query) ||
          item.categoria?.toLowerCase().includes(query) ||
          item.tipo?.toLowerCase().includes(query) ||
          item.descricao?.toLowerCase().includes(query)
      );
  });

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchInput.set(target.value);
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
  }
}
