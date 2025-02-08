import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DummyService } from '@core/services/dummy.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Document } from '@shared/interfaces/document';

@Component({
  selector: 'modal-search',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, NgFor, FormsModule],
  templateUrl: './modal-search.component.html',
  styleUrl: './modal-search.component.scss'
})
export class ModalSearchComponent {
  @Output() close = new EventEmitter<void>();
  faSearch = faSearch;
  searchInput: string = ''; // Texto do input
  searchResults: Document[] = []; // Resultados da busca

  mockData: Document[] = []; // Mock de dados


  constructor(private dummy: DummyService) {
    this.mockData = this.dummy.documents;
    document.addEventListener('keydown', this.handleKeydown);
  }


  onSearch(event: Event) {
    const input = this.searchInput.trim();

    if (input.length > 3) {
      // Filtra os resultados com base no valor do input
      this.searchResults = this.mockData.filter((item) => {
        const query = input.toLowerCase();

        // Verifica se qualquer campo contém o termo de pesquisa
        return (
          item.name!.toLowerCase().includes(query) ||
          item.user!.toLowerCase().includes(query) ||
          item.area!.toLowerCase().includes(query) ||
          item.type!.toLowerCase().includes(query) ||
          item.subject!.toLowerCase().includes(query)
        );
      });
    } else {
      this.searchResults = []; // Limpa os resultados se o input tiver menos de 3 caracteres
    }
  }


  onBackdropClick(event: MouseEvent) {
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
