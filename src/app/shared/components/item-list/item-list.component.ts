import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemList } from '@shared/interfaces/item-list';

@Component({
  selector: 'item-list',
  imports: [RouterModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  @Input() item: ItemList = {} as ItemList;
  @Output() clickEvent = new EventEmitter<string>();

  respond(type: string | undefined) {
    this.clickEvent.emit(type);
  }
}
