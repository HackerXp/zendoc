import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  label: string = 'Visualizar'
  toggle: boolean = true;

  toggleButton = () => {
    this.toggle = !this.toggle;
    this.toggle ? this.label = 'Visualizar' : this.label = 'Editar';
  }
}
