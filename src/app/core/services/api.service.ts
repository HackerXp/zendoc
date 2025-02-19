import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, combineLatest, first, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data, Documents } from '@shared/interfaces/document';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  private http = inject(HttpClient);
  private documentsSubject = new BehaviorSubject<Data[]>([]);
  documents$ = this.documentsSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();
  private documentByIdSubject = new BehaviorSubject<Data[]>([]);
  documentById$ = this.documentByIdSubject.asObservable();

  private totalDocumentsSubject = new BehaviorSubject<number>(0);
  totalDocuments$ = this.totalDocumentsSubject.asObservable();

  cardsPerPage = 10;
  constructor() {
    super();
    this.getDocuments();
  }

  getDocuments = () => {
    this.http
      .get<Documents>(`${this.apiURL}/?rota=listar-todos-documentos`)
      .subscribe((docs) => {
        this.documentsSubject.next(docs.data);
        this.currentPageSubject.next(1);
        this.totalDocumentsSubject.next(docs.data.length);
      });
  };

  getDocumentById = (id:number) => {
    return this.http.get<Documents>(`${this.apiURL}/?rota=listar-documentos-por-id&id=${id}`)
  };

  saveDocument(formData: FormData) {
    this.http
      .post<Documents>(`${this.apiURL}/?rota=salvar-documento`, formData)
      .subscribe((newDoc) => {
        if (newDoc.codigo === '200') {
          const currentDocs = this.documentsSubject.getValue();
          const updateDocs = [...currentDocs, ...newDoc.data];

          this.documentsSubject.next(updateDocs);
          this.totalDocumentsSubject.next(updateDocs.length);
        }
      });
  }

  deleteDocument(documentId: number) {
    this.http
      .delete<{ codigo: string }>(
        `${this.apiURL}/?rota=eliminar-documento&id=${documentId}`
      )
      .subscribe((response) => {
        if (response.codigo === '200') {
          const currentDocs = this.documentsSubject.getValue();
          const updatedDocs = currentDocs.filter(
            (doc) => doc.id !== documentId
          );

          this.documentsSubject.next(updatedDocs);
          this.totalDocumentsSubject.next(updatedDocs.length);
        }
      });
  }

  sortByName() {
    const sortedDocs = [...this.documentsSubject.getValue()].sort((a, b) =>
      a.titulo!.localeCompare(b.titulo!)
    );
    this.documentsSubject.next(sortedDocs);
  }

  paginatedDocuments$ = combineLatest([
    this.documents$,
    this.currentPage$,
  ]).pipe(
    map(([documents, currentPage]) => {
      const startIndex = (currentPage - 1) * this.cardsPerPage;
      const endIndex = startIndex + this.cardsPerPage;
      return documents.slice(startIndex, endIndex);
    })
  );

  setPage(page: number) {
    this.totalPages$.pipe(first()).subscribe((totalPages) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      this.currentPageSubject.pipe(first()).subscribe((currentPage) => {
        if (validPage !== currentPage) {
          this.currentPageSubject.next(validPage);
        }
      });
    });
  }

  nextPage() {
    this.currentPage$.pipe(first()).subscribe((page) => {
      this.setPage(page + 1);
    });
  }

  previousPage() {
    this.currentPage$.pipe(first()).subscribe((page) => {
      this.setPage(page - 1);
    });
  }

  resetPagination(totalDocs: number) {
    Math.max(1, Math.ceil(totalDocs / this.cardsPerPage));
    this.currentPageSubject.next(1);
  }

  totalPages$ = this.documents$.pipe(
    map((documents) =>
      Math.max(1, Math.ceil(documents.length / this.cardsPerPage))
    )
  );
}
