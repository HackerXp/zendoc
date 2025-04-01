import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Data, File } from '@shared/interfaces/document';
import { ShowHide } from '@shared/interfaces/show-hide';
import prettyBytes from 'pretty-bytes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ModalInfoComponent } from "../modal-info/modal-info.component";
import { DatePipe, NgIf } from '@angular/common';
import { ApiService } from '@core/services/api.service';
import { Router } from '@angular/router';
import { PreviewDocComponent } from "../preview-doc/preview-doc.component";
import { Modal } from '@shared/interfaces/modal';
import { getFileIcon } from '@core/helper/utils';

import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxPermissionsModule } from 'ngx-permissions';

import {
  PdfViewerModule,
  PdfViewerComponent as Ng2PdfViewerComponent,
} from 'ng2-pdf-viewer';


interface Delete {
  check?: boolean;
  id?: number;
}


@Component({
  selector: 'app-card-doc',
  imports: [
    FontAwesomeModule,
    ModalInfoComponent,
    DatePipe,
    PreviewDocComponent,
    PdfViewerModule,
    NgIf,
    NgxDocViewerModule,
    NgxPermissionsModule
  ],
  templateUrl: './card-doc.component.html',
  styleUrl: './card-doc.component.scss',
})
export class CardDocComponent implements OnChanges {
  @ViewChild('pdfViewer') pdfViewer!: Ng2PdfViewerComponent;
  @ViewChild('docContainer', { static: true }) docContainer!: ElementRef;

  @Input() document!: Data;
  openCardId: number | null = 0;
  private _cdr = inject(ChangeDetectorRef);
  show: ShowHide = {};
  modal: Modal = {};
  showInfo: ShowHide = {};
  showDetail: boolean = false;
  faEye = faEye;
  existFiles: boolean = false;
  extFile!: string;
  isDelete: Delete = { check: false, id: 0 };

  idFiles: any[] = [];
  tags: any[] = [];
  documento: Data[] = [];
  pdf: string | undefined;
  imageSrc: string | undefined;
  fileDocUrl: string | undefined;

  zoom = 1.0;
  private apiService = inject(ApiService);
  private readonly router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['document'] && changes['document'].currentValue) {
      this.existFiles = this.document
        ? Array.isArray(this.document.files)
        : false;
    }
  }

  showOptions(item: File, url: string) {
    this.pdf = '';
    this.imageSrc = '';
    this.fileDocUrl = '';
    if (item.extension.includes('pdf')) {
      this.pdf = url;
    } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(item.extension)) {
      this.imageSrc = url;
    } else if (['.docx', '.doc'].includes(item.extension)) {
      this.fileDocUrl = url;
    }

    setTimeout(() => this._cdr.detectChanges(), 100);

    this.modal = {
      isOpen: true,
      icon: getFileIcon(item.extension),
      title: this.document.titulo,
      description: item.nome,
      extension: item.extension,
    };
  }

  showHide = (
    param: 'dialog' | 'options' | 'details' | 'files',
    id?: number
  ) => {
    this.openCardId = this.openCardId == id! ? null : id!;
    switch (param) {
      case 'details':
        this.show = { details: true };
        this.tags = this.document.tags.split(',').map((item) => `#${item}`);
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

  @HostListener('document:click', ['$event'])
  closeOptions(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.card')) {
      this.openCardId = null;
    }
  }

  close = () => {
    this.show = {};
    this.isDelete = {};
    this.modal = {};
  };

  removeDoc(id: number) {
    this.apiService.deleteDocument(id);
    this.close();
  }

  fileSize = (size: number) => {
    return prettyBytes(size);
  };

  activeDelete = (id: number, check: boolean) => {
    check = check == false ? true : false;
    this.isDelete = { check, id }
    if (!check && this.idFiles.length > 0)
      this.idFiles = [];
  }

  addFilesToRemove = (id: number) => {
    const index = this.idFiles.indexOf(id);
    if (index !== -1)
      this.idFiles.splice(index, 1);
    else
      this.idFiles.push(id);
  }

  confirmDelete = () => {
    this.document.files = this.document.files.filter(obj => !this.idFiles.includes(obj.idfiles));
    this.idFiles = [];
    this.close();
  }

  print = (url: string): void => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);

      if (isImage) {
        printWindow.document.write(`<img src="${url}" onload="window.print(); window.close();" style="max-width:100%;"/>`);
      } else {
        printWindow.location.href = url;
        printWindow.onload = () => {
          printWindow.print();
          printWindow.onafterprint = () => printWindow.close();
        };
      }
    } else {
      console.error('Falha ao abrir a janela de impressão.');
    }
  };


  download = (url: string, filename: string = 'arquivo'): void => {
    fetch(url, { mode: 'cors' }) // Garante que a requisição respeite CORS
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar arquivo: ${response.statusText}`);
        }
        return response.blob();
      })
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectURL;

        // Detecta automaticamente o tipo de arquivo e adiciona a extensão correta
        const contentType = blob.type;
        const extension = contentType.split('/')[1] || 'png'; // Define PNG como padrão caso falhe
        const isImage = contentType.startsWith('image/');

        link.download = isImage ? `${filename}.${extension}` : filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectURL); // Libera memória
      })
      .catch(error => console.error('Erro ao baixar arquivo:', error));
  };


}
