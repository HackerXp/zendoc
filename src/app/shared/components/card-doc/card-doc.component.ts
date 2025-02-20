import {
  Component,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
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

@Component({
  selector: 'app-card-doc',
  imports: [
    FontAwesomeModule,
    ModalInfoComponent,
    DatePipe,
  ],
  templateUrl: './card-doc.component.html',
  styleUrl: './card-doc.component.scss',
})
export class CardDocComponent implements OnChanges {
  @Input() document!: Data;
  openCardId: number | null = 0;
  show: ShowHide = {};
  showInfo: ShowHide = {};
  showDetail = false;
  faEye = faEye;
  selectedDocumentId: number | null = null;
  existFiles = false;
  private apiService = inject(ApiService);
  private readonly router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['document'] && changes['document'].currentValue) {
      this.existFiles = this.document
        ? Array.isArray(this.document.files)
        : false;
    }
  }

  showOptions(where: string, data: string) {
    this.router.navigate([`/${where}/${data}`]);
  }

  showHide = (
    param: 'dialog' | 'options' | 'details' | 'files',
    id?: number
  ) => {
    this.openCardId = this.openCardId == id! ? null : id!;
    switch (param) {
      case 'details':
        this.show = { details: true };
        break;
      case 'files':
        this.show = { files: true };
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
