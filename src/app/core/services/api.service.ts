import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, combineLatest, first, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data, Documents } from '@shared/interfaces/document';
import { LoaderService } from '@shared/services/loader.service';
import { ItemList } from '@shared/interfaces/item-list';
import { UserToken } from '@core/interfaces/user-token';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private documentsSubject = new BehaviorSubject<Data[]>([]);
  documents$ = this.documentsSubject.asObservable();

  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();

  private documentByIdSubject = new BehaviorSubject<Data[]>([]);
  documentById$ = this.documentByIdSubject.asObservable();

  private totalDocumentsSubject = new BehaviorSubject<number>(0);
  totalDocuments$ = this.totalDocumentsSubject.asObservable();

  private totalPagesSubject = new BehaviorSubject<number>(0);
  totalPages$ = this.totalPagesSubject.asObservable();

  cardsPerPage = 12;
  userToken!: UserToken;

  constructor() {
    super();
    this.userToken = this.authService.decodeToken();
    this.getDocuments(1);
  }

  getDocuments = (page: number) => {
    LoaderService.startLoading();
    page == undefined ? 1 : page;
    this.http
      .get<Documents>(`${this.apiURL}/?rota=listar-todos-documentos&pagina=${page}&limite=${this.cardsPerPage}&usuario_id=${this.userToken.idusuario}&departamento_id=${this.userToken.iddepartamento}`)
      .subscribe((docs) => {
        this.documentsSubject.next(docs.data);
        this.currentPageSubject.next(docs.pagina_atual);
        this.totalDocumentsSubject.next(docs.total_registros);
        this.totalPagesSubject.next(docs.total_paginas);
        LoaderService.stopLoading();
      });
  };

  search = (filtro: string) => {
    return this.http.get<Documents>(`${this.apiURL}/?rota=filtro-avancado&busca=${filtro}&usuario_id=${this.userToken.idusuario}&departamento_id=${this.userToken.iddepartamento}`);
  };

  shareWith = (formData: FormData): Observable<any> => {
    return this.http.put<any>(`${this.apiURL}/?rota=shareWith`, formData)
  }

  getDocumentById = (id: number) => {
    this.http.get<Documents>(`${this.apiURL}/?rota=listar-documentos-por-id&id=${id}`).subscribe((docs) => {
      this.documentsSubject.next(docs.data); // Atualiza os documentos observáveis
      this.currentPageSubject.next(1); // Reset para a primeira página
      this.totalDocumentsSubject.next(1);
      this.totalPagesSubject.next(1);
      LoaderService.stopLoading();
    });
  };

  getDocumentByIdCategory = (id: string, page?: number) => {
    LoaderService.startLoading();
    page == undefined ? 1 : page;
    this.http.get<Documents>(`${this.apiURL}/?rota=listar-documentos-id-categoria&pagina=${page}&limite=${this.cardsPerPage}&id=${id}&usuario_id=${this.userToken.idusuario}&departamento_id=${this.userToken.iddepartamento}`)
      .subscribe((docs) => {
        this.documentsSubject.next(docs.data); // Atualiza os documentos observáveis
        this.currentPageSubject.next(docs.pagina_atual); // Reset para a primeira página
        this.totalDocumentsSubject.next(docs.total_registros);
        this.totalPagesSubject.next(docs.total_paginas);
        LoaderService.stopLoading();
      });
  };


  getDocumentByCategory = () => {
    return this.http.get<ItemList[]>(`${this.apiURL}/?rota=listar-todos-documentos-por-categoria`)
  };

  saveDocument(formData: FormData) {
    LoaderService.startLoading();
    this.http
      .post<Documents>(`${this.apiURL}/?rota=salvar-documento`, formData)
      .subscribe((newDoc) => {
        if (newDoc.codigo === '200') {
          const currentDocs = this.documentsSubject.getValue();
          const updateDocs = [...currentDocs, ...newDoc.data];

          this.documentsSubject.next(updateDocs);
          this.totalDocumentsSubject.next(updateDocs.length);
          LoaderService.stopLoading();
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
      //console.log(currentPage, 'currentPage');

      const startIndex = (currentPage - 1) * this.cardsPerPage;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const endIndex = startIndex + this.cardsPerPage;
      //console.table(documents.slice(startIndex, endIndex))
      return documents
    })
  );

  setPage(page: number, id?: any) {
    this.totalPages$.pipe(first()).subscribe((totalPages) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      this.currentPageSubject.pipe(first()).subscribe((currentPage) => {
        if (validPage !== currentPage) {
          this.getDocuments(validPage);
          this.getDocumentByIdCategory(id, validPage);
          this.currentPageSubject.next(validPage);
        }
      });
    });
  }

  nextPage(id?: any) {
    this.currentPage$.pipe(first()).subscribe((page) => {
      this.setPage(isNaN(page) ? 1 : page + 1, id);
    });
  }

  previousPage(id?: any) {
    this.currentPage$.pipe(first()).subscribe((page) => {
      this.setPage(isNaN(page) ? 1 : page - 1, id);
    });
  }

  resetPagination(totalDocs: number) {
    Math.max(1, Math.ceil(totalDocs / this.cardsPerPage));
    this.currentPageSubject.next(1);
  }

}
