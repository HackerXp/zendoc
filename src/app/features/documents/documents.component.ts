import { Component, HostListener, inject } from '@angular/core';
import { CardDocComponent } from "../../shared/components/card-doc/card-doc.component";
import { NgIf } from '@angular/common';
import { Document } from '@shared/interfaces/document';
import prettyBytes from 'pretty-bytes';
import { DummyService } from '@core/services/dummy.service';
import { ApiService } from '@core/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documents',
  imports: [CardDocComponent, NgIf],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  private apiService = inject(ApiService);
  private toastr = inject(ToastrService);
  unsubscribeSubject = new Subject();

  cards: Document[] = [];
  total: number = 0;
  currentPage: number = 1;
  cardsPerPage: number = 1;
  constructor(private dummy: DummyService) { }

  ngOnInit(): void {
    this.updateCardsPerPage();
    this.getDocuments();
    this.cards = this.dummy.documents;
    this.total = this.cards.reduce((acc, item) => acc + item.size!, 0);
  }

  // Atualiza os cards por página com base no tamanho da tela
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCardsPerPage();
  }

  updateCardsPerPage(): void {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.cardsPerPage = 12; // Large
    } else if (width >= 768) {
      this.cardsPerPage = 4; // Medium
    } else {
      this.cardsPerPage = 2; // Small
    }
    this.currentPage = 1; // Reset para a primeira página ao redimensionar
  }

  // Obtém os cards da página atual
  get paginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    return this.cards.slice(startIndex, endIndex);
  }

  // Total de páginas
  get totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }

  // Altera a página
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  fileSize = (size: number) => {
    return prettyBytes(size);
  }


  getDocuments = () => {
    this.apiService.getDocuments()
      .pipe(takeUntil(this.unsubscribeSubject)).subscribe({
        next: (cb) => {
          console.log(cb);

        },
        error: (error) => {
          this.toastr.error('Erro ao carregar documentos', 'Erro');
        }
      });
  }
  sortByName(array: Document[]) {
    this.cards = array.sort((a, b) => a.name!.localeCompare(b.name!));
  }


  ngOnDestroy() {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
