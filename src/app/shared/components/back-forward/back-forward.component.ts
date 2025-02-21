import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'back-forward',
  imports: [RouterModule],
  templateUrl: './back-forward.component.html',
  styleUrl: './back-forward.component.scss'
})
export class BackForwardComponent {
  @Input() url!: string;
  @Input() desc!: string;
}
