import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Modal } from '@shared/interfaces/modal';

@Component({
  selector: 'app-modal',
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() modal: Modal = {};
  @Input() form!: FormGroup;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  confirm() {
    this.confirmAction.emit();
  }
}
