import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chips',
  imports: [FormsModule, NgFor],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  @Input() chips: string[] = []; // Chips recebidos do componente pai
  @Output() chipsChange = new EventEmitter<string[]>(); // Emissor de alterações nos chips

  inputValue: string = ''; // Valor do input

  addChip(): void {
    const trimmedValue = this.inputValue.trim();
    if (trimmedValue.length >= 4 && !this.chips.includes(trimmedValue)) {
      this.chips.push(trimmedValue);
      this.chipsChange.emit(this.chips); // Emite o array atualizado para o componente pai
    }
    this.inputValue = ''; // Limpa o input
  }

  removeChip(index: number): void {
    this.chips.splice(index, 1); // Remove o chip
    this.chipsChange.emit(this.chips); // Emite o array atualizado para o componente pai
  }

  validateInput(event: KeyboardEvent): void {
    const allowedPattern = /^[a-zA-Z0-9 ]*$/; // Apenas letras, números e espaços
    const inputChar = event.key;

    // Bloqueia caracteres inválidos
    if (!allowedPattern.test(inputChar)) {
      event.preventDefault();
    }

    // Impede o uso da tecla Enter
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}
