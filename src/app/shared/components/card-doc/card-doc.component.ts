import { Component, HostListener, Input } from '@angular/core';
import { Data } from '@shared/interfaces/document';
import { ShowHide } from '@shared/interfaces/show-hide';
import prettyBytes from 'pretty-bytes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ModalInfoComponent } from "../modal-info/modal-info.component";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-card-doc',
  imports: [FontAwesomeModule, ModalInfoComponent, DatePipe],
  templateUrl: './card-doc.component.html',
  styleUrl: './card-doc.component.scss',
})
export class CardDocComponent {
  // @Input() document!: Document;
  @Input() document!: Data;
  openCardId: number | null = 0;
  show: ShowHide = {};
  showDetail = false;
  faEye = faEye;

  showHide = (param: 'dialog' | 'options' | 'details', id?: number) => {
    this.openCardId = this.openCardId == id! ? null : id!;
    switch (param) {
      case 'details':
        this.show = { details: true };
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
  };

  removeDoc = (id: number) => {
    this.show = {};
    console.log(id);
  };

  fileSize = (size: number) => {
    return prettyBytes(size);
  };
}
