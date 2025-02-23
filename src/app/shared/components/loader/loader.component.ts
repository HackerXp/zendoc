import { Component } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loading: boolean = false;
  constructor() { }

  ngOnInit() {
    LoaderService.loadingObservable.subscribe((value) => {
      this.loading = value;
    });
  }
}
