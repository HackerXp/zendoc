import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { CardDocComponent } from "../../shared/components/card-doc/card-doc.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Data } from '@shared/interfaces/document';
import prettyBytes from 'pretty-bytes';
import { ApiService } from '@core/services/api.service';
import { map, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Empty } from '@shared/interfaces/empty';
import { EmptyComponent } from '@shared/components/empty/empty.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documents',
  imports: [CardDocComponent, AsyncPipe, EmptyComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  documents$ = this.apiService.documents$;
  unsubscribeSubject = new Subject();
  paginatedDocuments$ = this.apiService.paginatedDocuments$; // ✅ Observa os documentos paginados
  currentPage$ = this.apiService.currentPage$;
  cardsPerPage = this.apiService.cardsPerPage;
  totalPages$ = this.apiService.totalPages$;
  empty: Empty = { icon: 'icon-no-document', title: 'Sem documentos para apresentar', description: 'Não existe nenhum documento cadastrado   , adicione um arquivo .' };

  cards: Data[] = [];
  total: number = 0;
  currentPage = 1;
  id: string | null = null;
  category: string | null = null;

  ngOnInit(): void {
    this.updateCardsPerPage();
    this.getDocuments();
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      this.category = params.get('category');
    });
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
  get paginatedCards() {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    return this.cards.slice(startIndex, endIndex);
  }

  // Total de páginas
  get totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }

  nextPage() {
    this.apiService.nextPage();
  }

  previousPage() {
    this.apiService.previousPage();
  }

  // Altera a página
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  fileSize = (size: number) => {
    const sizeInBytes = size * 1048576;
    return prettyBytes(sizeInBytes);
  };

  getDocuments = () => {
    this.apiService.getDocuments();
    // .pipe(takeUntil(this.unsubscribeSubject)).subscribe({
    //   next: (cb) => {
    //     this.cards = cb.data;
    //     this.total = this.calculateTotal();
    //   },
    //   error: () => {
    //     this.toastr.error('Erro ao carregar documentos', 'Erro');
    //   }
    // });
  };

  calculateTotal$ = this.documents$.pipe(
    map((documents) => {
      const totalSize = documents.reduce((acc, item) => {
        if (Array.isArray(item.files)) {
          const sizeSum = item.files.reduce((fileAcc, file) => {
            const sizeInMb = parseFloat(file.size.replace('Mb', ''));
            return fileAcc + sizeInMb;
          }, 0);
          return acc + sizeSum;
        }
        return acc;
      }, 0);

      return this.fileSize(totalSize);
    })
  );

  sortDocuments() {
    this.apiService.sortByName();
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
