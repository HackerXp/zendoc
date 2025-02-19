import {
  Component,
  HostListener,
  inject,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { Data } from '@shared/interfaces/document';
import { ShowHide } from '@shared/interfaces/show-hide';
import prettyBytes from 'pretty-bytes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ModalInfoComponent } from "../modal-info/modal-info.component";
import { DatePipe } from '@angular/common';
import { ApiService } from '@core/services/api.service';
import { Router } from '@angular/router';
import { ModalInfoDetailComponent } from '../modal-info-detail/modal-info-detail.component';

@Component({
  selector: 'app-card-doc',
  imports: [
    FontAwesomeModule,
    ModalInfoComponent,
    DatePipe,
    ModalInfoDetailComponent,
  ],
  templateUrl: './card-doc.component.html',
  styleUrl: './card-doc.component.scss',
})
export class CardDocComponent {
  @Input() document!: Data;
  openCardId: number | null = 0;
  show: ShowHide = {};
  showInfo: ShowHide = {};
  showDetail = false;
  faEye = faEye;
  selectedDocumentId: number | null = null;
  private apiService = inject(ApiService);
  private readonly router = inject(Router);
  documentData: WritableSignal<Data> = signal<Data>(this.document);

  isModalOpen: WritableSignal<boolean> = signal(false);

  openModal(): void {
    this.documentData.set(this.document);
    this.isModalOpen.set(true);
  }

  showHide = (
    param: 'dialog' | 'options' | 'details' | 'details-info',
    id?: number
  ) => {
    this.openCardId = this.openCardId == id! ? null : id!;
    switch (param) {
      case 'details':
        this.show = { details: true };
        break;
      case 'details-info':
        this.showInfo = { dialog: true };
        break;
      case 'dialog':
        this.show = { dialog: true };
        break;
      case 'options':
        this.show.options = !this.show.options;
        break;
    }
  };

  goTo(where: string, data: Data) {
    // Criptografar (ofuscar)
    const encodedId = btoa(`${data.id}`);

    this.router.navigate([`/${where}/${encodedId}`]);
  }

  @HostListener('document:click', ['$event'])
  closeOptions(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.card')) {
      this.openCardId = null;
    }
  }

  close = () => {
    this.show = {};
  };

  removeDoc = (id: number) => {
    this.show = {};
    console.log(id);
  };

  onDocumentSelectedId(documentId: number) {
    this.selectedDocumentId = documentId;
    this.apiService.deleteDocument(this.selectedDocumentId);
    this.close();
  }

  fileSize = (size: number) => {
    return prettyBytes(size);
  };
}
