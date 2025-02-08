import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemList } from '@shared/interfaces/item-list';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'item-list',
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  @Input() item: ItemList = {
    description: '',
    icon: '',
    title: '',
    total: 0,
    type: undefined,
  };
  @Output() clickEvent = new EventEmitter<string>();

  respond(type: string | undefined) {
    this.clickEvent.emit(type);
  }
}
