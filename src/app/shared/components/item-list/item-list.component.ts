import { Component, Input } from '@angular/core';
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
}
