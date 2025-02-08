import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { AsideComponent } from "../components/aside/aside.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AsideComponent, RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {

}
