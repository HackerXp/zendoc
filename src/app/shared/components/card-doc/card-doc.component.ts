import {
  Component,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Data, File } from '@shared/interfaces/document';
import { ShowHide } from '@shared/interfaces/show-hide';
import prettyBytes from 'pretty-bytes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ModalInfoComponent } from "../modal-info/modal-info.component";
import { DatePipe } from '@angular/common';
import { ApiService } from '@core/services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PreviewDocComponent } from "../preview-doc/preview-doc.component";
import { Modal } from '@shared/interfaces/modal';
import { getFileIcon } from '@core/helper/utils';


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
    PreviewDocComponent
  ],
  templateUrl: './card-doc.component.html',
  styleUrl: './card-doc.component.scss',
})
export class CardDocComponent implements OnChanges {
  @Input() document!: Data;
  openCardId: number | null = 0;
  private http = inject(HttpClient);
  show: ShowHide = {};
  modal: Modal = {};
  showInfo: ShowHide = {};
  showDetail: boolean = false;
  faEye = faEye;
  selectedDocumentId: number | null = null;
  existFiles: boolean = false;
  extFile!: string;
  isDelete: Delete = { check: false, id: 0 };

  idFiles: any[] = [];
  documento: Data[] = [];
  private apiService = inject(ApiService);
  private readonly router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['document'] && changes['document'].currentValue) {
      this.existFiles = this.document
        ? Array.isArray(this.document.files)
        : false;
    }
  }

  showOptions(item: File, data: string) {
    let pdf = `http://localhost/api-zendoc/app/files/${data}`;

    console.log(data);
    this.http.get(data, { responseType: 'blob' }).subscribe(
      (blob) => {
        pdf = URL.createObjectURL(blob);
        console.log(pdf, 'pdf blob');

      },
      (error) => console.error('Erro ao carregar PDF:', error)
    );

    this.modal = {
      isOpen: true,
      icon: getFileIcon(item.extension),
      title: this.document.titulo,
      description: item.nome,
    };


    //this.router.navigate([`/${where}/${data}`]);
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
    this.isDelete = {};
    this.modal = {};
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

}
