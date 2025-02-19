import { Component, computed, inject, Input, Signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '@shared/interfaces/document';

@Component({
  selector: 'app-modal-info-detail',
  imports: [],
  templateUrl: './modal-info-detail.component.html',
  styleUrl: './modal-info-detail.component.scss',
})
export class ModalInfoDetailComponent {
  @Input({ required: true }) isOpen!: WritableSignal<boolean>;
  @Input({ required: true }) document!: Signal<Data>;
  private readonly router = inject(Router);
  options = false;
  existFiles = computed(() => Array.isArray(this.document().files));

  // ngOnInit(): void {
  // private _apiService = inject(ApiService);
  // protected _files: File[] = [];
  // pdf = 'http://localhost/api-zendoc/app/files/20250213232092934.pdf';

  // ngOnInit(): void {
  //   const id = this._activateRoute.snapshot.params['id'];
  //   const decodedId = atob(id);
  //   console.log(decodedId);

  //   this._apiService.getDocumentById(id).subscribe((res: Documents) => {
  //     const data = res['data'][0];
  //     this._files = data.files;
  //     console.log(this._files);
  //   });
  // }
  // }
  showOptions(where: string, data: string) {
    // const encodedId = btoa(`${data}`);

    this.router.navigate([`/${where}/${data}`]);
  }

  closeModal() {
    this.isOpen.set(false);
  }
}
