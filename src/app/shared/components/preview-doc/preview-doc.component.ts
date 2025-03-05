import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from '@shared/interfaces/modal';

@Component({
  selector: 'preview-doc',
  imports: [NgIf],
  templateUrl: './preview-doc.component.html',
  styleUrl: './preview-doc.component.scss'
})
export class PreviewDocComponent {
  @Input() modal: Modal = {};
  @Output() closeModal = new EventEmitter<void>();
  @Output() printAction = new EventEmitter<void>();
  @Output() downloadAction = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  print() {
    this.printAction.emit();
  }

  download() {
    this.downloadAction.emit();
  }

}
