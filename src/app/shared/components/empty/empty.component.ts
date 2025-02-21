import { Component, Input } from '@angular/core';
import { Empty } from '@shared/interfaces/empty';

@Component({
  selector: 'app-empty',
  imports: [],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {
  @Input() empty: Empty = {};
}
