/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faClock, } from '@fortawesome/free-solid-svg-icons';
import { ItemList } from '@shared/interfaces/item-list';
@Component({
  selector: 'card',
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  faCalendar = faCalendarDays;
  faClock = faClock;
  @Input() item: ItemList = {} as ItemList;
}
