import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() totalPages: number = 1; // Total de páginas
  @Input() currentPage: number = 1; // Página atual
  @Output() pageChange = new EventEmitter<number>(); // Emite eventos de mudança de página

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  // goToPage(page: number) {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.pageChange.emit(page);
  //   }
  // }
}
