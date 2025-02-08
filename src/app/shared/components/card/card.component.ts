/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faClock, } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'card',
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  faCalendar = faCalendarDays;
  faClock = faClock;
}
