import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { Data } from '@shared/interfaces/document';

@Component({
  selector: 'modal-info',
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss',
})
export class ModalInfoComponent implements OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Input() file!: Data;
  @Input() isOpen = false;
  @Output() selectDocument = new EventEmitter<number>();

  onBackdropClick(event: MouseEvent) {
    this.close.emit(); // Emite o evento para fechar a modal
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close.emit(); // Fecha a modal quando ESC é pressionado
    }
  }

  closeModal = () => {
    this.close.emit();
  };

  confirmAction = () => {
    if (this.file && this.file.id) {
      this.selectDocument.emit(this.file.id);
    }

    this.confirm.emit();
  };

  ngOnDestroy() {
    // Remove o listener ao destruir o componente
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
