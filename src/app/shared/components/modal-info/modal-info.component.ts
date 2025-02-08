import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'modal-info',
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})
export class ModalInfoComponent {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Input() file!: string;
  @Input() isOpen: boolean = false;

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
  }

  confirmAction = () => {
    this.confirm.emit();
  }

  ngOnDestroy() {
    // Remove o listener ao destruir o componente
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
